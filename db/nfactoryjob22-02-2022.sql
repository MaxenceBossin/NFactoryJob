-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Feb 22, 2022 at 03:30 PM
-- Server version: 5.7.24
-- PHP Version: 8.0.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `nfactoryjob`
--

-- --------------------------------------------------------

--
-- Table structure for table `nfj_competences`
--

CREATE TABLE `nfj_competences` (
  `id_competence` int(11) NOT NULL,
  `libelle` varchar(128) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `nfj_competences`
--

INSERT INTO `nfj_competences` (`id_competence`, `libelle`) VALUES
(1, 'PHP'),
(2, 'JAVA');

-- --------------------------------------------------------

--
-- Table structure for table `nfj_contratrecherche`
--

CREATE TABLE `nfj_contratrecherche` (
  `id_contratrecherche` int(11) NOT NULL,
  `id_cv_contratrecherche` int(11) NOT NULL,
  `id_typecontrat_contratrecherche` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `nfj_contratrecherche`
--

INSERT INTO `nfj_contratrecherche` (`id_contratrecherche`, `id_cv_contratrecherche`, `id_typecontrat_contratrecherche`) VALUES
(1, 1, 1),
(2, 1, 2),
(3, 2, 2);

-- --------------------------------------------------------

--
-- Table structure for table `nfj_cv`
--

CREATE TABLE `nfj_cv` (
  `id_cv` int(11) NOT NULL,
  `intitule` varchar(64) NOT NULL,
  `version` varchar(4) DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `modified_at` datetime DEFAULT NULL,
  `id_user` bigint(20) UNSIGNED NOT NULL,
  `id_metier_cv` int(11) DEFAULT NULL,
  `background_color` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `nfj_cv`
--

INSERT INTO `nfj_cv` (`id_cv`, `intitule`, `version`, `created_at`, `modified_at`, `id_user`, `id_metier_cv`, `background_color`) VALUES
(1, 'CV test', '1', '2022-02-15 16:46:40', '2022-02-15 16:46:40', 2, 1, ''),
(2, 'cv test 2', NULL, '2022-02-15 16:46:40', '2022-02-15 16:46:40', 1, 2, '');

-- --------------------------------------------------------

--
-- Table structure for table `nfj_cv_competences`
--

CREATE TABLE `nfj_cv_competences` (
  `id_cv_competence` int(11) NOT NULL,
  `id_cv_fk` int(11) DEFAULT NULL,
  `id_competence_fk` int(11) DEFAULT NULL,
  `created_at` datetime DEFAULT NULL,
  `niveau` int(2) DEFAULT NULL,
  `description` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `nfj_cv_competences`
--

INSERT INTO `nfj_cv_competences` (`id_cv_competence`, `id_cv_fk`, `id_competence_fk`, `created_at`, `niveau`, `description`) VALUES
(1, 1, 1, '2022-02-15 17:38:39', 5, 'Dev vactolib'),
(2, 1, 2, '2022-02-17 12:43:21', 4, 'je fais des test'),
(3, 2, 1, '2022-02-21 10:08:03', 3, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `nfj_cv_diplome`
--

CREATE TABLE `nfj_cv_diplome` (
  `id_cv_diplome` int(11) NOT NULL,
  `id_etablisement_dcv` int(11) DEFAULT NULL,
  `id_cv_dcv` int(11) NOT NULL,
  `id_diplome_dcv` int(11) DEFAULT NULL,
  `date_debut_dcv` datetime DEFAULT NULL,
  `date_fin_dcv` datetime DEFAULT NULL,
  `description_dcv` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `nfj_cv_diplome`
--

INSERT INTO `nfj_cv_diplome` (`id_cv_diplome`, `id_etablisement_dcv`, `id_cv_dcv`, `id_diplome_dcv`, `date_debut_dcv`, `date_fin_dcv`, `description_dcv`) VALUES
(1, 7, 1, 1, '2022-02-16 11:46:51', '2022-02-16 11:46:51', 'Bac mention Bien \r\nApprentissage des métiers du développement durable.'),
(2, 5, 1, 3, '2022-02-16 11:46:51', '2022-02-16 11:46:51', 'Apprentissage des bases du développement web'),
(5, 4, 2, 2, '2022-02-18 11:18:14', '2022-02-18 11:18:14', NULL),
(6, 5, 2, 3, '2022-02-22 11:10:31', '2022-02-22 11:10:31', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `nfj_cv_emplacement`
--

CREATE TABLE `nfj_cv_emplacement` (
  `id_emplacement` int(11) NOT NULL,
  `id_cv_fk` int(11) NOT NULL,
  `id_emplacement_fk` int(11) NOT NULL,
  `readyToWorkAt` date DEFAULT NULL COMMENT 'date à partir de laquelle le candidat est pret à travailler'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `nfj_cv_emplacement`
--

INSERT INTO `nfj_cv_emplacement` (`id_emplacement`, `id_cv_fk`, `id_emplacement_fk`, `readyToWorkAt`) VALUES
(1, 1, 1, '2022-02-18'),
(2, 1, 2, '2022-02-18'),
(4, 2, 1, '2022-02-01');

-- --------------------------------------------------------

--
-- Table structure for table `nfj_cv_langue`
--

CREATE TABLE `nfj_cv_langue` (
  `id_cv_langue` int(11) NOT NULL,
  `id_cv_fk` int(11) NOT NULL,
  `id_langue_fk` int(11) NOT NULL,
  `niveau` varchar(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `nfj_cv_langue`
--

INSERT INTO `nfj_cv_langue` (`id_cv_langue`, `id_cv_fk`, `id_langue_fk`, `niveau`) VALUES
(1, 1, 1, 'C2'),
(2, 1, 2, 'B1'),
(7, 2, 1, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `nfj_cv_softskill`
--

CREATE TABLE `nfj_cv_softskill` (
  `id_cv_softskill` int(11) NOT NULL,
  `id_cv_fk` int(11) NOT NULL,
  `id_softskill_fk` int(11) NOT NULL,
  `description_softskill` text
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `nfj_cv_softskill`
--

INSERT INTO `nfj_cv_softskill` (`id_cv_softskill`, `id_cv_fk`, `id_softskill_fk`, `description_softskill`) VALUES
(1, 1, 1, 'Lorem lorem lorem'),
(2, 1, 2, NULL),
(7, 2, 1, NULL),
(8, 2, 4, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `nfj_diplome`
--

CREATE TABLE `nfj_diplome` (
  `id_diplome` int(11) NOT NULL,
  `intitule_diplome` varchar(128) NOT NULL,
  `id_typediplome_diplome` int(11) DEFAULT NULL,
  `id_typesecteur_diplome` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `nfj_diplome`
--

INSERT INTO `nfj_diplome` (`id_diplome`, `intitule_diplome`, `id_typediplome_diplome`, `id_typesecteur_diplome`) VALUES
(1, 'Sti2D', 1, 1),
(2, 'Bachelor Informatique', 3, 1),
(3, 'master informatique', 4, 1);

-- --------------------------------------------------------

--
-- Table structure for table `nfj_emplacement`
--

CREATE TABLE `nfj_emplacement` (
  `id_emplacement` int(11) NOT NULL,
  `departement` varchar(100) NOT NULL,
  `ville` varchar(200) NOT NULL,
  `cp` varchar(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `nfj_emplacement`
--

INSERT INTO `nfj_emplacement` (`id_emplacement`, `departement`, `ville`, `cp`) VALUES
(1, 'Calvados', 'Caen', '14000'),
(2, 'Seine-Maritime', 'Rouen', '76000'),
(3, 'Seine-Maritime', 'Le Havre', '76600'),
(4, 'Orne', 'Alençon', '61000');

-- --------------------------------------------------------

--
-- Table structure for table `nfj_etablisement_emplacement`
--

CREATE TABLE `nfj_etablisement_emplacement` (
  `id_etablisement_emplacement` int(11) NOT NULL,
  `id_emplacement_fk` int(11) NOT NULL,
  `id_etablisement_fk` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `nfj_etablisement_emplacement`
--

INSERT INTO `nfj_etablisement_emplacement` (`id_etablisement_emplacement`, `id_emplacement_fk`, `id_etablisement_fk`) VALUES
(4, 1, 4),
(3, 1, 5);

-- --------------------------------------------------------

--
-- Table structure for table `nfj_etablissement`
--

CREATE TABLE `nfj_etablissement` (
  `id_etablissement` int(11) NOT NULL,
  `nom_etablissement` varchar(128) NOT NULL,
  `id_typeEtablissement` int(11) DEFAULT NULL,
  `id_emplacement_etablissement` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `nfj_etablissement`
--

INSERT INTO `nfj_etablissement` (`id_etablissement`, `nom_etablissement`, `id_typeEtablissement`, `id_emplacement_etablissement`) VALUES
(4, 'Jean Rostand', 1, 1),
(5, 'Inetum', 6, 1),
(6, 'Need For School', 5, 2),
(7, 'Jules verne', 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `nfj_hobbies`
--

CREATE TABLE `nfj_hobbies` (
  `id_hobby` int(11) NOT NULL,
  `description_hobby` varchar(255) NOT NULL,
  `id_cv_hobby` int(11) NOT NULL,
  `id_loisir_hobby` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `nfj_hobbies`
--

INSERT INTO `nfj_hobbies` (`id_hobby`, `description_hobby`, `id_cv_hobby`, `id_loisir_hobby`) VALUES
(1, 'Pratique depuis l\'enfance', 1, 1),
(2, '', 1, 4);

-- --------------------------------------------------------

--
-- Table structure for table `nfj_langues`
--

CREATE TABLE `nfj_langues` (
  `id_langue` int(11) NOT NULL,
  `libelle_langue` varchar(80) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `nfj_langues`
--

INSERT INTO `nfj_langues` (`id_langue`, `libelle_langue`) VALUES
(1, 'Français'),
(2, 'Anglais');

-- --------------------------------------------------------

--
-- Table structure for table `nfj_loisirs`
--

CREATE TABLE `nfj_loisirs` (
  `id_loisir` int(11) NOT NULL,
  `libelle_loisir` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `nfj_loisirs`
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
-- Table structure for table `nfj_metier`
--

CREATE TABLE `nfj_metier` (
  `id_metier` int(11) NOT NULL,
  `libelle_metier` varchar(80) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `nfj_metier`
--

INSERT INTO `nfj_metier` (`id_metier`, `libelle_metier`) VALUES
(1, 'techniciens d\'exploitation'),
(2, 'développeur web');

-- --------------------------------------------------------

--
-- Table structure for table `nfj_modules`
--

CREATE TABLE `nfj_modules` (
  `id_module` int(11) NOT NULL,
  `name_module` varchar(100) DEFAULT NULL,
  `show_name_module` varchar(100) DEFAULT NULL,
  `line_module` int(11) DEFAULT NULL,
  `width_module` int(11) DEFAULT NULL,
  `color_module` varchar(30) DEFAULT NULL,
  `font_color_module` varchar(30) DEFAULT NULL,
  `separator_color_module` varchar(30) DEFAULT NULL,
  `data_module` text,
  `show_title_module` tinyint(1) DEFAULT NULL,
  `separator_size_module` int(11) DEFAULT NULL,
  `separator_radius_module` int(11) DEFAULT NULL,
  `border_top_module` int(11) DEFAULT NULL,
  `border_bottom_module` int(11) DEFAULT NULL,
  `border_right_module` int(11) DEFAULT NULL,
  `border_left_module` int(11) DEFAULT NULL,
  `border_radius_module` int(11) DEFAULT NULL,
  `modeAffichage_module` int(2) DEFAULT NULL,
  `icon_module` varchar(150) DEFAULT NULL,
  `font_module` varchar(150) DEFAULT NULL,
  `profil_picture_module` varchar(150) DEFAULT NULL,
  `icon_size_module` int(11) DEFAULT NULL,
  `icon_radius_module` int(11) DEFAULT NULL,
  `module_id_cv_FK` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `nfj_postes`
--

CREATE TABLE `nfj_postes` (
  `id_poste` int(11) NOT NULL,
  `description_poste` text,
  `date_debut_poste` date DEFAULT NULL,
  `date_fin_poste` date DEFAULT NULL,
  `id_cv_poste` int(11) NOT NULL,
  `id_etablissement_poste` int(11) DEFAULT NULL,
  `id_typecontrat_poste` int(11) DEFAULT NULL,
  `id_metier_poste` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `nfj_postes`
--

INSERT INTO `nfj_postes` (`id_poste`, `description_poste`, `date_debut_poste`, `date_fin_poste`, `id_cv_poste`, `id_etablissement_poste`, `id_typecontrat_poste`, `id_metier_poste`) VALUES
(1, 'dev application métiers', '2020-02-05', '2021-02-10', 1, 5, 4, 1),
(2, 'dev métode pdo site.', '2022-02-16', '2022-02-16', 1, 4, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `nfj_softskill`
--

CREATE TABLE `nfj_softskill` (
  `id_softskill` int(11) NOT NULL,
  `libelle_softskill` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `nfj_softskill`
--

INSERT INTO `nfj_softskill` (`id_softskill`, `libelle_softskill`) VALUES
(1, 'autonomie'),
(2, 'à l\'écoute'),
(3, 'entreprenant'),
(4, 'esprit critique');

-- --------------------------------------------------------

--
-- Table structure for table `nfj_typecontrat`
--

CREATE TABLE `nfj_typecontrat` (
  `id_typecontrat` int(11) NOT NULL,
  `intitule_type_contrat` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `nfj_typecontrat`
--

INSERT INTO `nfj_typecontrat` (`id_typecontrat`, `intitule_type_contrat`) VALUES
(1, 'Stage'),
(2, 'Alternance'),
(3, 'CDD'),
(4, 'CDI');

-- --------------------------------------------------------

--
-- Table structure for table `nfj_typediplome`
--

CREATE TABLE `nfj_typediplome` (
  `id_typediplome` int(11) NOT NULL,
  `libelle_type_diplome` varchar(40) NOT NULL,
  `niveau_type_diplome` int(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `nfj_typediplome`
--

INSERT INTO `nfj_typediplome` (`id_typediplome`, `libelle_type_diplome`, `niveau_type_diplome`) VALUES
(1, 'baccalauréat', 0),
(2, 'brevet de technicien supérieur', 2),
(3, 'bachelor', 3),
(4, 'master', 5);

-- --------------------------------------------------------

--
-- Table structure for table `nfj_typeetablissement`
--

CREATE TABLE `nfj_typeetablissement` (
  `id_typeEtablissement` int(11) NOT NULL,
  `libelle_type_etablissement` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `nfj_typeetablissement`
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
-- Table structure for table `nfj_typemetier`
--

CREATE TABLE `nfj_typemetier` (
  `id_typemetier` int(11) NOT NULL,
  `libelle_type_metier` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `nfj_typemetier`
--

INSERT INTO `nfj_typemetier` (`id_typemetier`, `libelle_type_metier`) VALUES
(1, 'développement web'),
(2, 'communication digital');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
