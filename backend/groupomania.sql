-- MySQL dump 10.13  Distrib 8.0.24, for Win64 (x86_64)
--
-- Host: localhost    Database: groupomania
-- ------------------------------------------------------
-- Server version	8.0.24

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `comments`
--

DROP TABLE IF EXISTS `comments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comments` (
  `id` int NOT NULL AUTO_INCREMENT,
  `content` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `PostId` int DEFAULT NULL,
  `UserId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `PostId` (`PostId`),
  KEY `UserId` (`UserId`),
  CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`PostId`) REFERENCES `posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comments`
--

LOCK TABLES `comments` WRITE;
/*!40000 ALTER TABLE `comments` DISABLE KEYS */;
INSERT INTO `comments` VALUES (1,'Magnifique, non ?','2021-06-14 21:30:31','2021-06-14 21:30:31',1,1),(2,'Oui c\'est très beau !','2021-06-14 21:32:06','2021-06-14 21:32:06',1,2),(3,'Quelle palette de couleurs !','2021-06-14 21:33:11','2021-06-14 21:33:11',2,2),(4,'Quelle beauté !','2021-06-14 21:35:39','2021-06-14 21:35:39',3,3),(5,'Splendide tout simplement','2021-06-14 21:35:53','2021-06-14 21:35:53',2,3),(6,'Un velouté de rose, d\'orange, quelle merveille !','2021-06-14 21:36:21','2021-06-14 21:36:21',1,3),(7,'Combien en comptez-vous à l\'oeil nu ?','2021-06-14 21:37:28','2021-06-14 21:37:28',4,3),(8,'Comme un semblant de galaxie embryonnaire...','2021-06-14 21:38:37','2021-06-14 21:38:37',5,3),(9,'J\'ai rarement vu une telle variété de couleurs se mélanger aussi bien ','2021-06-14 21:39:34','2021-06-14 21:39:34',1,3),(10,'Il n\'y a pas de mot plus fort que \"infinie\" ou \"beauté\"','2021-06-14 21:41:25','2021-06-14 21:41:25',5,1),(14,'Super couleurs !','2021-06-19 19:03:20','2021-06-19 19:03:20',5,7);
/*!40000 ALTER TABLE `comments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `posts` (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  `imgFile` text,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `UserId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `UserId` (`UserId`),
  CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (1,'Une galaxie magnifique','L\'immensité de l\'univers','http://localhost:3000/images/h1623706217220.jpg','2021-06-14 21:30:17','2021-06-14 21:30:17',1),(2,'Cette galaxie est envoûtante !','Notre merveilleux univers','http://localhost:3000/images/p1623706368892.jpg','2021-06-14 21:32:48','2021-06-14 21:32:48',2),(3,'Une autre vision de la Terre ','Notre planète bleue vue de l\'espace','http://localhost:3000/images/N1623706469362.jpg','2021-06-14 21:34:29','2021-06-14 21:34:29',2),(4,'Un amas globulaire','Myriades d\'étoiles','http://localhost:3000/images/p1623706619280.jpg','2021-06-14 21:36:59','2021-06-14 21:36:59',3),(5,'Encore une splendeur accrochée au ciel d\'onyx','Que peut-on dire de plus ?','http://localhost:3000/images/h1623706696543.jpg','2021-06-14 21:38:16','2021-06-14 21:38:16',3);
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `imgProfile` varchar(255) NOT NULL DEFAULT 'http://127.0.0.1:3000/images/avatars/user_default.jpg',
  `admin` int DEFAULT '0',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `Users_username_unique` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'dasyx','dasyx@gmail.com','$2b$10$dyoXG1kAM3Z5SsdiiTzDCeNovegipdqPFXbisbuVR1Ss5E8o46gZW','http://127.0.0.1:3000/images/avatars/user_default.jpg',1,'2021-06-14 21:29:26','2021-06-14 21:29:26'),(2,'alexandra','alex@gmail.com','$2b$10$oxFJbMg17SO.4oozlp5d5.tO3P24f9/pt53zNlwlxKXgP4P6cQUcW','http://127.0.0.1:3000/images/avatars/user_default.jpg',0,'2021-06-14 21:31:50','2021-06-14 21:31:50'),(3,'elyah','elyah@gmail.com','$2b$10$nbzNXST3W0EVvl9itdE81eLVTuYB9XFzriP.5.be7dfSZxdPmP3J2','http://127.0.0.1:3000/images/avatars/user_default.jpg',0,'2021-06-14 21:35:20','2021-06-14 21:35:20'),(7,'user','user@gmail.com','$2b$10$V6iTZWv.rnBjoJCHmCgQGumxozQGUTf17AJ/vYGeyf9hdTIcPzwt2','http://127.0.0.1:3000/images/avatars/user_default.jpg',0,'2021-06-19 17:33:45','2021-06-19 17:33:45'),(8,'utilisateur','utilisateur@gmail.com','$2b$10$3yDf2i6S639rQENoIbUkD.Hoi3lvB.VtJ0yhbkdZkD2LN0i06iXCe','http://127.0.0.1:3000/images/avatars/user_default.jpg',0,'2021-06-20 16:23:15','2021-06-20 16:23:15');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-06-21 13:58:33
