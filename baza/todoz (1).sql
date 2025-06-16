-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 16, 2025 at 02:52 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `todoz`
--

-- --------------------------------------------------------

--
-- Table structure for table `korisnik`
--

CREATE TABLE `korisnik` (
  `id` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `sifra` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `korisnik`
--

INSERT INTO `korisnik` (`id`, `username`, `sifra`, `email`) VALUES
(5, 'marko', 'hashedpassword', NULL),
(6, 'ana', 'hashedpassword1', NULL),
(7, 'vukan', '$2b$10$ZtOskJCth1jUzMF9rYlNU.cQ.Q6zW.SbH5St2w6TJpViKCMG49dZO', NULL),
(8, 'Zoran', '$2b$10$dOSG8LTFEDNUDQlqgMBTOuw1P7YqayUXQ54KxYjpM.0qkE4hrg4MK', NULL),
(9, '1', '$2b$10$sPF4oBME5.RotDt.IW5D/OPvsacIOItTwyYM7HmpwO2g5uM6kvg0e', NULL),
(11, 'test1', '$2b$10$gBNR2i52cy6zAgfbHz9LrOZhfbmTziWPokREACPtY61rTMhWZhm7m', NULL),
(50, 'korisnik', '$2b$10$Ysg2wbOkA36UaJ.qfSWR7OXFLI7Ze1tp4ykm8rBn8e8c3nTXY8dh6', NULL),
(51, 'Тест', '$2b$10$uIFv2lVD66H2MWPG3FbEvedrE332KoKoO6ybU8lQIyT/A3uE76eiC', NULL),
(52, 'e', '$2b$10$SBblypEBd5L1CxEiJd87deaNEgMrjxDKd8BIfuAQWF6VcRNRd0KT2', NULL),
(53, 'ewe', '$2b$10$5ei6kykBea.mkZa6qqleYuxTiBel1qnziFdmwhj9b8UoCvGQPojG2', NULL),
(54, 'TestZaLogin', '$2b$10$pGMufbsQSLg7GwH1yOiDTu6HS4WFKnYPz6P877ZY3PuJnfjY0i4Ei', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `taskovi`
--

CREATE TABLE `taskovi` (
  `id` int(11) NOT NULL,
  `naslov` varchar(30) DEFAULT NULL,
  `izvrsenje` tinyint(1) DEFAULT 0,
  `korisnikov_id` int(11) DEFAULT NULL,
  `napravljeno` timestamp NOT NULL DEFAULT current_timestamp(),
  `kraj` datetime NOT NULL,
  `tip_id` int(11) DEFAULT NULL,
  `opis` text DEFAULT NULL,
  `deskripcija` varchar(500) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `taskovi`
--

INSERT INTO `taskovi` (`id`, `naslov`, `izvrsenje`, `korisnikov_id`, `napravljeno`, `kraj`, `tip_id`, `opis`, `deskripcija`) VALUES
(5, 'Izmenjeno', 0, 5, '2025-04-09 21:34:09', '2025-04-15 12:00:00', 2, 'Novi opis', 'Ovo je test za deskripciju,adkadwakdjaw,dadawkdjnawkldjnadada,adawdjawjdawkdawjdaw'),
(8, 'Izmenjeno', 0, 5, '2025-04-26 13:37:37', '2025-05-01 00:00:00', 2, 'Novi opis', 'Ovo je test za deskripciju,adkadwakdjaw,dadawkdjnawkldjnadada,adawdjawjdawkdawjdaw'),
(12, 'Popraviti grešku u sistemu', 0, 6, '2025-04-26 15:17:19', '2025-04-30 00:00:00', 2, 'Greška u autentifikaciji mora biti ispravljena do kraja nedelje.', NULL),
(14, 'Prepraviti dizajn stranice', 0, 6, '2025-04-26 15:17:28', '2025-07-01 00:00:00', 1, 'Dizajn stranice treba biti prilagođen novom brendu.', NULL),
(15, 'Izmenjeno', 0, 5, '2025-04-26 15:17:31', '2025-05-15 00:00:00', 2, 'Novi opis', NULL),
(17, 'Uraditi domaći', 0, 5, '2025-05-18 15:55:13', '2025-06-01 00:00:00', 2, 'Matematika i fizika', NULL),
(18, 'Rodjendan', 0, 6, '2025-05-18 15:57:42', '2025-06-01 00:00:00', 2, 'Matematika i fizika', NULL),
(20, 'OPISOPIS', 0, 6, '2025-05-26 21:45:25', '2025-05-31 22:00:00', 2, 'Testiram', 'deskripcija'),
(34, 'SAD', 1, 8, '2025-05-31 22:00:00', '2025-05-31 20:00:00', 2, 'Testiram', 'deskripcija'),
(35, '313231', 1, 8, '2025-05-31 22:00:00', '2025-05-30 20:00:00', 2, 'Testiram', 'deskripcija'),
(36, 'eawee', 0, 5, '2025-05-27 19:19:00', '2025-05-29 23:19:00', 2, 'aewweaw', 'eaweawea'),
(38, 'TestzaTest', 0, 11, '2025-05-27 20:21:00', '2025-05-29 00:20:00', 2, 'eq231', 'aweawe'),
(39, 'e1q231', 0, 11, '2025-05-27 20:21:00', '2025-05-30 00:21:00', 2, '3123', '313213'),
(143, 'Pripremiti izveštaj', 0, 11, '2025-05-09 22:00:00', '2025-05-15 00:00:00', 1, 'Detaljan mesečni izveštaj', 'Izveštaj za menadžment'),
(144, 'Odraditi prezentaciju', 0, 11, '2025-05-10 22:00:00', '2025-05-18 00:00:00', 2, 'Prezentacija o novim proizvodima', 'Za sastanak sa klijentima'),
(145, 'Pozvati klijente', 0, 11, '2025-05-08 22:00:00', '2025-05-12 00:00:00', 1, 'Dogovoriti nove sastanke', 'Važno za prodaju'),
(146, 'Organizovati sastanak', 0, 11, '2025-05-07 22:00:00', '2025-05-14 00:00:00', 1, 'Tim sastanak za planiranje', 'Koordinacija projekata'),
(147, 'Ažurirati bazu podataka', 0, 11, '2025-05-06 22:00:00', '2025-05-13 00:00:00', 2, 'Uneti nove informacije o korisnicima', 'Podaci za CRM'),
(148, 'Pripremiti budžet', 0, 11, '2025-05-05 22:00:00', '2025-05-20 00:00:00', 1, 'Planiranje troškova za kvartal', 'Finansijski pregled'),
(149, 'Napraviti analizu tržišta', 0, 11, '2025-05-04 22:00:00', '2025-05-25 00:00:00', 1, 'Prikupljanje i analiza podataka', 'Izveštaj o konkurenciji'),
(150, 'Testirati softver', 0, 11, '2025-05-03 22:00:00', '2025-05-15 00:00:00', 2, 'Provera novih funkcionalnosti', 'QA zadatak'),
(151, 'Napisati blog post', 0, 11, '2025-05-02 22:00:00', '2025-05-10 00:00:00', 1, 'Tema: Trendovi u tehnologiji', 'Za kompanijski blog'),
(152, 'Pripremiti marketinšku kampanj', 0, 11, '2025-05-01 22:00:00', '2025-05-20 00:00:00', 1, 'Kampanja za novi proizvod', 'Ciljna grupa: mladi'),
(153, 'SAD UVECE NOCU', 0, 11, '2025-05-27 20:39:00', '2029-06-28 00:39:00', 2, 'dqawawdrqe', 'eqweqe'),
(154, 'e12', 0, 11, '2025-05-27 20:39:00', '2025-05-30 00:39:00', 2, '313', '123'),
(168, 'Kupovina namirnica', 1, 50, '2025-05-28 07:00:00', '2025-08-30 08:00:00', 1, 'Kupiti hleb, mleko i jaja', 'Prioritetnoe'),
(169, 'Završiti domaći iz fizike', 1, 50, '2025-05-28 08:00:00', '2025-05-29 15:00:00', 2, 'Zadaci sa zadnje strane', 'Važno za ocenu'),
(170, 'Odraditi vežbe iz programiranj', 1, 50, '2025-05-27 14:30:00', '2025-05-28 20:00:00', 1, 'React i Express vežbe', 'Maturski projekat'),
(171, 'Trening u teretani', 1, 50, '2025-05-28 06:00:00', '2025-05-28 07:30:00', 2, 'Rad na nogama', 'Nastaviti rutinu'),
(172, 'Sastanak sa mentorom', 1, 50, '2025-05-28 11:00:00', '2025-05-28 12:00:00', 1, 'Razgovor o projektu', 'Dobiti savete za frontend'),
(173, 'Učiti za prijemni', 1, 50, '2025-05-28 09:00:00', '2025-06-15 16:00:00', 2, 'Fizika i matematika', '3 sata dnevno'),
(174, 'Pročitati knjigu', 1, 50, '2025-05-28 15:00:00', '2025-06-01 19:00:00', 1, 'Započeti \"Na Drini ćuprija\"', 'Za esej'),
(175, 'Pomoći baki u bašti', 1, 50, '2025-05-29 08:00:00', '2025-05-29 12:00:00', 2, 'Sadnja paradajza', 'Porodična pomoć'),
(176, 'Napraviti plan učenja', 1, 50, '2025-05-27 18:00:00', '2025-05-28 08:00:00', 1, 'Raspored tema po danima', 'Početi već danas'),
(177, 'Očistiti sobu', 1, 50, '2025-05-28 05:30:00', '2025-05-28 07:00:00', 2, 'Usisavanje i brisanje prašine', 'Priprema za vikend'),
(178, 'Rodjendan', 1, 8, '2025-05-28 09:16:00', '2025-05-28 23:16:00', 2, 'Tad ai tadawe', 'daw dqawdq2ed12ed12d1d1d21e2'),
(179, 'TestZaUradjen', 1, 8, '2025-05-28 11:01:00', '2025-05-25 12:00:00', 2, 'Tsest', 'daweqe1q2313');

-- --------------------------------------------------------

--
-- Table structure for table `tipovi`
--

CREATE TABLE `tipovi` (
  `id` int(11) NOT NULL,
  `naziv_tipa` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tipovi`
--

INSERT INTO `tipovi` (`id`, `naziv_tipa`) VALUES
(1, 'event'),
(2, 'task');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `korisnik`
--
ALTER TABLE `korisnik`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD KEY `sifra_4` (`sifra`);

--
-- Indexes for table `taskovi`
--
ALTER TABLE `taskovi`
  ADD PRIMARY KEY (`id`),
  ADD KEY `korisnikov_id` (`korisnikov_id`),
  ADD KEY `tip_id` (`tip_id`);

--
-- Indexes for table `tipovi`
--
ALTER TABLE `tipovi`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `naziv_tipa` (`naziv_tipa`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `korisnik`
--
ALTER TABLE `korisnik`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;

--
-- AUTO_INCREMENT for table `taskovi`
--
ALTER TABLE `taskovi`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=180;

--
-- AUTO_INCREMENT for table `tipovi`
--
ALTER TABLE `tipovi`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `taskovi`
--
ALTER TABLE `taskovi`
  ADD CONSTRAINT `taskovi_ibfk_1` FOREIGN KEY (`korisnikov_id`) REFERENCES `korisnik` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `taskovi_ibfk_2` FOREIGN KEY (`tip_id`) REFERENCES `tipovi` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
