-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 30, 2018 at 12:36 AM
-- Server version: 10.1.30-MariaDB
-- PHP Version: 7.2.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `eventmanagement`
--

CREATE DATABASE `EventManagement`;
use EventManagement;

-- --------------------------------------------------------

--
-- Table structure for table `event`
--

CREATE TABLE `event` (
  `event_id` int(11) NOT NULL,
  `hashtag` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `author` varchar(255) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `price` double DEFAULT NULL,
  `start_date` bigint(20) DEFAULT NULL,
  `end_date` bigint(20) DEFAULT NULL,
  `creation_date` bigint(20) DEFAULT NULL,
  `title` varchar(255) DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `event`
--

INSERT INTO `event` (`event_id`, `hashtag`, `description`, `author`, `location`, `price`, `start_date`, `end_date`, `creation_date`, `title`, `status`, `image`) VALUES
  (1, 'RITSpringFest', 'RIT annual event', '1', 'RIT campus', 0, 1525514400, 1525525200, 1524000000, 'RIT Spring Fest', 'open', NULL),
  (2, '#ReadingDay', 'Semester event for finals', '1', 'campus', 25.5, 1524000000, 1524681975, 1524000000, 'Spring Reading Day 2018', 'open', NULL),
  (3, 'RITSpringFest', 'RIT annual event', '1', 'RIT campus', 0, 1525514400, 1525525200, 1525514400, 'RIT Spring', 'open', NULL),
  (4, 'RITSpringFest', 'RIT annual event', '1', 'RIT campus', 0, 1525514400, 1525525200, 1525514400, 'RIT Spring2', 'open', '11'),
  (5, 'RITSpringFest', 'RIT annual event', '1', 'RIT campus', 0, 1525514400, 1525525200, 1525514400, 'RIT Spring12', 'open', '11');

-- --------------------------------------------------------

--
-- Table structure for table `message`
--

CREATE TABLE `message` (
  `message_id` int(11) NOT NULL,
  `from_user` int(11) DEFAULT NULL,
  `to_user` int(11) DEFAULT NULL,
  `message` varchar(255) DEFAULT NULL,
  `shared_time` bigint(20) DEFAULT NULL,
  `event_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `message`
--

INSERT INTO `message` (`message_id`, `from_user`, `to_user`, `message`, `shared_time`, `event_id`) VALUES
  (1, 1, 2, 'Enjoy your Spring Fest', 1524680000, 1),
  (2, 2, 1, 'Start your reading now', 1524200000, 2),
  (3, 1, 2, 'Hi there', 1524778073, 1),
  (4, 1, 2, 'alo', 1524954178835, 1),
  (5, 1, 2, 'alo', 1524954389, 1);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `order_id` int(11) NOT NULL,
  `event_id` int(11) NOT NULL,
  `price` double DEFAULT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`order_id`, `event_id`, `price`, `user_id`) VALUES
  (1, 1, 0, 1),
  (2, 2, 25.5, 2);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `permission` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `first_name`, `last_name`, `permission`, `email`) VALUES
  (1, 'Chris', 'Vuong', 'admin', 'hnv1002@rit.edu'),
  (2, 'John', 'Smith', 'user', 'jnsxxxx@rit.edu'),
  (10, 'Chris', 'Vuong', 'user', 'hvuong94@gmail.com');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `event`
--
ALTER TABLE `event`
  ADD PRIMARY KEY (`event_id`),
  ADD UNIQUE KEY `event_id` (`event_id`),
  ADD UNIQUE KEY `title` (`title`);

--
-- Indexes for table `message`
--
ALTER TABLE `message`
  ADD PRIMARY KEY (`message_id`),
  ADD UNIQUE KEY `message_id` (`message_id`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`order_id`),
  ADD UNIQUE KEY `order_id` (`order_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `user_id` (`user_id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `event`
--
ALTER TABLE `event`
  MODIFY `event_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `message`
--
ALTER TABLE `message`
  MODIFY `message_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `order_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;