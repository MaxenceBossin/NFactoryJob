-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : jeu. 17 fév. 2022 à 11:23
-- Version du serveur : 10.4.22-MariaDB
-- Version de PHP : 8.0.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `nfactoryjob`
--

-- --------------------------------------------------------

--
-- Structure de la table `nfj_competences`
--

CREATE TABLE `nfj_competences` (
  `id_competence` int(11) NOT NULL,
  `libelle` varchar(128) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `nfj_competences`
--

INSERT INTO `nfj_competences` (`id_competence`, `libelle`) VALUES
(1, 'PHP'),
(2, 'JAVA');

-- --------------------------------------------------------

--
-- Structure de la table `nfj_contratrecherche`
--

CREATE TABLE `nfj_contratrecherche` (
  `id_contratrecherche` int(11) NOT NULL,
  `id_cv_contratrecherche` int(11) NOT NULL,
  `id_typecontrat_contratrecherche` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `nfj_contratrecherche`
--

INSERT INTO `nfj_contratrecherche` (`id_contratrecherche`, `id_cv_contratrecherche`, `id_typecontrat_contratrecherche`) VALUES
(1, 1, 1),
(2, 1, 2);

-- --------------------------------------------------------

--
-- Structure de la table `nfj_cv`
--

CREATE TABLE `nfj_cv` (
  `id_cv` int(11) NOT NULL,
  `intitule` varchar(64) NOT NULL,
  `version` varchar(4) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `modified_at` datetime DEFAULT NULL,
  `id_user` bigint(20) UNSIGNED NOT NULL,
  `id_metier_cv` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `nfj_cv`
--

INSERT INTO `nfj_cv` (`id_cv`, `intitule`, `version`, `created_at`, `modified_at`, `id_user`, `id_metier_cv`) VALUES
(1, 'CV test', '1', '2022-02-15 16:46:40', '2022-02-15 16:46:40', 2, NULL),
(2, 'cv test 2', NULL, '2022-02-15 16:46:40', '2022-02-15 16:46:40', 1, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `nfj_cv_competences`
--

CREATE TABLE `nfj_cv_competences` (
  `id_cv_competence` int(11) NOT NULL,
  `id_cv_fk` int(11) DEFAULT NULL,
  `id_competence_fk` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `niveau` int(2) DEFAULT NULL,
  `description` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `nfj_cv_competences`
--

INSERT INTO `nfj_cv_competences` (`id_cv_competence`, `id_cv_fk`, `id_competence_fk`, `created_at`, `niveau`, `description`) VALUES
(1, 1, 1, '2022-02-15 17:38:39', 5, 'Dev vactolib');

-- --------------------------------------------------------

--
-- Structure de la table `nfj_cv_diplome`
--

CREATE TABLE `nfj_cv_diplome` (
  `id_cv_diplome` int(11) NOT NULL,
  `id_cv_dcv` int(11) NOT NULL,
  `id_diplome_dcv` int(11) NOT NULL,
  `date_debut_dcv` datetime DEFAULT NULL,
  `date_fin_dcv` datetime DEFAULT NULL,
  `description_dcv` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `nfj_cv_diplome`
--

INSERT INTO `nfj_cv_diplome` (`id_cv_diplome`, `id_cv_dcv`, `id_diplome_dcv`, `date_debut_dcv`, `date_fin_dcv`, `description_dcv`) VALUES
(1, 1, 1, '2022-02-16 11:46:51', '2022-02-16 11:46:51', 'Bac mention Bien \r\nApprentissage des métiers du développement durable.'),
(2, 1, 2, '2022-02-16 11:46:51', '2022-02-16 11:46:51', 'Apprentissage des bases du développement web');

-- --------------------------------------------------------

--
-- Structure de la table `nfj_cv_emplacement`
--

CREATE TABLE `nfj_cv_emplacement` (
  `id_emplacement` int(11) NOT NULL,
  `id_cv_fk` int(11) NOT NULL,
  `id_emplacement_fk` int(11) NOT NULL,
  `readyToWorkAt` date DEFAULT NULL COMMENT 'date à partir de laquelle le candidat est pret à travailler'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `nfj_cv_emplacement`
--

INSERT INTO `nfj_cv_emplacement` (`id_emplacement`, `id_cv_fk`, `id_emplacement_fk`, `readyToWorkAt`) VALUES
(1, 1, 1, '2022-02-18'),
(2, 1, 2, '2022-02-18');

-- --------------------------------------------------------

--
-- Structure de la table `nfj_cv_langue`
--

CREATE TABLE `nfj_cv_langue` (
  `id_cv_langue` int(11) NOT NULL,
  `id_cv_fk` int(11) NOT NULL,
  `id_langue_fk` int(11) NOT NULL,
  `niveau` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `nfj_cv_langue`
--

INSERT INTO `nfj_cv_langue` (`id_cv_langue`, `id_cv_fk`, `id_langue_fk`, `niveau`) VALUES
(1, 1, 1, 'C2'),
(2, 1, 2, 'B1'),
(5, 2, 2, ''),
(6, 2, 1, '');

-- --------------------------------------------------------

--
-- Structure de la table `nfj_cv_softskill`
--

CREATE TABLE `nfj_cv_softskill` (
  `id_cv_softskill` int(11) NOT NULL,
  `id_cv_fk` int(11) NOT NULL,
  `id_softskill_fk` int(11) NOT NULL,
  `description_softskill` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `nfj_cv_softskill`
--

INSERT INTO `nfj_cv_softskill` (`id_cv_softskill`, `id_cv_fk`, `id_softskill_fk`, `description_softskill`) VALUES
(1, 1, 1, 'Lorem lorem lorem'),
(2, 1, 2, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `nfj_diplome`
--

CREATE TABLE `nfj_diplome` (
  `id_diplome` int(11) NOT NULL,
  `intitule_diplome` varchar(128) NOT NULL,
  `id_typediplome_diplome` int(11) DEFAULT NULL,
  `id_typesecteur_diplome` int(11) DEFAULT NULL,
  `id_etablisement_diplome` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `nfj_diplome`
--

INSERT INTO `nfj_diplome` (`id_diplome`, `intitule_diplome`, `id_typediplome_diplome`, `id_typesecteur_diplome`, `id_etablisement_diplome`) VALUES
(1, 'Sti2D', 1, NULL, 1),
(2, 'Bachelor Informatique', 3, 1, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `nfj_emplacement`
--

CREATE TABLE `nfj_emplacement` (
  `id_emplacement` int(11) NOT NULL,
  `departement` varchar(100) NOT NULL,
  `ville` varchar(200) NOT NULL,
  `cp` varchar(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `nfj_emplacement`
--

INSERT INTO `nfj_emplacement` (`id_emplacement`, `departement`, `ville`, `cp`) VALUES
(1, 'Calvados', 'Caen', '14000'),
(2, 'Seine-Maritime', 'Rouen', '76000'),
(3, 'Seine-Maritime', 'Le Havre', '76600'),
(4, 'Orne', 'Alençon', '61000');

-- --------------------------------------------------------

--
-- Structure de la table `nfj_etablisement_emplacement`
--

CREATE TABLE `nfj_etablisement_emplacement` (
  `id_etablisement_emplacement` int(11) NOT NULL,
  `id_emplacement_fk` int(11) NOT NULL,
  `id_etablisement_fk` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `nfj_etablisement_emplacement`
--

INSERT INTO `nfj_etablisement_emplacement` (`id_etablisement_emplacement`, `id_emplacement_fk`, `id_etablisement_fk`) VALUES
(4, 1, 4),
(3, 1, 5);

-- --------------------------------------------------------

--
-- Structure de la table `nfj_etablissement`
--

CREATE TABLE `nfj_etablissement` (
  `id_etablissement` int(11) NOT NULL,
  `nom_typeEtablissement` varchar(128) NOT NULL,
  `id_typeEtablissement` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `nfj_etablissement`
--

INSERT INTO `nfj_etablissement` (`id_etablissement`, `nom_typeEtablissement`, `id_typeEtablissement`) VALUES
(4, 'Jean Rostand', 1),
(5, 'Inetum', 6);

-- --------------------------------------------------------

--
-- Structure de la table `nfj_hobbies`
--

CREATE TABLE `nfj_hobbies` (
  `id_hobby` int(11) NOT NULL,
  `description_hobby` varchar(255) NOT NULL,
  `id_cv_hobby` int(11) NOT NULL,
  `id_loisir_hobby` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `nfj_hobbies`
--

INSERT INTO `nfj_hobbies` (`id_hobby`, `description_hobby`, `id_cv_hobby`, `id_loisir_hobby`) VALUES
(1, 'Pratique depuis l\'enfance', 1, 1);

-- --------------------------------------------------------

--
-- Structure de la table `nfj_langues`
--

CREATE TABLE `nfj_langues` (
  `id_langue` int(11) NOT NULL,
  `libelle_langue` varchar(80) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `nfj_langues`
--

INSERT INTO `nfj_langues` (`id_langue`, `libelle_langue`) VALUES
(1, 'Français'),
(2, 'Anglais');

-- --------------------------------------------------------

--
-- Structure de la table `nfj_loisirs`
--

CREATE TABLE `nfj_loisirs` (
  `id_loisir` int(11) NOT NULL,
  `libelle_loisir` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `nfj_loisirs`
--

INSERT INTO `nfj_loisirs` (`id_loisir`, `libelle_loisir`) VALUES
(1, 'tennis'),
(2, 'jeux video'),
(3, 'mangas'),
(4, 'badminton'),
(5, 'volley'),
(6, 'escrime'),
(7, 'football'),
(8, 'esport'),
(9, 'echec'),
(10, 'accrobranche');

-- --------------------------------------------------------

--
-- Structure de la table `nfj_metier`
--

CREATE TABLE `nfj_metier` (
  `id_metier` int(11) NOT NULL,
  `libelle_metier` varchar(80) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `nfj_metier`
--

INSERT INTO `nfj_metier` (`id_metier`, `libelle_metier`) VALUES
(1, 'techniciens d\'exploitation'),
(2, 'développeur web');

-- --------------------------------------------------------

--
-- Structure de la table `nfj_postes`
--

CREATE TABLE `nfj_postes` (
  `id_poste` int(11) NOT NULL,
  `description_poste` text DEFAULT NULL,
  `date_debut_poste` date DEFAULT NULL,
  `date_fin_poste` date DEFAULT NULL,
  `id_cv_poste` int(11) NOT NULL,
  `id_etablissement_poste` int(11) DEFAULT NULL,
  `id_typecontrat_poste` int(11) DEFAULT NULL,
  `id_metier_poste` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `nfj_postes`
--

INSERT INTO `nfj_postes` (`id_poste`, `description_poste`, `date_debut_poste`, `date_fin_poste`, `id_cv_poste`, `id_etablissement_poste`, `id_typecontrat_poste`, `id_metier_poste`) VALUES
(1, 'dev application métiers', '2020-02-05', '2021-02-10', 1, 5, 4, 1),
(2, 'dev métode pdo site.', '2022-02-16', '2022-02-16', 1, 4, 1, 1);

-- --------------------------------------------------------

--
-- Structure de la table `nfj_softskill`
--

CREATE TABLE `nfj_softskill` (
  `id_softskill` int(11) NOT NULL,
  `libelle_softskill` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `nfj_softskill`
--

INSERT INTO `nfj_softskill` (`id_softskill`, `libelle_softskill`) VALUES
(1, 'autonomie'),
(2, 'à l\'écoute'),
(3, 'entreprenant'),
(4, 'esprit critique');

-- --------------------------------------------------------

--
-- Structure de la table `nfj_typecontrat`
--

CREATE TABLE `nfj_typecontrat` (
  `id_typecontrat` int(11) NOT NULL,
  `intitule_type_contrat` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `nfj_typecontrat`
--

INSERT INTO `nfj_typecontrat` (`id_typecontrat`, `intitule_type_contrat`) VALUES
(1, 'Stage'),
(2, 'Alternance'),
(3, 'CDD'),
(4, 'CDI');

-- --------------------------------------------------------

--
-- Structure de la table `nfj_typediplome`
--

CREATE TABLE `nfj_typediplome` (
  `id_typediplome` int(11) NOT NULL,
  `libelle_type_diplome` varchar(40) NOT NULL,
  `niveau_type_diplome` int(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `nfj_typediplome`
--

INSERT INTO `nfj_typediplome` (`id_typediplome`, `libelle_type_diplome`, `niveau_type_diplome`) VALUES
(1, 'baccalauréat', 0),
(2, 'brevet de technicien supérieur', 2),
(3, 'bachelor', 3),
(4, 'master', 5);

-- --------------------------------------------------------

--
-- Structure de la table `nfj_typeetablissement`
--

CREATE TABLE `nfj_typeetablissement` (
  `id_typeEtablissement` int(11) NOT NULL,
  `libelle_type_etablissement` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `nfj_typeetablissement`
--

INSERT INTO `nfj_typeetablissement` (`id_typeEtablissement`, `libelle_type_etablissement`) VALUES
(1, 'lycée'),
(2, 'université'),
(3, 'agence web'),
(4, 'entreprise de services du numérique'),
(5, 'école'),
(6, 'entreprise');

-- --------------------------------------------------------

--
-- Structure de la table `nfj_typemetier`
--

CREATE TABLE `nfj_typemetier` (
  `id_typemetier` int(11) NOT NULL,
  `libelle_type_metier` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `nfj_typemetier`
--

INSERT INTO `nfj_typemetier` (`id_typemetier`, `libelle_type_metier`) VALUES
(1, 'développement web'),
(2, 'communication digital');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `nfj_competences`
--
ALTER TABLE `nfj_competences`
  ADD PRIMARY KEY (`id_competence`);

--
-- Index pour la table `nfj_contratrecherche`
--
ALTER TABLE `nfj_contratrecherche`
  ADD PRIMARY KEY (`id_contratrecherche`),
  ADD KEY `FK_ContratRechercheCV` (`id_cv_contratrecherche`),
  ADD KEY `FK_contrat_contratrecherche` (`id_typecontrat_contratrecherche`);

--
-- Index pour la table `nfj_cv`
--
ALTER TABLE `nfj_cv`
  ADD PRIMARY KEY (`id_cv`),
  ADD KEY `user_id` (`id_user`),
  ADD KEY `FK_CV_metier_recherche` (`id_metier_cv`);

--
-- Index pour la table `nfj_cv_competences`
--
ALTER TABLE `nfj_cv_competences`
  ADD PRIMARY KEY (`id_cv_competence`),
  ADD UNIQUE KEY `pivot_unique_competence` (`id_cv_fk`,`id_competence_fk`),
  ADD KEY `FK_CV_Competence` (`id_cv_fk`),
  ADD KEY `FK_CompetenceCv` (`id_competence_fk`);

--
-- Index pour la table `nfj_cv_diplome`
--
ALTER TABLE `nfj_cv_diplome`
  ADD PRIMARY KEY (`id_cv_diplome`),
  ADD UNIQUE KEY `pivot_unique_diplome` (`id_cv_dcv`,`id_diplome_dcv`),
  ADD KEY `FK_Diplome` (`id_diplome_dcv`);

--
-- Index pour la table `nfj_cv_emplacement`
--
ALTER TABLE `nfj_cv_emplacement`
  ADD PRIMARY KEY (`id_emplacement`),
  ADD UNIQUE KEY `pivot_unique_emplacement` (`id_cv_fk`,`id_emplacement_fk`),
  ADD KEY `FK_pivot_CV_Emplacement` (`id_emplacement_fk`);

--
-- Index pour la table `nfj_cv_langue`
--
ALTER TABLE `nfj_cv_langue`
  ADD PRIMARY KEY (`id_cv_langue`),
  ADD UNIQUE KEY `pivot_unique_cv_langue` (`id_cv_fk`,`id_langue_fk`),
  ADD KEY `FK_langue` (`id_langue_fk`);

--
-- Index pour la table `nfj_cv_softskill`
--
ALTER TABLE `nfj_cv_softskill`
  ADD PRIMARY KEY (`id_cv_softskill`),
  ADD UNIQUE KEY `pivot_unique_softskill` (`id_cv_fk`,`id_softskill_fk`),
  ADD KEY `FK_Softskill` (`id_softskill_fk`);

--
-- Index pour la table `nfj_diplome`
--
ALTER TABLE `nfj_diplome`
  ADD PRIMARY KEY (`id_diplome`),
  ADD UNIQUE KEY `pivot_unique_diplome` (`id_typediplome_diplome`,`id_typesecteur_diplome`,`id_etablisement_diplome`),
  ADD KEY `FK_Secteur` (`id_typesecteur_diplome`),
  ADD KEY `FK_Etablisment_Diplome` (`id_etablisement_diplome`);

--
-- Index pour la table `nfj_emplacement`
--
ALTER TABLE `nfj_emplacement`
  ADD PRIMARY KEY (`id_emplacement`);

--
-- Index pour la table `nfj_etablisement_emplacement`
--
ALTER TABLE `nfj_etablisement_emplacement`
  ADD PRIMARY KEY (`id_etablisement_emplacement`),
  ADD UNIQUE KEY `pivot_unique_ee` (`id_emplacement_fk`,`id_etablisement_fk`),
  ADD UNIQUE KEY `pivot_unique_emplacement_etablisement` (`id_emplacement_fk`,`id_etablisement_fk`),
  ADD KEY `FK_etabliement_pivot` (`id_etablisement_fk`);

--
-- Index pour la table `nfj_etablissement`
--
ALTER TABLE `nfj_etablissement`
  ADD PRIMARY KEY (`id_etablissement`),
  ADD KEY `FK_EtablissementType` (`id_typeEtablissement`);

--
-- Index pour la table `nfj_hobbies`
--
ALTER TABLE `nfj_hobbies`
  ADD PRIMARY KEY (`id_hobby`),
  ADD KEY `FK_HobbyCV` (`id_cv_hobby`),
  ADD KEY `FK_HobbyLoisir` (`id_loisir_hobby`);

--
-- Index pour la table `nfj_langues`
--
ALTER TABLE `nfj_langues`
  ADD PRIMARY KEY (`id_langue`);

--
-- Index pour la table `nfj_loisirs`
--
ALTER TABLE `nfj_loisirs`
  ADD PRIMARY KEY (`id_loisir`);

--
-- Index pour la table `nfj_metier`
--
ALTER TABLE `nfj_metier`
  ADD PRIMARY KEY (`id_metier`);

--
-- Index pour la table `nfj_postes`
--
ALTER TABLE `nfj_postes`
  ADD PRIMARY KEY (`id_poste`),
  ADD UNIQUE KEY `pivot_unique_poste_1` (`id_cv_poste`,`id_etablissement_poste`,`id_typecontrat_poste`,`id_metier_poste`),
  ADD UNIQUE KEY `date_fin_poste_unique` (`date_fin_poste`),
  ADD UNIQUE KEY `date_debut_poste_unique` (`description_poste`) USING HASH,
  ADD KEY `FK_PosteCV` (`id_cv_poste`),
  ADD KEY `FK_PosteTypeContrat` (`id_typecontrat_poste`),
  ADD KEY `FK_EtPoste` (`id_etablissement_poste`),
  ADD KEY `FK_metier` (`id_metier_poste`);

--
-- Index pour la table `nfj_softskill`
--
ALTER TABLE `nfj_softskill`
  ADD PRIMARY KEY (`id_softskill`);

--
-- Index pour la table `nfj_typecontrat`
--
ALTER TABLE `nfj_typecontrat`
  ADD PRIMARY KEY (`id_typecontrat`);

--
-- Index pour la table `nfj_typediplome`
--
ALTER TABLE `nfj_typediplome`
  ADD PRIMARY KEY (`id_typediplome`);

--
-- Index pour la table `nfj_typeetablissement`
--
ALTER TABLE `nfj_typeetablissement`
  ADD PRIMARY KEY (`id_typeEtablissement`);

--
-- Index pour la table `nfj_typemetier`
--
ALTER TABLE `nfj_typemetier`
  ADD PRIMARY KEY (`id_typemetier`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `nfj_competences`
--
ALTER TABLE `nfj_competences`
  MODIFY `id_competence` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `nfj_contratrecherche`
--
ALTER TABLE `nfj_contratrecherche`
  MODIFY `id_contratrecherche` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `nfj_cv`
--
ALTER TABLE `nfj_cv`
  MODIFY `id_cv` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `nfj_cv_competences`
--
ALTER TABLE `nfj_cv_competences`
  MODIFY `id_cv_competence` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `nfj_cv_diplome`
--
ALTER TABLE `nfj_cv_diplome`
  MODIFY `id_cv_diplome` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `nfj_cv_emplacement`
--
ALTER TABLE `nfj_cv_emplacement`
  MODIFY `id_emplacement` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `nfj_cv_langue`
--
ALTER TABLE `nfj_cv_langue`
  MODIFY `id_cv_langue` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pour la table `nfj_cv_softskill`
--
ALTER TABLE `nfj_cv_softskill`
  MODIFY `id_cv_softskill` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pour la table `nfj_diplome`
--
ALTER TABLE `nfj_diplome`
  MODIFY `id_diplome` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `nfj_emplacement`
--
ALTER TABLE `nfj_emplacement`
  MODIFY `id_emplacement` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `nfj_etablisement_emplacement`
--
ALTER TABLE `nfj_etablisement_emplacement`
  MODIFY `id_etablisement_emplacement` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `nfj_etablissement`
--
ALTER TABLE `nfj_etablissement`
  MODIFY `id_etablissement` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `nfj_hobbies`
--
ALTER TABLE `nfj_hobbies`
  MODIFY `id_hobby` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `nfj_langues`
--
ALTER TABLE `nfj_langues`
  MODIFY `id_langue` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `nfj_loisirs`
--
ALTER TABLE `nfj_loisirs`
  MODIFY `id_loisir` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT pour la table `nfj_metier`
--
ALTER TABLE `nfj_metier`
  MODIFY `id_metier` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `nfj_postes`
--
ALTER TABLE `nfj_postes`
  MODIFY `id_poste` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `nfj_softskill`
--
ALTER TABLE `nfj_softskill`
  MODIFY `id_softskill` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `nfj_typecontrat`
--
ALTER TABLE `nfj_typecontrat`
  MODIFY `id_typecontrat` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `nfj_typediplome`
--
ALTER TABLE `nfj_typediplome`
  MODIFY `id_typediplome` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `nfj_typeetablissement`
--
ALTER TABLE `nfj_typeetablissement`
  MODIFY `id_typeEtablissement` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pour la table `nfj_typemetier`
--
ALTER TABLE `nfj_typemetier`
  MODIFY `id_typemetier` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `nfj_contratrecherche`
--
ALTER TABLE `nfj_contratrecherche`
  ADD CONSTRAINT `FK_ContratRechercheCV` FOREIGN KEY (`id_cv_contratrecherche`) REFERENCES `nfj_cv` (`id_cv`),
  ADD CONSTRAINT `FK_contrat_contratrecherche` FOREIGN KEY (`id_typecontrat_contratrecherche`) REFERENCES `nfj_typecontrat` (`id_typecontrat`);

--
-- Contraintes pour la table `nfj_cv`
--
ALTER TABLE `nfj_cv`
  ADD CONSTRAINT `FK_CVUser` FOREIGN KEY (`id_user`) REFERENCES `nfj_users` (`ID`),
  ADD CONSTRAINT `FK_CV_metier_recherche` FOREIGN KEY (`id_metier_cv`) REFERENCES `nfj_metier` (`id_metier`);

--
-- Contraintes pour la table `nfj_cv_competences`
--
ALTER TABLE `nfj_cv_competences`
  ADD CONSTRAINT `FK_CV_Competence` FOREIGN KEY (`id_cv_fk`) REFERENCES `nfj_cv` (`id_cv`),
  ADD CONSTRAINT `FK_CompetenceCv` FOREIGN KEY (`id_competence_fk`) REFERENCES `nfj_competences` (`id_competence`);

--
-- Contraintes pour la table `nfj_cv_diplome`
--
ALTER TABLE `nfj_cv_diplome`
  ADD CONSTRAINT `FK_CV` FOREIGN KEY (`id_cv_dcv`) REFERENCES `nfj_cv` (`id_cv`),
  ADD CONSTRAINT `FK_Diplome` FOREIGN KEY (`id_diplome_dcv`) REFERENCES `nfj_diplome` (`id_diplome`);

--
-- Contraintes pour la table `nfj_cv_emplacement`
--
ALTER TABLE `nfj_cv_emplacement`
  ADD CONSTRAINT `FK_pivot_CV_Emplacement` FOREIGN KEY (`id_emplacement_fk`) REFERENCES `nfj_emplacement` (`id_emplacement`),
  ADD CONSTRAINT `FK_pivot_Emplacement_CV` FOREIGN KEY (`id_cv_fk`) REFERENCES `nfj_cv` (`id_cv`);

--
-- Contraintes pour la table `nfj_cv_langue`
--
ALTER TABLE `nfj_cv_langue`
  ADD CONSTRAINT `FK_CV_langue` FOREIGN KEY (`id_cv_fk`) REFERENCES `nfj_cv` (`id_cv`),
  ADD CONSTRAINT `FK_langue` FOREIGN KEY (`id_langue_fk`) REFERENCES `nfj_langues` (`id_langue`);

--
-- Contraintes pour la table `nfj_cv_softskill`
--
ALTER TABLE `nfj_cv_softskill`
  ADD CONSTRAINT `FK_CV_SoftSkill` FOREIGN KEY (`id_cv_fk`) REFERENCES `nfj_cv` (`id_cv`),
  ADD CONSTRAINT `FK_Softskill` FOREIGN KEY (`id_softskill_fk`) REFERENCES `nfj_softskill` (`id_softskill`);

--
-- Contraintes pour la table `nfj_diplome`
--
ALTER TABLE `nfj_diplome`
  ADD CONSTRAINT `FK_Etablisment_Diplome` FOREIGN KEY (`id_etablisement_diplome`) REFERENCES `nfj_etablissement` (`id_typeEtablissement`),
  ADD CONSTRAINT `FK_Secteur` FOREIGN KEY (`id_typesecteur_diplome`) REFERENCES `nfj_typemetier` (`id_typemetier`),
  ADD CONSTRAINT `FK_typeDiplome` FOREIGN KEY (`id_typediplome_diplome`) REFERENCES `nfj_typediplome` (`id_typediplome`);

--
-- Contraintes pour la table `nfj_etablisement_emplacement`
--
ALTER TABLE `nfj_etablisement_emplacement`
  ADD CONSTRAINT `FK_emplacement_pivot` FOREIGN KEY (`id_emplacement_fk`) REFERENCES `nfj_emplacement` (`id_emplacement`),
  ADD CONSTRAINT `FK_etabliement_pivot` FOREIGN KEY (`id_etablisement_fk`) REFERENCES `nfj_etablissement` (`id_etablissement`);

--
-- Contraintes pour la table `nfj_etablissement`
--
ALTER TABLE `nfj_etablissement`
  ADD CONSTRAINT `FK_EtablissementType` FOREIGN KEY (`id_typeEtablissement`) REFERENCES `nfj_typeetablissement` (`id_typeEtablissement`);

--
-- Contraintes pour la table `nfj_hobbies`
--
ALTER TABLE `nfj_hobbies`
  ADD CONSTRAINT `FK_HobbyCV` FOREIGN KEY (`id_cv_hobby`) REFERENCES `nfj_cv` (`id_cv`),
  ADD CONSTRAINT `FK_HobbyLoisir` FOREIGN KEY (`id_loisir_hobby`) REFERENCES `nfj_loisirs` (`id_loisir`);

--
-- Contraintes pour la table `nfj_postes`
--
ALTER TABLE `nfj_postes`
  ADD CONSTRAINT `FK_EtPoste` FOREIGN KEY (`id_etablissement_poste`) REFERENCES `nfj_etablissement` (`id_etablissement`),
  ADD CONSTRAINT `FK_PosteCV` FOREIGN KEY (`id_cv_poste`) REFERENCES `nfj_cv` (`id_cv`),
  ADD CONSTRAINT `FK_PosteTypeContrat` FOREIGN KEY (`id_typecontrat_poste`) REFERENCES `nfj_typecontrat` (`id_typecontrat`),
  ADD CONSTRAINT `FK_metier` FOREIGN KEY (`id_metier_poste`) REFERENCES `nfj_typemetier` (`id_typemetier`);

--
-- Contraintes pour la table `nfj_typeetablissement`
--
ALTER TABLE `nfj_typeetablissement`
  ADD CONSTRAINT `FK_EtTypeEt` FOREIGN KEY (`id_etablissement`) REFERENCES `nfj_etablissement` (`id_etablissement`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
