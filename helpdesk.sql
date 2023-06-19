-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 13, 2023 at 10:28 AM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.1.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `helpdesk`
--

-- --------------------------------------------------------

--
-- Table structure for table `helpdesk`
--

CREATE TABLE `helpdesk` (
  `id` int(11) NOT NULL,
  `title` varchar(250) NOT NULL,
  `description` text NOT NULL,
  `contact` varchar(100) NOT NULL,
  `tel` varchar(10) NOT NULL,
  `email` varchar(100) NOT NULL,
  `time_create` timestamp NOT NULL DEFAULT current_timestamp(),
  `time_update` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `status` int(11) NOT NULL,
  `note` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `helpdesk`
--

INSERT INTO `helpdesk` (`id`, `title`, `description`, `contact`, `tel`, `email`, `time_create`, `time_update`, `status`, `note`) VALUES
(1, 'test1_1', 'การทดลองเพิ่มข้อมูลครั้งที่1\nการทดลองเพิ่มข้อมูลครั้งที่1\nการทดลองเพิ่มข้อมูลครั้งที่1', 'test1@test1', '0987654321', 'test1@test1.com', '2023-06-12 16:59:42', '2023-06-13 08:11:37', 1, 'note111'),
(2, 'test2_1', 'test2test2test2test2test2test2test2test2test2test2test2test2test2test2test2test2test2test2test2', 'test2_test2', '2222222222', 'test2@test2.com', '2023-06-12 20:58:53', '2023-06-13 08:27:56', 0, 'test2'),
(3, 'tets3', 'tets3tets3tets3tets3tets3tets3tets3tets3tets3tets3tets3tets3tets3tets3', 'tets3_tets3', '0987654321', 'tets3@tets3.com', '2023-06-13 06:26:34', '2023-06-13 08:27:51', 3, ''),
(4, 'test4', 'test4test4test4test4test4test4test4test4test4test4test4test4test4test4test4test4test4test4test4', 'test4_test4', '4444444444', 'test4@test4.com', '2023-06-13 07:28:13', '2023-06-13 07:44:05', 0, ''),
(5, 'test5', 'test5test5test5test5test5test5test5test5test5test5test5test5test5test5test5test5test5test5test5test5test5test5test5test5test5test5', 'test5_test5', '5555555555', 'test5@test5.com', '2023-06-13 07:29:10', '2023-06-13 08:27:46', 2, ''),
(6, 'test6', 'test6test6test6test6test6test6test6test6test6test6test6test6test6test6test6test6test6test6test6test6test6test6test6test6test6test6', 'test6_test6', '6666666666', 'test6@test6.com', '2023-06-13 07:36:58', '2023-06-13 08:27:49', 3, '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `helpdesk`
--
ALTER TABLE `helpdesk`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `helpdesk`
--
ALTER TABLE `helpdesk`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
