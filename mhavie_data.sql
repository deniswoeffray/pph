-- phpMyAdmin SQL Dump
-- version 4.5.4.1deb2ubuntu2
-- http://www.phpmyadmin.net
--
-- Client :  localhost
-- Généré le :  Dim 27 Mai 2018 à 15:59
-- Version du serveur :  5.7.22-0ubuntu0.16.04.1
-- Version de PHP :  7.0.30-0ubuntu0.16.04.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `grp13`
--

--
-- Contenu de la table `category`
--

INSERT INTO `category` (`id`, `position`, `name`) VALUES
(1, 1, 'Nutrition'),
(2, 2, 'Condition corporelle'),
(3, 3, 'Soins personnels'),
(4, 4, 'Communication'),
(5, 5, 'Habitation'),
(6, 6, 'Déplacements'),
(7, 7, 'Responsabilités'),
(8, 8, 'Relations interpersonnelles'),
(9, 9, 'Vie communautaire'),
(10, 10, 'Education'),
(11, 11, 'Travail'),
(12, 12, 'Loisirs');

--
-- Contenu de la table `question`
--

INSERT INTO `question` (`id`,`number`, `position`, `question`, `description`, `category_id`) VALUES
(1,1,1, 'Préparer vos repas', 'Planification et préparation des repas.', 1),
(2,2,2, 'Prendre vos repas', NULL, 1),
(3,3,1, 'Dormir', NULL, 2),
(4,4,2, 'Maintenir une bonne condition physique et mentale', 'exercices physiques, relaxation, psychothérapie', 2),
(5,5,1, 'Assurer vos soins personnels', 'Hygiène, apparence, soins de santé', 3),
(6,6,2, 'Vous habiller et vous déshabiller', 'vêtements, accessoires, incluant le choix des vêtements', 3),
(7,7,1, 'Echanger de l\'information sous différentes formes', 'orale, écrite, corporelle, électronique', 4),
(8,8,1, 'Réaliser les activités reliées à votre résidence', 'aménagement, entretien, utilisation des équipements', 5),
(9,9,2, 'Vous déplacer sur de courtes distances', 'dans votre résidence ou votre environnement restreint', 5),
(10,10,1, 'Vous déplacer à l\'aide de moyens de transport', 'comme conducteur ou passager', 6),
(11,11,1, 'Assurer vos responsabilités civiles, civiques et familiales', 'prise en charge d\'individus ou d\'animaux de compagnie', 7),
(12,12,2, 'Assurer vos responsabilités financières', 'gestion administrative', 7),
(13,13,1, 'Avoir des relations affectives ou intimes', 'conjoint, famille', 8),
(14,14,2, 'Avoir des relations sociales', 'amis, voisins, ...', 8),
(15,15, 1, 'Participer aux activités et organisations de votre milieu', 'associations, clubs, pratique religieuse ou spirituelle', 9),
(16,16, 2, 'Faire vos achats et utiliser les commerces et services publics de votre milieu', 'Poste, administration, services sociaux, hôpitaux', 9),
(17,17, 1, 'Réaliser des activités reliées à votre formation', 'scolaire, professionnelle...', 10),
(18,18, 1, 'Réaliser des activités reliées à un emploi', 'recherche, exécution de tâche...', 11),
(19,19, 2, 'Réaliser des activités reliées à une occupation non rémunérée', 'bénévolat, activité rémunérée, occupationnelle', 11),
(20,20, 1, 'Réaliser des activités de loisirs', 'art, sports, passe-temps, sorties...', 12);

--
-- Contenu de la table `user`
--

INSERT INTO `user` (`id`, `nom`, `prenom`, `email`, `password`, `role`) VALUES
(1, 'Woeffray', 'Denis', 'denis.woeffray@gmail.com', 'pph1234', 'admin'),
(2, 'Berret', 'Kevin', 'kevin.berret@gmail.com', 'pph1234', 'user');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
