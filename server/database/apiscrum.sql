-- phpMyAdmin SQL Dump
-- version 4.6.6
-- https://www.phpmyadmin.net/
--
-- Client :  apiScrum_mariadb:3306
-- Généré le :  Ven 10 Novembre 2017 à 17:18
-- Version du serveur :  10.1.22-MariaDB-1~jessie
-- Version de PHP :  7.0.15

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `apiscrum`
--

-- --------------------------------------------------------

--
-- Structure de la table `application`
--

CREATE TABLE `application` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `application`
--

INSERT INTO `application` (`id`, `name`) VALUES
(1, 'Web-Caisse'),
(2, 'Fid\'Elite'),
(3, 'ApiCoupon'),
(4, 'ApiFac'),
(5, 'ApiExport'),
(6, 'Prepaid Card'),
(7, 'ApiCate'),
(8, 'Preparation Screen'),
(9, 'Interface de livraison'),
(10, 'ApiProd'),
(11, 'DCPro'),
(12, 'ApiLiv'),
(13, 'ApiTracker'),
(14, 'ApiFile'),
(15, 'Apitic Account'),
(16, 'Online Printing Command'),
(17, 'HACCP'),
(18, 'La boîte à pizza'),
(19, 'ApiShop'),
(20, 'Mythic Burger'),
(21, 'Jour'),
(22, 'Eat SUSHI');

-- --------------------------------------------------------

--
-- Structure de la table `group`
--

CREATE TABLE `group` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(50) NOT NULL,
  `parent_id` int(10) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `group`
--

INSERT INTO `group` (`id`, `name`, `parent_id`) VALUES
(1, 'Administrator', NULL),
(2, 'Product Owner', 1),
(3, 'Scrum Master', 1),
(4, 'Project Manager', 3),
(5, 'Developer', 4);

-- --------------------------------------------------------

--
-- Structure de la table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(191) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(27, '2014_10_12_000000_create_users_table', 1),
(28, '2014_10_12_100000_create_password_resets_table', 1),
(29, '2017_04_25_202832_create_team_table', 1),
(30, '2017_04_25_205628_create_team_member_table', 1),
(31, '2017_05_01_184813_create_sprint_table', 1),
(32, '2017_05_01_185450_create_group_table', 1),
(33, '2017_05_01_185648_add_group_to_users_table', 1),
(34, '2017_05_01_193101_create_application_table', 2),
(40, '2017_05_01_193222_create_task_table', 3),
(41, '2017_05_01_194822_create_task_application_table', 3),
(42, '2017_05_01_195408_create_task_user_table', 3),
(44, '2017_05_26_194352_add_task-added-after_task_table', 4),
(45, '2017_06_10_195952_add_workedHoursParDay_users_table', 5),
(46, '2017_06_10_200701_add_workedDuration_taskUser_table', 6),
(47, '2017_07_03_192232_add_started_at_sprint_table', 7),
(48, '2017_09_28_223854_add_index_token_password-resets_table', 8),
(50, '2017_09_29_104939_add_used_at_password-resets_table', 9),
(52, '2017_10_09_082929_add_timezone_users_table', 10),
(54, '2017_10_10_063104_change_finishedAt_type_task_table', 11),
(55, '2017_10_10_064617_change_date_type_task-user_table', 12),
(56, '2017_10_16_210448_add_type_task_table', 13);

-- --------------------------------------------------------

--
-- Structure de la table `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(191) NOT NULL,
  `token` varchar(191) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `used_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `password_resets`
--

INSERT INTO `password_resets` (`email`, `token`, `created_at`, `used_at`) VALUES
('valentil@gmail.com', '7f34d4ebcccf8c24353146ea1aaeb5f689f8b51dae30dccb41896b6b4bd559d9421dcc1e0cd4b8842965686adb04a372330ba656b4ec8b676857a4acdc6a34c0', '2017-09-29 18:11:55', '2017-09-29 18:12:27'),
('valentil@gmail.com', '81e68edf2fe9f8824b8a767bf73e06fa344d3b644296ae36feb7f7b7c26c02cc7c75318412ed83fa94b6497d3673762e1bf4a3b2b77ca423bd7f86fa8eea4bd5', '2017-09-29 11:02:10', '2017-09-29 11:02:17'),
('valentil@gmail.com', 'ad4741b8baa43c1f5702c0a07c545750a551ee4b90d5a130e4daed5c228446d55dc5c50f7e3fd29c5e193b30125fe35d6252855a213799bb7f85f55277dd78f0', '2017-09-29 10:40:03', '2017-09-29 11:00:34'),
('valentil@gmail.com', 'b0f1008f41f4f04d507b420f738c25276d409e7f19f8ff0caf6e84e96e9e1d690900c29bdd4f8cf60985fa7bc10332839efc3b4e8df180c159a91ec199190f3d', '2017-09-29 11:04:53', '2017-09-29 11:05:03'),
('valentil@gmail.com', 'eda2f7d0d9ced1ae1330330375b8d9b3ed5947e4168158bcb5068e5b7cef1b124f82ea2559fea2d7130dfa5e6b0385de77aabacfc1170ea1aa65b1e4b8ab0284', '2017-09-29 11:20:20', '2017-09-29 18:05:00'),
('valentil@gmail.com', 'f06e4ed7817994626d9402959b25c3d570fb742aa202eaa9e4fce949ff54ef5c6141fb15b841817d4b1bdebf13279faffc23f901ba3e4d486fd70de0fe7182f9', '2017-09-29 11:13:35', '2017-09-29 18:10:54');

-- --------------------------------------------------------

--
-- Structure de la table `sprint`
--

CREATE TABLE `sprint` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(50) NOT NULL,
  `team_id` int(10) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `started_at` date DEFAULT NULL,
  `finished_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `sprint`
--

INSERT INTO `sprint` (`id`, `name`, `team_id`, `created_at`, `updated_at`, `started_at`, `finished_at`) VALUES
(1, 'Sprint test', 1, '2017-05-22 00:00:00', '2017-05-22 00:00:00', '2017-05-24', NULL),
(17, 'Jour Order v3', 2, '2017-11-07 06:45:21', '2017-11-07 06:45:21', '2017-11-06', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `task`
--

CREATE TABLE `task` (
  `id` int(10) UNSIGNED NOT NULL,
  `sprint_id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `name` varchar(200) NOT NULL,
  `description` text,
  `type` tinyint(3) UNSIGNED NOT NULL DEFAULT '0',
  `initial_duration` decimal(10,2) NOT NULL DEFAULT '0.00',
  `remaining_duration` decimal(10,2) NOT NULL DEFAULT '0.00',
  `added_after` tinyint(1) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `finished_at` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `task`
--

INSERT INTO `task` (`id`, `sprint_id`, `user_id`, `name`, `description`, `type`, `initial_duration`, `remaining_duration`, `added_after`, `created_at`, `updated_at`, `finished_at`) VALUES
(3, 1, 1, 'Task 3', 'Description de ma troisième tâche en plus du sprint initial', 1, 4.00, 0.00, 1, '2017-05-26 00:00:00', '2017-05-26 10:00:00', '2017-10-10 04:37:18'),
(8, 1, 1, 'Correction notes', 'Correction des erreurs de notes', 2, 12.50, 9.00, 0, '2017-06-24 20:52:38', '2017-06-24 20:52:38', NULL),
(11, 1, 1, 'Archivage', NULL, 4, 35.00, 25.00, 0, '2017-06-26 21:40:13', '2017-07-04 20:36:46', NULL),
(13, 17, 1, 'Ajout du numéro de ticket au WS sendCommand', NULL, 3, 0.50, 0.00, 0, '2017-11-07 08:11:30', '2017-11-08 16:27:36', '2017-11-09 07:39:56'),
(14, 17, 1, 'WS historique des commandes', 'Historique de notes au plus \"tard\" 12 semaines en arrière et une plage d\'1 semaine max par demande', 2, 7.00, 3.00, 0, '2017-11-07 15:00:04', '2017-11-07 15:00:04', NULL),
(15, 17, 1, 'Ticket spécial pour les salades et les jus', NULL, 2, 7.00, 2.00, 0, '2017-11-07 15:00:35', '2017-11-07 15:00:35', NULL),
(16, 17, 1, 'Type menu (Mélanger ou pas)', '3 types : Mélanger avec sauce, Mélanger sans sauce et Ne pas mélanger\nUtilisation des sous-produits', 3, 15.00, 1.00, 0, '2017-11-07 15:01:44', '2017-11-07 15:01:44', NULL),
(17, 17, 1, 'Ecran de production avec plusieurs états par page', NULL, 3, 20.00, 1.00, 0, '2017-11-07 15:02:08', '2017-11-07 15:02:08', NULL),
(18, 17, 1, 'Gestion des impressions sur l\'écran de production', NULL, 2, 16.00, 3.00, 0, '2017-11-07 15:02:37', '2017-11-07 15:02:37', NULL),
(19, 17, 1, 'Gestion des impressions - Structure de données', 'Structure de données et gestion du changement d\'état', 3, 7.00, 7.00, 0, '2017-11-08 09:30:36', '2017-11-08 09:30:36', NULL);

-- --------------------------------------------------------

--
-- Structure de la table `task_application`
--

CREATE TABLE `task_application` (
  `task_id` int(10) UNSIGNED NOT NULL,
  `application_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `task_application`
--

INSERT INTO `task_application` (`task_id`, `application_id`) VALUES
(8, 1),
(8, 3),
(11, 1),
(11, 2),
(11, 7),
(13, 1),
(14, 1),
(15, 1),
(16, 1),
(17, 1),
(18, 1),
(19, 1);

-- --------------------------------------------------------

--
-- Structure de la table `task_user`
--

CREATE TABLE `task_user` (
  `id` int(10) UNSIGNED NOT NULL,
  `task_id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `date` date NOT NULL,
  `duration` decimal(10,1) NOT NULL DEFAULT '0.0',
  `worked_duration` decimal(10,1) NOT NULL DEFAULT '0.0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `task_user`
--

INSERT INTO `task_user` (`id`, `task_id`, `user_id`, `date`, `duration`, `worked_duration`, `created_at`, `updated_at`) VALUES
(3, 3, 1, '2016-05-31', 1.0, 4.0, '2017-05-31 00:00:00', '2017-05-26 10:00:00'),
(4, 3, 1, '2017-06-06', 4.5, 6.0, '2017-06-06 00:00:00', '2017-05-26 00:00:00'),
(5, 3, 1, '2017-08-30', 0.5, 5.0, '2017-08-30 11:08:45', '2017-08-30 11:59:16'),
(6, 3, 1, '2017-09-12', -0.5, 5.0, '2017-09-12 15:31:13', '2017-09-12 15:31:13'),
(7, 11, 2, '2017-05-31', 5.0, 7.0, '2017-09-15 15:03:57', '2017-09-15 15:03:57'),
(8, 3, 1, '2017-09-17', 1.0, 4.0, '2017-09-17 12:47:56', '2017-09-17 12:47:56'),
(9, 8, 1, '2017-09-17', 3.5, 3.0, '2017-09-17 12:48:09', '2017-09-17 12:48:09'),
(10, 11, 2, '2017-09-17', 5.0, 7.0, '2017-09-17 12:48:24', '2017-09-17 12:48:24'),
(12, 3, 1, '2017-10-10', 1.0, 1.0, '2017-10-10 04:37:18', '2017-10-10 04:37:18'),
(14, 18, 4, '2017-11-07', 1.0, 4.0, '2017-11-07 15:03:51', '2017-11-07 15:03:51'),
(15, 16, 5, '2017-11-07', 4.0, 4.0, '2017-11-07 15:04:06', '2017-11-07 15:04:06'),
(17, 17, 3, '2017-11-07', 2.0, 4.0, '2017-11-07 15:08:06', '2017-11-07 15:08:06'),
(18, 17, 6, '2017-11-07', 3.0, 7.0, '2017-11-07 15:08:30', '2017-11-07 15:08:30'),
(19, 18, 4, '2017-11-08', 5.0, 4.0, '2017-11-08 08:00:34', '2017-11-08 08:00:34'),
(20, 17, 3, '2017-11-08', 4.0, 7.0, '2017-11-08 08:01:24', '2017-11-08 08:01:24'),
(21, 17, 6, '2017-11-08', 4.0, 7.0, '2017-11-08 08:01:35', '2017-11-08 08:01:35'),
(22, 16, 5, '2017-11-08', 7.0, 7.0, '2017-11-08 08:01:50', '2017-11-08 08:01:50'),
(23, 13, 1, '2017-11-09', 0.5, 0.5, '2017-11-09 07:39:38', '2017-11-09 07:39:56'),
(24, 17, 3, '2017-11-09', 3.0, 7.0, '2017-11-09 07:40:34', '2017-11-09 07:40:34'),
(25, 17, 6, '2017-11-09', 3.0, 7.0, '2017-11-09 07:40:44', '2017-11-09 07:40:44'),
(26, 18, 4, '2017-11-09', 5.0, 7.0, '2017-11-09 07:40:57', '2017-11-09 07:40:57'),
(27, 15, 5, '2017-11-09', 5.0, 7.0, '2017-11-09 07:41:25', '2017-11-09 07:41:25'),
(28, 16, 3, '2017-11-10', 3.0, 7.0, '2017-11-10 07:33:09', '2017-11-10 07:33:09'),
(29, 18, 4, '2017-11-10', 2.0, 7.0, '2017-11-10 07:33:20', '2017-11-10 07:33:20'),
(30, 14, 5, '2017-11-10', 4.0, 7.0, '2017-11-10 07:33:41', '2017-11-10 07:33:41'),
(31, 17, 6, '2017-11-10', 0.0, 7.0, '2017-11-10 07:33:51', '2017-11-10 07:33:51');

-- --------------------------------------------------------

--
-- Structure de la table `team`
--

CREATE TABLE `team` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(50) NOT NULL,
  `picture_url` varchar(191) DEFAULT NULL,
  `owner_id` int(10) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `team`
--

INSERT INTO `team` (`id`, `name`, `picture_url`, `owner_id`, `created_at`, `updated_at`) VALUES
(1, 'Apitic', NULL, 1, '2017-05-01 00:00:00', '2017-05-01 00:00:00'),
(2, 'Jour Order v3', NULL, 1, '2017-11-07 08:00:00', '2017-11-07 08:00:00');

-- --------------------------------------------------------

--
-- Structure de la table `team_member`
--

CREATE TABLE `team_member` (
  `team_id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `team_member`
--

INSERT INTO `team_member` (`team_id`, `user_id`) VALUES
(1, 1),
(1, 2),
(2, 1),
(2, 3),
(2, 4),
(2, 5),
(2, 6);

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` int(10) UNSIGNED NOT NULL,
  `group_id` int(10) UNSIGNED NOT NULL,
  `lastname` varchar(191) NOT NULL,
  `firstname` varchar(191) NOT NULL,
  `email` varchar(191) NOT NULL,
  `password` varchar(191) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `worked_hours_per_day` decimal(10,1) NOT NULL DEFAULT '7.0',
  `timezone` varchar(40) NOT NULL DEFAULT 'Europe/Paris',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `users`
--

INSERT INTO `users` (`id`, `group_id`, `lastname`, `firstname`, `email`, `password`, `remember_token`, `worked_hours_per_day`, `timezone`, `created_at`, `updated_at`) VALUES
(1, 1, 'Bellanger', 'Fabien', 'valentil@gmail.com', '$2y$10$qvYN4ALNTzz855g0EJi9aOiofB4Px5L/5zgDERQl/KKxoFwVHUl56', NULL, 7.0, 'Europe/Paris', '2017-05-01 19:15:51', '2017-05-01 19:15:51'),
(2, 5, 'Moreau', 'Guillaume', 'guillaume.moreau@apitic.com', '$2y$10$Uh12xxbDiG6t/Q4hvTEdzuG2ozBDKH/84AMHcVwzw/yB.aBe8ZJOq', NULL, 7.0, 'Europe/Paris', '2017-06-13 19:15:51', '2017-06-13 19:15:51'),
(3, 5, 'Le Gall', 'Adrien', 'adrien.legall@apitic.com', '$2y$10$Uh12xxbDiG6t/Q4hvTEdzuG2ozBDKH/84AMHcVwzw/yB.aBe8ZJOq', NULL, 7.0, 'Europe/Paris', '2017-06-13 19:15:51', '2017-06-13 19:15:51'),
(4, 5, 'Ledeux', 'Thibault', 'thibault.ledeux@apitic.com', '$2y$10$Uh12xxbDiG6t/Q4hvTEdzuG2ozBDKH/84AMHcVwzw/yB.aBe8ZJOq', NULL, 7.0, 'Europe/Paris', '2017-06-13 19:15:51', '2017-06-13 19:15:51'),
(5, 5, 'Ganachaud', 'Alexandre', 'alexandre.ganachaud@apitic.com', '$2y$10$Uh12xxbDiG6t/Q4hvTEdzuG2ozBDKH/84AMHcVwzw/yB.aBe8ZJOq', NULL, 7.0, 'Europe/Paris', '2017-06-13 19:15:51', '2017-06-13 19:15:51'),
(6, 5, 'Cassel', 'Clara', 'cassel.clara@gmail.com', '$2y$10$Uh12xxbDiG6t/Q4hvTEdzuG2ozBDKH/84AMHcVwzw/yB.aBe8ZJOq', NULL, 7.0, 'Europe/Paris', '2017-06-13 19:15:51', '2017-06-13 19:15:51');

--
-- Index pour les tables exportées
--

--
-- Index pour la table `application`
--
ALTER TABLE `application`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `group`
--
ALTER TABLE `group`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `group_name_unique` (`name`),
  ADD KEY `group_parent_id_foreign` (`parent_id`);

--
-- Index pour la table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `password_resets`
--
ALTER TABLE `password_resets`
  ADD UNIQUE KEY `password_resets_token_unique` (`token`),
  ADD KEY `password_resets_email_index` (`email`);

--
-- Index pour la table `sprint`
--
ALTER TABLE `sprint`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sprint_team_id_foreign` (`team_id`);

--
-- Index pour la table `task`
--
ALTER TABLE `task`
  ADD PRIMARY KEY (`id`),
  ADD KEY `task_sprint_id_foreign` (`sprint_id`),
  ADD KEY `task_user_id_foreign` (`user_id`);

--
-- Index pour la table `task_application`
--
ALTER TABLE `task_application`
  ADD PRIMARY KEY (`task_id`,`application_id`),
  ADD KEY `task_application_application_id_foreign` (`application_id`);

--
-- Index pour la table `task_user`
--
ALTER TABLE `task_user`
  ADD PRIMARY KEY (`id`),
  ADD KEY `task_user_task_id_foreign` (`task_id`),
  ADD KEY `task_user_user_id_foreign` (`user_id`);

--
-- Index pour la table `team`
--
ALTER TABLE `team`
  ADD PRIMARY KEY (`id`),
  ADD KEY `team_owner_id_foreign` (`owner_id`);

--
-- Index pour la table `team_member`
--
ALTER TABLE `team_member`
  ADD PRIMARY KEY (`team_id`,`user_id`),
  ADD KEY `team_member_user_id_foreign` (`user_id`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`),
  ADD KEY `users_group_id_foreign` (`group_id`);

--
-- AUTO_INCREMENT pour les tables exportées
--

--
-- AUTO_INCREMENT pour la table `application`
--
ALTER TABLE `application`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;
--
-- AUTO_INCREMENT pour la table `group`
--
ALTER TABLE `group`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;
--
-- AUTO_INCREMENT pour la table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=57;
--
-- AUTO_INCREMENT pour la table `sprint`
--
ALTER TABLE `sprint`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;
--
-- AUTO_INCREMENT pour la table `task`
--
ALTER TABLE `task`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;
--
-- AUTO_INCREMENT pour la table `task_user`
--
ALTER TABLE `task_user`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;
--
-- AUTO_INCREMENT pour la table `team`
--
ALTER TABLE `team`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
--
-- Contraintes pour les tables exportées
--

--
-- Contraintes pour la table `group`
--
ALTER TABLE `group`
  ADD CONSTRAINT `group_parent_id_foreign` FOREIGN KEY (`parent_id`) REFERENCES `group` (`id`);

--
-- Contraintes pour la table `sprint`
--
ALTER TABLE `sprint`
  ADD CONSTRAINT `sprint_team_id_foreign` FOREIGN KEY (`team_id`) REFERENCES `team` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `task`
--
ALTER TABLE `task`
  ADD CONSTRAINT `task_sprint_id_foreign` FOREIGN KEY (`sprint_id`) REFERENCES `sprint` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `task_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `task_application`
--
ALTER TABLE `task_application`
  ADD CONSTRAINT `task_application_application_id_foreign` FOREIGN KEY (`application_id`) REFERENCES `application` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `task_application_task_id_foreign` FOREIGN KEY (`task_id`) REFERENCES `task` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `task_user`
--
ALTER TABLE `task_user`
  ADD CONSTRAINT `task_user_task_id_foreign` FOREIGN KEY (`task_id`) REFERENCES `task` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `task_user_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `team`
--
ALTER TABLE `team`
  ADD CONSTRAINT `team_owner_id_foreign` FOREIGN KEY (`owner_id`) REFERENCES `users` (`id`);

--
-- Contraintes pour la table `team_member`
--
ALTER TABLE `team_member`
  ADD CONSTRAINT `team_member_team_id_foreign` FOREIGN KEY (`team_id`) REFERENCES `team` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `team_member_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_group_id_foreign` FOREIGN KEY (`group_id`) REFERENCES `group` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
