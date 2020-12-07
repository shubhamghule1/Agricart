-- MySQL dump 10.13  Distrib 8.0.21, for Linux (x86_64)
--
-- Host: localhost    Database: efertilizer_store
-- ------------------------------------------------------
-- Server version	8.0.21-0ubuntu0.20.04.4

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
-- Table structure for table `fertilizers`
--

DROP TABLE IF EXISTS `fertilizers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fertilizers` (
  `fert_id` int NOT NULL AUTO_INCREMENT,
  `man_id` int NOT NULL,
  `fert_type` varchar(20) NOT NULL,
  `fert_mfd` date NOT NULL,
  `fert_expiry` date NOT NULL,
  `stock` int NOT NULL,
  `image` varchar(255) NOT NULL,
  `price_per_unit` int NOT NULL,
  `availability` int NOT NULL DEFAULT '1',
  `fert_name` varchar(100) DEFAULT NULL,
  `fert_category` varchar(20) NOT NULL,
  `fert_desc` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`fert_id`),
  KEY `man_id` (`man_id`),
  CONSTRAINT `fertilizers_ibfk_1` FOREIGN KEY (`man_id`) REFERENCES `manufacturers` (`man_id`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fertilizers`
--

LOCK TABLES `fertilizers` WRITE;
/*!40000 ALTER TABLE `fertilizers` DISABLE KEYS */;
INSERT INTO `fertilizers` VALUES (15,10,'Liquid','2020-12-10','2022-06-15',0,'assets/images/fertilizer/BioVita.jpg',1000,0,'BioVita','Organic','BIOVITA is based on seaweed Ascophyllum nodosum, the finest marine plant available for agricultural use and is recognized the world over as an excellent natural fertilizer and source of organic matter.'),(16,11,'Solid','2020-12-10','2022-10-05',27,'assets/images/fertilizer/Krista-K.jpg',2000,1,'Krista-K','Inorganic','Krista K is a fully water soluble nitrogen and potassium fertilizer. It is a free-flowing, fine crystalline powder which dissolves quickly in water without any residues. ... Potassium improves: The efficiency of other nutrients, lifting crop yields.');
/*!40000 ALTER TABLE `fertilizers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `manufacturers`
--

DROP TABLE IF EXISTS `manufacturers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `manufacturers` (
  `man_id` int NOT NULL AUTO_INCREMENT,
  `man_name` varchar(255) NOT NULL,
  `man_address` varchar(255) NOT NULL,
  `man_license` varchar(12) NOT NULL,
  `man_availability` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`man_id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `manufacturers`
--

LOCK TABLES `manufacturers` WRITE;
/*!40000 ALTER TABLE `manufacturers` DISABLE KEYS */;
INSERT INTO `manufacturers` VALUES (10,'Basant Agro','Basant Agro Tech (I) Ltd. Near S.T.Workshop, Kaulkhed, Akola. 444 044.','F101010001',1),(11,'Gujarat State Fertilizer','P.O. Fertilizernagar - 391 750, Dist. Vadodara Gujarat (India)','F101010002',1),(12,'Indian Farmers Fertilizer','Indian Farmers Fertiliser Cooperative Limited (IFFCO) ,IFFCO Sadan, C-1, District Centre,Saket Place, New Delhi - 110017','F101010003',1),(13,'Zuari Industries Limited','Zuari Industries Limited Jai Kisaan Bhawan Zuarinagar - Goa 403 726.','F101010004',1),(14,'United Phosphorous Limited','United Phosphorus Limited Uniphos House, Madhu Park Centre,','F101010005',1);
/*!40000 ALTER TABLE `manufacturers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_details`
--

DROP TABLE IF EXISTS `order_details`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_details` (
  `order_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `fert_id` int NOT NULL,
  `quantity` int NOT NULL,
  `total_cost` int NOT NULL,
  `orderDate` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `alt_contact` varchar(12) DEFAULT NULL,
  `pay_mode` varchar(25) NOT NULL DEFAULT 'Cash On Delivery',
  PRIMARY KEY (`order_id`),
  KEY `user_id` (`user_id`),
  KEY `fert_id` (`fert_id`),
  CONSTRAINT `order_details_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `order_details_ibfk_2` FOREIGN KEY (`fert_id`) REFERENCES `fertilizers` (`fert_id`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_details`
--

LOCK TABLES `order_details` WRITE;
/*!40000 ALTER TABLE `order_details` DISABLE KEYS */;
INSERT INTO `order_details` VALUES (39,10,15,3,3000,'2020-12-05 06:42:02','9021443354','Debit Card'),(40,10,15,27,27000,'2020-12-05 06:47:26','9021443354','Debit Card'),(41,10,16,5,10000,'2020-12-05 07:20:59','9021443354','Debit Card'),(42,11,16,3,6000,'2020-12-05 07:23:28','7385065327','Debit Card');
/*!40000 ALTER TABLE `order_details` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `orderDetails_after_insert` AFTER INSERT ON `order_details` FOR EACH ROW CALL reduce_stock(new.fert_id,new.quantity) */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `user_name` varchar(30) NOT NULL,
  `user_username` varchar(20) NOT NULL,
  `user_contact` varchar(13) NOT NULL,
  `user_email` varchar(30) NOT NULL,
  `user_password` varchar(50) NOT NULL,
  `user_type` varchar(20) NOT NULL,
  `user_availability` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `user_username` (`user_username`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Shubham Garje','shubham','8585232385','samplegarje@email.com','12345','ADMIN',1),(10,'Shubham Ghule','shubham25','9021443354','shubhamghule@gmail.com','12345','CUSTOMER',1),(11,'Vaibhav Kanade','vaibhav','7385065327','vaibhavkanade03@gmail.com','12345','CUSTOMER',1);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'efertilizer_store'
--
/*!50003 DROP PROCEDURE IF EXISTS `reduce_stock` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `reduce_stock`(IN f_id INT,IN qty INT)
BEGIN DECLARE quant INT DEFAULT qty; SET quant =(SELECT stock FROM fertilizers WHERE fert_id=f_id) - quant; if quant>0 then UPDATE fertilizers SET stock=quant WHERE fert_id=f_id; else UPDATE fertilizers SET stock=quant, availability=0 WHERE fert_id=f_id; end if; end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-12-05 13:03:12
