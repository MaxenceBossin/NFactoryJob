-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : mar. 15 fév. 2022 à 12:02
-- Version du serveur : 10.4.22-MariaDB
-- Version de PHP : 8.1.2

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

-- --------------------------------------------------------

--
-- Structure de la table `nfj_contrats`
--

CREATE TABLE `nfj_contrats` (
  `id_contrat` int(11) NOT NULL,
  `id_typecontrat` int(11) NOT NULL,
  `id_cv` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

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
  `id_user` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `nfj_cv_competences`
--

CREATE TABLE `nfj_cv_competences` (
  `id_cv_competence` int(11) NOT NULL,
  `id_cv` int(11) DEFAULT NULL,
  `id_competence` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `niveau` int(2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `nfj_diplome`
--

CREATE TABLE `nfj_diplome` (
  `id_diplome` int(11) NOT NULL,
  `intitule` varchar(128) NOT NULL,
  `id_cv` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `nfj_etablissement`
--

CREATE TABLE `nfj_etablissement` (
  `id_etablissement` int(11) NOT NULL,
  `nom` varchar(128) NOT NULL,
  `id_typeEtablissement` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `nfj_etablissement_diplome`
--

CREATE TABLE `nfj_etablissement_diplome` (
  `id_etablissement_diplome` int(11) NOT NULL,
  `id_etablissement` int(11) NOT NULL,
  `id_diplome` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `nfj_hobbies`
--

CREATE TABLE `nfj_hobbies` (
  `id_hobby` int(11) NOT NULL,
  `intitule` varchar(255) NOT NULL,
  `id_cv` int(11) NOT NULL,
  `id_loisir` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `nfj_loisirs`
--

CREATE TABLE `nfj_loisirs` (
  `id_loisir` int(11) NOT NULL,
  `nom` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `nfj_postes`
--

CREATE TABLE `nfj_postes` (
  `id_poste` int(11) NOT NULL,
  `intitule` varchar(128) NOT NULL,
  `date_debut` datetime DEFAULT NULL,
  `date_fin` datetime DEFAULT NULL,
  `id_cv` int(11) NOT NULL,
  `id_etablissement` int(11) NOT NULL,
  `id_typecontrat` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `nfj_typecontrat`
--

CREATE TABLE `nfj_typecontrat` (
  `id_typecontrat` int(11) NOT NULL,
  `intitule` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Structure de la table `nfj_typeetablissement`
--

CREATE TABLE `nfj_typeetablissement` (
  `id_typeEtablissement` int(11) NOT NULL,
  `id_etablissement` int(11) NOT NULL,
  `libelle` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `nfj_competences`
--
ALTER TABLE `nfj_competences`
  ADD PRIMARY KEY (`id_competence`);

--
-- Index pour la table `nfj_contrats`
--
ALTER TABLE `nfj_contrats`
  ADD PRIMARY KEY (`id_contrat`),
  ADD KEY `FK_ContratCV` (`id_cv`),
  ADD KEY `FK_ContratTypeContrat` (`id_typecontrat`);

--
-- Index pour la table `nfj_cv`
--
ALTER TABLE `nfj_cv`
  ADD PRIMARY KEY (`id_cv`),
  ADD KEY `user_id` (`id_user`);

--
-- Index pour la table `nfj_cv_competences`
--
ALTER TABLE `nfj_cv_competences`
  ADD PRIMARY KEY (`id_cv_competence`),
  ADD KEY `FK_CV_Competence` (`id_cv`),
  ADD KEY `FK_CompetenceCv` (`id_competence`);

--
-- Index pour la table `nfj_diplome`
--
ALTER TABLE `nfj_diplome`
  ADD PRIMARY KEY (`id_diplome`),
  ADD KEY `FK_DiplomeCV` (`id_cv`);

--
-- Index pour la table `nfj_etablissement`
--
ALTER TABLE `nfj_etablissement`
  ADD PRIMARY KEY (`id_etablissement`),
  ADD KEY `FK_EtablissementType` (`id_typeEtablissement`);

--
-- Index pour la table `nfj_etablissement_diplome`
--
ALTER TABLE `nfj_etablissement_diplome`
  ADD PRIMARY KEY (`id_etablissement_diplome`),
  ADD KEY `FK_EtDipEt` (`id_etablissement`),
  ADD KEY `FK_EtDipDip` (`id_diplome`);

--
-- Index pour la table `nfj_hobbies`
--
ALTER TABLE `nfj_hobbies`
  ADD PRIMARY KEY (`id_hobby`),
  ADD KEY `FK_HobbyCV` (`id_cv`),
  ADD KEY `FK_HobbyLoisir` (`id_loisir`);

--
-- Index pour la table `nfj_loisirs`
--
ALTER TABLE `nfj_loisirs`
  ADD PRIMARY KEY (`id_loisir`);

--
-- Index pour la table `nfj_postes`
--
ALTER TABLE `nfj_postes`
  ADD PRIMARY KEY (`id_poste`),
  ADD KEY `FK_PosteCV` (`id_cv`),
  ADD KEY `FK_PosteTypeContrat` (`id_typecontrat`),
  ADD KEY `FK_EtPoste` (`id_etablissement`);

--
-- Index pour la table `nfj_typecontrat`
--
ALTER TABLE `nfj_typecontrat`
  ADD PRIMARY KEY (`id_typecontrat`);

--
-- Index pour la table `nfj_typeetablissement`
--
ALTER TABLE `nfj_typeetablissement`
  ADD PRIMARY KEY (`id_typeEtablissement`),
  ADD KEY `FK_EtTypeEt` (`id_etablissement`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `nfj_competences`
--
ALTER TABLE `nfj_competences`
  MODIFY `id_competence` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `nfj_contrats`
--
ALTER TABLE `nfj_contrats`
  MODIFY `id_contrat` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `nfj_cv`
--
ALTER TABLE `nfj_cv`
  MODIFY `id_cv` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `nfj_cv_competences`
--
ALTER TABLE `nfj_cv_competences`
  MODIFY `id_cv_competence` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `nfj_diplome`
--
ALTER TABLE `nfj_diplome`
  MODIFY `id_diplome` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `nfj_etablissement`
--
ALTER TABLE `nfj_etablissement`
  MODIFY `id_etablissement` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `nfj_etablissement_diplome`
--
ALTER TABLE `nfj_etablissement_diplome`
  MODIFY `id_etablissement_diplome` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `nfj_hobbies`
--
ALTER TABLE `nfj_hobbies`
  MODIFY `id_hobby` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `nfj_loisirs`
--
ALTER TABLE `nfj_loisirs`
  MODIFY `id_loisir` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `nfj_postes`
--
ALTER TABLE `nfj_postes`
  MODIFY `id_poste` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `nfj_typecontrat`
--
ALTER TABLE `nfj_typecontrat`
  MODIFY `id_typecontrat` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `nfj_typeetablissement`
--
ALTER TABLE `nfj_typeetablissement`
  MODIFY `id_typeEtablissement` int(11) NOT NULL AUTO_INCREMENT;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `nfj_contrats`
--
ALTER TABLE `nfj_contrats`
  ADD CONSTRAINT `FK_ContratCV` FOREIGN KEY (`id_cv`) REFERENCES `nfj_cv` (`id_cv`),
  ADD CONSTRAINT `FK_ContratTypeContrat` FOREIGN KEY (`id_typecontrat`) REFERENCES `nfj_typecontrat` (`id_typeContrat`);

--
-- Contraintes pour la table `nfj_cv`
--
ALTER TABLE `nfj_cv`
  ADD CONSTRAINT `FK_CVUser` FOREIGN KEY (`id_user`) REFERENCES `nfj_users` (`ID`),
  ADD CONSTRAINT `user_id` FOREIGN KEY (`id_user`) REFERENCES `nfj_users` (`ID`);

--
-- Contraintes pour la table `nfj_cv_competences`
--
ALTER TABLE `nfj_cv_competences`
  ADD CONSTRAINT `FK_CV_Competence` FOREIGN KEY (`id_cv`) REFERENCES `nfj_cv` (`id_cv`),
  ADD CONSTRAINT `FK_CompetenceCv` FOREIGN KEY (`id_competence`) REFERENCES `nfj_competences` (`id_competence`);

--
-- Contraintes pour la table `nfj_diplome`
--
ALTER TABLE `nfj_diplome`
  ADD CONSTRAINT `FK_DiplomeCV` FOREIGN KEY (`id_cv`) REFERENCES `nfj_cv` (`id_cv`);

--
-- Contraintes pour la table `nfj_etablissement`
--
ALTER TABLE `nfj_etablissement`
  ADD CONSTRAINT `FK_EtablissementType` FOREIGN KEY (`id_typeEtablissement`) REFERENCES `nfj_typeetablissement` (`id_typeEtablissement`);

--
-- Contraintes pour la table `nfj_etablissement_diplome`
--
ALTER TABLE `nfj_etablissement_diplome`
  ADD CONSTRAINT `FK_EtDipDip` FOREIGN KEY (`id_diplome`) REFERENCES `nfj_diplome` (`id_diplome`),
  ADD CONSTRAINT `FK_EtDipEt` FOREIGN KEY (`id_etablissement`) REFERENCES `nfj_etablissement` (`id_etablissement`);

--
-- Contraintes pour la table `nfj_hobbies`
--
ALTER TABLE `nfj_hobbies`
  ADD CONSTRAINT `FK_HobbyCV` FOREIGN KEY (`id_cv`) REFERENCES `nfj_cv` (`id_cv`),
  ADD CONSTRAINT `FK_HobbyLoisir` FOREIGN KEY (`id_loisir`) REFERENCES `nfj_loisirs` (`id_loisir`);

--
-- Contraintes pour la table `nfj_postes`
--
ALTER TABLE `nfj_postes`
  ADD CONSTRAINT `FK_EtPoste` FOREIGN KEY (`id_etablissement`) REFERENCES `nfj_etablissement` (`id_etablissement`),
  ADD CONSTRAINT `FK_PosteCV` FOREIGN KEY (`id_cv`) REFERENCES `nfj_cv` (`id_cv`),
  ADD CONSTRAINT `FK_PosteTypeContrat` FOREIGN KEY (`id_typecontrat`) REFERENCES `nfj_typecontrat` (`id_typeContrat`);

--
-- Contraintes pour la table `nfj_typeetablissement`
--
ALTER TABLE `nfj_typeetablissement`
  ADD CONSTRAINT `FK_EtTypeEt` FOREIGN KEY (`id_etablissement`) REFERENCES `nfj_etablissement` (`id_etablissement`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
