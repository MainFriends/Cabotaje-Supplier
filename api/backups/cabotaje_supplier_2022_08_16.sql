-- MySQL dump 10.13  Distrib 8.0.28, for Win64 (x86_64)
--
-- Host: localhost    Database: cabotaje_supplier
-- ------------------------------------------------------
-- Server version	8.0.28

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
-- Table structure for table `accounts_receivable`
--

DROP TABLE IF EXISTS `accounts_receivable`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `accounts_receivable` (
  `COD_ACC_RECEIVABLE` bigint NOT NULL AUTO_INCREMENT COMMENT 'PK DE LAS CUENTA POR COBRAR',
  `COD_INVOICE` bigint DEFAULT NULL COMMENT 'FK DE LA TABLA FACTURA VENTA',
  `DESCRIPTION` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT 'DESCRIPCION',
  `TOT_BALANCE` decimal(10,2) NOT NULL COMMENT 'SALDO TOTAL DE LA CUENTA POR COBRAR',
  `DAT_LIMIT` date NOT NULL COMMENT 'PLAZO',
  `STARTING_AMOUNT` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`COD_ACC_RECEIVABLE`),
  KEY `FK_INVSALES_ACCRECEIVABLE` (`COD_INVOICE`),
  CONSTRAINT `FK_INVSALES_ACCRECEIVABLE` FOREIGN KEY (`COD_INVOICE`) REFERENCES `sales_invoice` (`COD_INVOICE`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accounts_receivable`
--

LOCK TABLES `accounts_receivable` WRITE;
/*!40000 ALTER TABLE `accounts_receivable` DISABLE KEYS */;
INSERT INTO `accounts_receivable` VALUES (1,13,'SDCSDF',13.00,'2022-08-13',83.00),(2,14,'3dfdf',19.25,'2022-08-07',89.25),(3,32,'Una descripci√≥n',5.55,'2022-08-18',5.55),(4,52,'Descripcion',30.55,'2022-08-17',30.55),(5,53,'Descripcion',30.55,'2022-08-17',30.55),(6,54,'Descripcion',30.55,'2022-08-17',30.55),(7,55,'Descripcion',30.55,'2022-08-17',30.55),(8,56,'Descripcion',30.55,'2022-08-17',30.55),(9,57,'Descripcion',30.55,'2022-08-17',30.55),(10,58,'Descripci√≥n',30.55,'2022-08-17',30.55),(11,59,'Descripci√≥n',30.55,'2022-08-17',30.55),(12,60,'Descripci√≥n',30.55,'2022-08-17',30.55),(13,61,'Descripci√≥n',30.55,'2022-08-17',30.55),(14,62,'Descripci√≥n',30.55,'2022-08-17',30.55),(15,63,'Descripci√≥n',30.55,'2022-08-17',30.55),(16,64,'Descripci√≥n',28.55,'2022-08-17',28.55),(17,65,'Descripci√≥n',28.55,'2022-08-17',28.55),(18,66,'Descripci√≥n',28.55,'2022-08-17',28.55),(19,67,'Descripci√≥n',28.55,'2022-08-17',28.55),(20,68,'Descripci√≥n',30.55,'2022-08-17',30.55),(21,69,'Descripci√≥n',30.55,'2022-08-17',30.55),(22,76,'Cuenta por cobrar',20.55,'2022-08-16',20.55),(23,80,'Cualquier cosa',55.00,'2022-08-24',55.00);
/*!40000 ALTER TABLE `accounts_receivable` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `accounts_to_pay`
--

DROP TABLE IF EXISTS `accounts_to_pay`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `accounts_to_pay` (
  `COD_ACC_PAY` bigint NOT NULL AUTO_INCREMENT COMMENT 'PK DE LA TABLA FACTURA COMPRA',
  `COD_INVOICE` bigint DEFAULT NULL COMMENT 'COD DE LA FACTURA DE COMPRA',
  `DESCRIPTION` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT 'COD DE LA DESCRIPCION',
  `TOT_BALANCE` decimal(10,2) NOT NULL COMMENT 'BALANCE TOTAL',
  `DATE_LIMIT` date NOT NULL COMMENT 'FECHA LIMITE',
  PRIMARY KEY (`COD_ACC_PAY`),
  KEY `FK_IVCPURCHASE_ACCTOPAY` (`COD_INVOICE`),
  CONSTRAINT `FK_IVCPURCHASE_ACCTOPAY` FOREIGN KEY (`COD_INVOICE`) REFERENCES `purchase_invoice` (`COD_INVOICE`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accounts_to_pay`
--

LOCK TABLES `accounts_to_pay` WRITE;
/*!40000 ALTER TABLE `accounts_to_pay` DISABLE KEYS */;
/*!40000 ALTER TABLE `accounts_to_pay` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category` (
  `COD_CATEGORY` bigint NOT NULL AUTO_INCREMENT,
  `NAM_CATEGORY` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `DESCRIPTION` text CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `COD_STATUS` bigint DEFAULT NULL,
  PRIMARY KEY (`COD_CATEGORY`),
  KEY `FK_STATUS_CATEGORY` (`COD_STATUS`),
  CONSTRAINT `FK_STATUS_CATEGORY` FOREIGN KEY (`COD_STATUS`) REFERENCES `status` (`COD_STATUS`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (2,'Refrescos','Ricos refrescos exportados desde las lejanias de estados unidos para ofrecer un producto unico y saludable.',1),(16,'Panes','Ricos Panes',1),(17,'Lacteos','Lacteos de prueba',1),(18,'Carnes','',1),(19,'Cafes','',1),(20,'Embutidos','',1);
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `client`
--

DROP TABLE IF EXISTS `client`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `client` (
  `COD_CLIENT` bigint NOT NULL AUTO_INCREMENT COMMENT 'PK DE LA TABLA CLIENTE',
  `IDENTITY` varchar(13) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT 'IDENTIDAD DEL USUARIO',
  `FIRST_NAME` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT 'PRIMER NOMBRE DEL CLIENTE',
  `LAST_NAME` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT 'APELLIDO DEL CLIENTE',
  `ADDRESS` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT 'LA DIRECCION',
  `NUM_PHONE_ONE` int NOT NULL COMMENT 'NUMERO DE CELULAR UNO',
  `NUM_PHONE_TWO` int DEFAULT NULL COMMENT 'NUMERO DE CELULAR 2 (OPCIONAL)',
  `RTN` varchar(14) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT 'RTN DEL CLIENTE',
  `MIDDLE_NAME` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `SECOND_LAST_NAME` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`COD_CLIENT`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `client`
--

LOCK TABLES `client` WRITE;
/*!40000 ALTER TABLE `client` DISABLE KEYS */;
INSERT INTO `client` VALUES (1,'0','CF','','',0,0,'0',NULL,NULL),(2,'0801199912342','Pedro','Ramirez','Las palmas',22222222,0,'08011212121211',NULL,NULL),(3,'0801199925321','Mendel','Aguilera','La kenya',22222222,0,'08011999915154','Brez','Mesis');
/*!40000 ALTER TABLE `client` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `company_data`
--

DROP TABLE IF EXISTS `company_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `company_data` (
  `COD_COMPANY` bigint NOT NULL AUTO_INCREMENT,
  `COMPANY_NAM` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `COMPANY_ADDRESS` text CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  `COMPANY_EMAIL` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `COMPANY_RTN` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `COMPANY_PHONE` int DEFAULT NULL,
  `COMPANY_LOCATION` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `COMPANY_FACEBOOK` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `COMPANY_INSTAGRAM` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL,
  `COMPANY_WHATSAPP` int DEFAULT NULL,
  `COD_USER` bigint DEFAULT NULL,
  PRIMARY KEY (`COD_COMPANY`),
  KEY `FK_USER_COMPANY_DATA` (`COD_USER`),
  CONSTRAINT `FK_USER_COMPANY_DATA` FOREIGN KEY (`COD_USER`) REFERENCES `user` (`COD_USER`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `company_data`
--

LOCK TABLES `company_data` WRITE;
/*!40000 ALTER TABLE `company_data` DISABLE KEYS */;
INSERT INTO `company_data` VALUES (1,'Cabotaje Supplier','Colonia Kennedy','cabotajesupplier@gmail.com','88786952',88795632,'Tegucigalpa, Francisco Moraz√°n','facebook.com','instagram.com',98785236,3);
/*!40000 ALTER TABLE `company_data` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fees_receivable`
--

DROP TABLE IF EXISTS `fees_receivable`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fees_receivable` (
  `COD_FEES` bigint NOT NULL AUTO_INCREMENT COMMENT 'PK DE LAS CUOTAS POR COBRAR',
  `COD_ACC_RECEIVABLE` bigint DEFAULT NULL COMMENT 'FK DE LAS CUENTA POR COBRAR',
  `AMOUNT` decimal(10,2) NOT NULL COMMENT 'MONTO DE LA TRANSACCION',
  `DAT_PAY` date NOT NULL COMMENT 'FECHA',
  `COD_TYP_PAY` bigint DEFAULT NULL COMMENT 'FK DE LA FORMA DE PAGO',
  PRIMARY KEY (`COD_FEES`),
  KEY `FK_ACCRECEIVABLE_FEES` (`COD_ACC_RECEIVABLE`),
  KEY `FK_TYPEPAY_FEES` (`COD_TYP_PAY`),
  CONSTRAINT `FK_ACCRECEIVABLE_FEES` FOREIGN KEY (`COD_ACC_RECEIVABLE`) REFERENCES `accounts_receivable` (`COD_ACC_RECEIVABLE`) ON DELETE CASCADE,
  CONSTRAINT `FK_TYPEPAY_FEES` FOREIGN KEY (`COD_TYP_PAY`) REFERENCES `type_to_pay` (`COD_TYP_PAY`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fees_receivable`
--

LOCK TABLES `fees_receivable` WRITE;
/*!40000 ALTER TABLE `fees_receivable` DISABLE KEYS */;
INSERT INTO `fees_receivable` VALUES (2,1,50.00,'2022-08-13',1),(3,2,70.00,'2022-08-13',1),(4,1,20.00,'2022-08-14',1);
/*!40000 ALTER TABLE `fees_receivable` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `fees_to_pay`
--

DROP TABLE IF EXISTS `fees_to_pay`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `fees_to_pay` (
  `COD_FEES` bigint NOT NULL AUTO_INCREMENT COMMENT 'PK DE LA TABLA CUOTAS POR PAGAR',
  `COD_ACC_PAY` bigint DEFAULT NULL COMMENT 'PK CUENTAS POR PAGAR',
  `AMOUNT` decimal(10,2) NOT NULL COMMENT 'MONTO DE LAS CUOTAS POR PAGAR',
  `DATE_PAY` date NOT NULL COMMENT 'FECHA DE PAGO',
  `COD_TYP_PAY` bigint DEFAULT NULL COMMENT 'FK DE LA TABLA TIPO DE PAGO',
  PRIMARY KEY (`COD_FEES`),
  KEY `FK_ACCTOPAY_FEESTOPAY` (`COD_ACC_PAY`),
  KEY `FK_TYPTOPAY_FEES_TO_PAY` (`COD_TYP_PAY`),
  CONSTRAINT `FK_ACCTOPAY_FEESTOPAY` FOREIGN KEY (`COD_ACC_PAY`) REFERENCES `accounts_to_pay` (`COD_ACC_PAY`) ON DELETE CASCADE,
  CONSTRAINT `FK_TYPTOPAY_FEES_TO_PAY` FOREIGN KEY (`COD_TYP_PAY`) REFERENCES `type_to_pay` (`COD_TYP_PAY`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `fees_to_pay`
--

LOCK TABLES `fees_to_pay` WRITE;
/*!40000 ALTER TABLE `fees_to_pay` DISABLE KEYS */;
/*!40000 ALTER TABLE `fees_to_pay` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inventory`
--

DROP TABLE IF EXISTS `inventory`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `inventory` (
  `COD_PRODUCT` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT 'PK DE LA TABLA INVENTARIO',
  `COD_SUPPLIER` bigint DEFAULT NULL COMMENT 'FK A LA TABLA PROVEEDOR',
  `NAM_PRODUCT` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT 'NOMBRE DE LA TABLA',
  `DES_PRODUCT` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT 'DESCRIPCION DEL PRODUCTO',
  `CANT_TOTAL` decimal(10,2) DEFAULT NULL,
  `COD_CATEGORY` bigint DEFAULT NULL COMMENT 'FK DE CATEGORIA',
  `COD_TYP_PRODUCT` bigint DEFAULT NULL COMMENT 'FK DE LA TABLA TIPO PRODUCTO',
  PRIMARY KEY (`COD_PRODUCT`),
  KEY `FK_SUPPLIER_INVENTORY` (`COD_SUPPLIER`),
  KEY `FK_TYPEPRODUC_INVENTORY` (`COD_TYP_PRODUCT`),
  KEY `FK_CATEGORY_INVENTORY` (`COD_CATEGORY`),
  CONSTRAINT `FK_CATEGORY_INVENTORY` FOREIGN KEY (`COD_CATEGORY`) REFERENCES `category` (`COD_CATEGORY`) ON DELETE CASCADE,
  CONSTRAINT `FK_SUPPLIER_INVENTORY` FOREIGN KEY (`COD_SUPPLIER`) REFERENCES `supplier` (`COD_SUPPLIER`) ON DELETE CASCADE,
  CONSTRAINT `FK_TYPEPRODUC_INVENTORY` FOREIGN KEY (`COD_TYP_PRODUCT`) REFERENCES `type_product` (`COD_TYP_PRODUCT`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inventory`
--

LOCK TABLES `inventory` WRITE;
/*!40000 ALTER TABLE `inventory` DISABLE KEYS */;
INSERT INTO `inventory` VALUES ('BOL1123',6,'Bolsa de semita','Ricas semitas',0.00,16,1),('CAF123',4,'Cafe Oro','Rico caf√©',0.00,19,1),('CHO123',6,'Chorizo suelto','Rico chorizo',0.00,20,1),('LECH123',1,'Leche sula','Nueva producto de leche',644.00,17,1),('MEN123',1,'Cafe','Saffd',6296.00,2,2),('MOR134',6,'Mortadela','Rica mortadela',0.00,20,1),('PEP123',5,'Pepsi','Rica pepsi',0.00,2,1);
/*!40000 ALTER TABLE `inventory` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inventory_detail`
--

DROP TABLE IF EXISTS `inventory_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `inventory_detail` (
  `COD_DETAIL` bigint NOT NULL AUTO_INCREMENT COMMENT 'PK',
  `COD_PRODUCT` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL COMMENT 'FK DE LA TABLA INVENTARIO',
  `NORMAL_UNIT_PRICE` decimal(10,2) NOT NULL COMMENT 'PRECIO UNITARIO DE VENTA',
  `PURCHASE_PRICE` decimal(10,2) DEFAULT NULL,
  `WHOLESALE_CANT` decimal(10,2) DEFAULT NULL COMMENT 'CANTIDAD AL POR MAYOR',
  `WHOLESALE_PRICE` decimal(10,2) DEFAULT NULL COMMENT 'PRECIO AL POR MAYOR',
  `ISV` decimal(3,2) NOT NULL COMMENT 'IMPUESTO DEL PRODUCTO',
  `DAT_PURCHASE` date NOT NULL COMMENT 'FECHA DE COMPRA',
  `DAT_EXP` date NOT NULL COMMENT 'FECHA DE CADUCIDAD',
  `CANT_PRODUCTS` decimal(10,2) DEFAULT NULL,
  `NUM_LOT` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT 'NUMERO DE LOTE',
  `COD_ORDER` bigint DEFAULT NULL COMMENT 'FK A LA TABLA DE PEDIDOS',
  `COD_STATUS` bigint DEFAULT NULL COMMENT 'FK A TABLA ESTADOS',
  PRIMARY KEY (`COD_DETAIL`),
  KEY `FK_INVENTORY_INV_DETAIL` (`COD_PRODUCT`),
  KEY `FK_ORDERS_INV_DETAIL` (`COD_ORDER`),
  KEY `FK_STATUS_INV_DETAIL` (`COD_STATUS`),
  CONSTRAINT `FK_INVENTORY_INV_DETAIL` FOREIGN KEY (`COD_PRODUCT`) REFERENCES `inventory` (`COD_PRODUCT`) ON DELETE CASCADE,
  CONSTRAINT `FK_ORDERS_INV_DETAIL` FOREIGN KEY (`COD_ORDER`) REFERENCES `orders` (`COD_ORDER`) ON DELETE CASCADE,
  CONSTRAINT `FK_STATUS_INV_DETAIL` FOREIGN KEY (`COD_STATUS`) REFERENCES `status` (`COD_STATUS`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inventory_detail`
--

LOCK TABLES `inventory_detail` WRITE;
/*!40000 ALTER TABLE `inventory_detail` DISABLE KEYS */;
INSERT INTO `inventory_detail` VALUES (6,'MEN123',15.00,10.00,10.00,13.00,0.15,'2022-07-22','2022-07-31',5277.00,'CAF123',NULL,3),(19,'MEN123',25.00,20.00,25.00,23.00,0.15,'2022-07-28','2022-08-06',20.00,'MEN123',NULL,4),(20,'MEN123',21.00,20.00,0.00,0.00,0.00,'2022-07-28','2022-07-30',999.00,'MEN124',NULL,3),(25,'LECH123',28.00,20.00,20.00,25.00,0.15,'2022-07-27','2022-08-06',0.00,'LOT1234',NULL,3),(26,'LECH123',28.30,24.71,0.00,0.00,0.00,'2022-08-01','2022-08-09',10.00,'cal123',NULL,3),(27,'LECH123',55.55,50.00,5.00,60.00,0.00,'2022-08-01','2022-08-25',25.00,'MEL123',NULL,4),(28,'LECH123',30.55,25.00,20.00,20.00,0.00,'2022-08-01','2022-08-06',609.00,'CHM123',NULL,3),(29,'LECH123',25.00,20.00,0.00,0.00,0.00,'2022-08-01','2022-08-16',0.00,'PRUEBA123',NULL,4);
/*!40000 ALTER TABLE `inventory_detail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `inventory_transactions`
--

DROP TABLE IF EXISTS `inventory_transactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `inventory_transactions` (
  `COD_TRANSACTIONS` bigint NOT NULL AUTO_INCREMENT COMMENT 'PK DE LA TABLA TRANSACCIONES DE INVENTARIO',
  `COD_PRODUCT` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL COMMENT 'FK A LA TABLA DE PRODUCTOS',
  `TYP_TRANSACTION` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT 'TIPO DE TRANSACCION (ENTRADA, SALIDA)',
  `CANT` int NOT NULL COMMENT 'CANTIDAD',
  `NUM_LOT` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT 'NUMERO DE LOTE',
  `DAT_TRANSACTION` datetime DEFAULT NULL,
  PRIMARY KEY (`COD_TRANSACTIONS`),
  KEY `FK_INVENTORY_INVTRANSACTIONS` (`COD_PRODUCT`),
  CONSTRAINT `FK_INVENTORY_INVTRANSACTIONS` FOREIGN KEY (`COD_PRODUCT`) REFERENCES `inventory` (`COD_PRODUCT`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=113 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `inventory_transactions`
--

LOCK TABLES `inventory_transactions` WRITE;
/*!40000 ALTER TABLE `inventory_transactions` DISABLE KEYS */;
INSERT INTO `inventory_transactions` VALUES (6,'MEN123','Entrada',2,'CAF123','2022-07-23 00:00:00'),(20,'MEN123','Salida - Devoluci√≥n',1000,'CAF123','2022-07-27 19:59:39'),(21,'MEN123','Salida - Compra',50,'CAF123','2022-07-27 20:00:16'),(29,'MEN123','Entrada',25,'MEN123','2022-07-28 00:00:00'),(30,'MEN123','Salida - Mermas',7,'MEN123','2022-07-28 21:41:20'),(31,'MEN123','Entrada',1000,'MEN124','2022-07-28 00:00:00'),(33,'men123','Entrada - Devoluci√≥n',1000,'MEN123','2022-07-28 22:02:38'),(34,'LECH123','Entrada',25,'LOT1234','2022-07-31 00:00:00'),(35,'MEN123','Salida - Mermas',5,'MEN123','2022-07-31 19:07:58'),(36,'LECH123','Entrada',25,'cal123','2022-08-01 00:00:00'),(37,'LECH123','Entrada',60,'MEL123','2022-08-01 00:00:00'),(38,'LECH123','Entrada',1000,'CHM123','2022-08-01 00:00:00'),(39,'MEN123','Entrada - Compra',5,'CAF123','2022-08-01 22:01:08'),(40,'LECH123','Entrada',25,'PRUEBA123','2022-08-01 00:00:00'),(41,'LECH123','Salida - Devoluci√≥n',5,'PRUEBA123','2022-08-01 22:41:41'),(42,'LECH123','Entrada - Compra',5,'PRUEBA123','2022-08-01 22:43:03'),(43,'LECH123','Salida - Venta',1,'LOT1234','2022-08-13 00:00:00'),(44,'LECH123','Salida - Venta',1,'LOT1234','2022-08-13 00:00:00'),(45,'LECH123','Salida - Venta',3,'LOT1234','2022-08-13 06:20:25'),(46,'LECH123','Salida - Venta',20,'MEL123','2022-08-13 06:20:26'),(47,'LECH123','Salida - Venta',2,'LOT1234','2022-08-13 07:16:49'),(48,'LECH123','Salida - Venta',15,'MEL123','2022-08-13 07:16:50'),(49,'MEN123','Salida - Venta',1,'MEN124','2022-08-16 19:50:33'),(50,'LECH123','Salida - Venta',15,'cal123','2022-08-16 19:52:39'),(51,'LECH123','Salida - Venta',25,'PRUEBA123','2022-08-16 19:52:40'),(52,'LECH123','Salida - Venta',1,'CHM123','2022-08-16 20:03:30'),(53,'LECH123','Salida - Venta',1,'CHM123','2022-08-16 20:03:53'),(54,'LECH123','Salida - Venta',1,'CHM123','2022-08-16 20:04:06'),(55,'LECH123','Salida - Venta',1,'CHM123','2022-08-16 20:05:23'),(56,'LECH123','Salida - Venta',1,'CHM123','2022-08-16 20:09:04'),(57,'LECH123','Salida - Venta',1,'CHM123','2022-08-16 20:11:28'),(58,'LECH123','Salida - Venta',1,'CHM123','2022-08-16 20:15:42'),(59,'LECH123','Salida - Venta',1,'CHM123','2022-08-16 20:15:50'),(60,'LECH123','Salida - Venta',1,'CHM123','2022-08-16 20:15:54'),(61,'LECH123','Salida - Venta',1,'CHM123','2022-08-16 20:19:37'),(62,'LECH123','Salida - Venta',1,'CHM123','2022-08-16 21:03:24'),(63,'LECH123','Salida - Venta',1,'CHM123','2022-08-16 21:04:20'),(64,'LECH123','Salida - Venta',1,'CHM123','2022-08-16 21:05:44'),(65,'LECH123','Salida - Venta',1,'CHM123','2022-08-16 21:05:45'),(66,'LECH123','Salida - Venta',1,'CHM123','2022-08-16 21:08:05'),(67,'LECH123','Salida - Venta',1,'CHM123','2022-08-16 21:08:08'),(68,'LECH123','Salida - Venta',1,'CHM123','2022-08-16 21:08:11'),(69,'LECH123','Salida - Venta',1,'CHM123','2022-08-16 21:08:12'),(70,'LECH123','Salida - Venta',1,'CHM123','2022-08-16 21:08:14'),(71,'LECH123','Salida - Venta',1,'CHM123','2022-08-16 21:08:14'),(72,'LECH123','Salida - Venta',1,'CHM123','2022-08-16 21:08:15'),(73,'LECH123','Salida - Venta',1,'CHM123','2022-08-16 21:08:15'),(74,'LECH123','Salida - Venta',1,'CHM123','2022-08-16 21:08:16'),(75,'LECH123','Salida - Venta',1,'CHM123','2022-08-16 21:08:16'),(76,'LECH123','Salida - Venta',1,'CHM123','2022-08-16 21:08:17'),(77,'LECH123','Salida - Venta',1,'CHM123','2022-08-16 21:09:11'),(78,'LECH123','Salida - Venta',1,'CHM123','2022-08-16 21:09:55'),(79,'LECH123','Salida - Venta',1,'CHM123','2022-08-16 21:12:20'),(80,'LECH123','Salida - Venta',1,'CHM123','2022-08-16 21:12:22'),(81,'LECH123','Salida - Venta',1,'CHM123','2022-08-16 21:12:39'),(82,'LECH123','Salida - Venta',1,'CHM123','2022-08-16 21:16:30'),(83,'LECH123','Salida - Venta',1,'CHM123','2022-08-16 21:16:34'),(84,'LECH123','Salida - Venta',1,'CHM123','2022-08-16 21:16:35'),(85,'LECH123','Salida - Venta',1,'CHM123','2022-08-16 21:16:35'),(86,'LECH123','Salida - Venta',1,'CHM123','2022-08-16 21:16:36'),(87,'LECH123','Salida - Venta',1,'CHM123','2022-08-16 21:16:36'),(88,'LECH123','Salida - Venta',1,'CHM123','2022-08-16 21:17:15'),(89,'LECH123','Salida - Venta',1,'CHM123','2022-08-16 21:17:17'),(90,'LECH123','Salida - Venta',1,'CHM123','2022-08-16 21:17:17'),(91,'LECH123','Salida - Venta',1,'CHM123','2022-08-16 21:17:17'),(92,'LECH123','Salida - Venta',1,'CHM123','2022-08-16 21:17:36'),(93,'LECH123','Salida - Venta',1,'CHM123','2022-08-16 21:17:37'),(94,'LECH123','Salida - Venta',1,'CHM123','2022-08-16 21:17:39'),(95,'LECH123','Salida - Venta',1,'CHM123','2022-08-16 21:17:40'),(96,'LECH123','Salida - Venta',1,'CHM123','2022-08-16 21:17:41'),(97,'LECH123','Salida - Venta',1,'CHM123','2022-08-16 21:17:41'),(98,'LECH123','Salida - Venta',1,'CHM123','2022-08-16 21:18:34'),(99,'LECH123','Salida - Venta',1,'CHM123','2022-08-16 21:20:13'),(100,'LECH123','Salida - Venta',1,'CHM123','2022-08-16 21:21:56'),(101,'LECH123','Salida - Venta',1,'CHM123','2022-08-16 21:22:02'),(102,'LECH123','Salida - Venta',1,'CHM123','2022-08-16 21:22:17'),(103,'LECH123','Salida - Venta',1,'CHM123','2022-08-16 21:22:18'),(104,'LECH123','Salida - Venta',1,'CHM123','2022-08-16 21:26:32'),(105,'LECH123','Salida - Venta',1,'CHM123','2022-08-16 21:28:48'),(106,'LECH123','Salida - Venta',1,'CHM123','2022-08-16 21:29:52'),(107,'LECH123','Salida - Venta',1,'CHM123','2022-08-16 21:37:26'),(108,'LECH123','Salida - Venta',100,'CHM123','2022-08-16 22:00:45'),(109,'LECH123','Salida - Venta',100,'CHM123','2022-08-16 22:00:53'),(110,'LECH123','Salida - Venta',100,'CHM123','2022-08-16 22:02:30'),(111,'LECH123','Salida - Venta',15,'CHM123','2022-08-16 22:03:50'),(112,'LECH123','Salida - Venta',20,'CHM123','2022-08-16 22:04:19');
/*!40000 ALTER TABLE `inventory_transactions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `login`
--

DROP TABLE IF EXISTS `login`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `login` (
  `COD_LOGIN` bigint NOT NULL AUTO_INCREMENT COMMENT 'PK DE LA TABLA LOGIN',
  `COD_USER` bigint DEFAULT NULL COMMENT 'FK DE LA TABLA USUARIO',
  `COD_ROLE` bigint DEFAULT NULL COMMENT 'FK DE LA TABLA ROL',
  `USER_EMAIL` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT 'CORREO ELECTRONICO DEL USUARIO',
  `USER_PASSWORD` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT 'CONTRASE√ëA DEL USUARIO',
  `DAT_CREATE` datetime NOT NULL COMMENT 'FECHA DE CREACI√ìN',
  `DAT_EXP` datetime NOT NULL COMMENT 'FECHA DE EXPIRACI√ìN',
  `NUM_ATTEMPS` int DEFAULT NULL,
  PRIMARY KEY (`COD_LOGIN`),
  KEY `FK_USER_LOGIN` (`COD_USER`),
  KEY `FK_ROLE_LOGIN` (`COD_ROLE`),
  CONSTRAINT `FK_ROLE_LOGIN` FOREIGN KEY (`COD_ROLE`) REFERENCES `role` (`COD_ROLE`) ON DELETE CASCADE,
  CONSTRAINT `FK_USER_LOGIN` FOREIGN KEY (`COD_USER`) REFERENCES `user` (`COD_USER`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `login`
--

LOCK TABLES `login` WRITE;
/*!40000 ALTER TABLE `login` DISABLE KEYS */;
INSERT INTO `login` VALUES (1,3,1,'luis@hotmail.com','$2b$10$OGwnCF4PJpokbQMTbIa.p.kVbHidr/r4PXYeVUgzt9.eMVfjiAB6y','2022-07-23 19:09:02','2022-12-09 20:38:32',0),(2,4,3,'mendel@hotmail.com','$2b$10$70vJ9T853lMWEkauBLMEae2W948p.TgYDoRi602kDckl6BzRePh6C','2022-07-24 16:11:39','2022-12-09 20:44:34',0),(3,5,3,'lisandro@hotmail.com','$2b$10$xkIau07/yIn4OskngwhddeT6gmoSzfvex.kmrAZ4TCKZMDx6pjjfK','2022-07-31 19:21:36','2022-08-30 19:30:41',0),(4,6,1,'eortezluna@gmail.com','$2b$10$OhSd09aUHUJ7l50bOhGHS.vzpSDXA2d9OXU7LV13uLMjuZQ70ZBRW','2022-07-31 19:38:53','2022-08-01 19:38:53',0),(5,7,1,'mave@hotmail.com','$2b$10$iPY7V/XobeWfrYOO4FaMxuPt4egQmyYyKQ/WKdpZ.4iu798D6gGb6','2022-08-02 21:07:47','2022-08-03 21:07:47',0),(6,8,1,'a@a.com','$2b$10$/V/HNu9wfulm.LfQygSaFec4gRpI2eWzKVsdcNpmb7uAmGmj/ba2m','2022-08-02 21:11:11','2022-08-03 21:11:11',0);
/*!40000 ALTER TABLE `login` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `modules`
--

DROP TABLE IF EXISTS `modules`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `modules` (
  `COD_MODULE` bigint NOT NULL AUTO_INCREMENT,
  `NAM_MODULE` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `DESCRIPTION` text CHARACTER SET utf8 COLLATE utf8_unicode_ci,
  PRIMARY KEY (`COD_MODULE`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `modules`
--

LOCK TABLES `modules` WRITE;
/*!40000 ALTER TABLE `modules` DISABLE KEYS */;
INSERT INTO `modules` VALUES (1,'Dashboard',NULL),(2,'Facturar',NULL),(3,'Ventas',NULL),(4,'Compras',NULL),(5,'Personas',NULL),(6,'Producci√≥n',NULL),(7,'Contabilidad',NULL),(8,'Seguridad',NULL),(9,'Gr√°ficas',NULL);
/*!40000 ALTER TABLE `modules` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ms_bitacora`
--

DROP TABLE IF EXISTS `ms_bitacora`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ms_bitacora` (
  `COD` bigint NOT NULL AUTO_INCREMENT,
  `COD_USER` bigint NOT NULL,
  `ACTION` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `OBJECT` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `FIELD` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `RECORD` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `BEFORE_THE_CHANGE` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `AFTER_THE_CHANGE` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `DATE` datetime NOT NULL,
  PRIMARY KEY (`COD`),
  KEY `FK_USER_BITACORA` (`COD_USER`),
  CONSTRAINT `FK_USER_BITACORA` FOREIGN KEY (`COD_USER`) REFERENCES `user` (`COD_USER`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ms_bitacora`
--

LOCK TABLES `ms_bitacora` WRITE;
/*!40000 ALTER TABLE `ms_bitacora` DISABLE KEYS */;
INSERT INTO `ms_bitacora` VALUES (2,3,'Agregar','Usuarios','','Mendel Aguilar','','','2022-07-24 16:11:40'),(3,4,'Editar','Usuarios','Contrase√±a','Luis Garcia','','','2022-07-24 16:13:36'),(4,3,'Agregar','Usuarios','','Lisandro Lopez','','','2022-07-31 19:21:37'),(5,3,'Editar','Usuarios','Estado','Lisandro Lopez','Activo','Inactivo','2022-07-31 19:31:42'),(6,3,'Editar','Usuarios','Apellido','Lisandro Maradiaga','Lopez','Maradiaga','2022-07-31 19:34:04'),(7,3,'Editar','Usuarios','Tel√©fono 1','Lisandro Maradiaga','22222222','33333333','2022-07-31 19:34:04'),(8,3,'Editar','Usuarios','Estado','Lisandro Maradiaga','Inactivo','Activo','2022-07-31 19:34:04'),(9,3,'Agregar','Usuarios','','Enrique Ortez','','','2022-07-31 19:38:53'),(10,3,'Agregar','Usuarios','','Maverick Fonseca','','','2022-08-02 21:07:47'),(11,3,'Agregar','Usuarios','','Alberto Perez','','','2022-08-02 21:11:12'),(12,3,'Agregar','Usuarios','','Carlos Flores','','','2022-08-02 21:15:29'),(13,3,'Eliminar','Usuarios','','Carlos Flores','','','2022-08-02 21:15:56'),(14,3,'Editar','Usuarios','Contrase√±a','Mendel Aguilar','','','2022-08-02 22:20:05'),(15,3,'Editar','Usuarios','Contrase√±a','Mendel Aguilar','','','2022-08-08 21:09:23'),(16,3,'Editar','Usuarios','Contrase√±a','Mendel Aguilar','','','2022-08-08 21:09:26'),(17,4,'Editar','Usuarios','Contrase√±a','Luis Garcia','','','2022-08-11 20:35:39'),(18,3,'Editar','Usuarios','Contrase√±a','Mendel Aguilar','','','2022-08-11 20:43:58'),(19,3,'Editar','Usuarios','Rol','Mendel Aguilar','Administrador','Cajero','2022-08-12 23:53:58'),(20,3,'Editar','Usuarios','Apellido','Luis Garcia','Mendez','Aguilera','2022-08-15 23:27:22'),(21,3,'Agregar','Usuarios','','Juan Bandido','','','2022-08-15 23:30:13'),(22,3,'Editar','Usuarios','Apellido','Juan Bandido','Figueroa','Mendez','2022-08-15 23:30:29'),(23,3,'Editar','Usuarios','Apellido','Luis Garcia','Aguilera','Aguilera','2022-08-15 23:31:03'),(24,3,'Editar','Usuarios','Tel√©fono 2','Luis Garcia','0','33333333','2022-08-15 23:31:03'),(25,3,'Editar','Usuarios','Segundo apellido','Alberto Perez','Messi','Bisho','2022-08-15 23:41:23'),(26,3,'Eliminar','Usuarios','','Juan Bandido','','','2022-08-16 22:14:18');
/*!40000 ALTER TABLE `ms_bitacora` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `notifications`
--

DROP TABLE IF EXISTS `notifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `notifications` (
  `COD_NOTIFICATION` bigint NOT NULL AUTO_INCREMENT COMMENT 'PK',
  `COD_ROLE` bigint DEFAULT NULL COMMENT 'FK DE LA TABLA ROL',
  `MESSAGE` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT 'MENSAJE DE LA NOTIFICACION',
  `TYP_NOTIFICATION` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT 'TIPO DE NOTIFICACION (VENTAS, INVENTARIO, PEDIDOS)',
  `DAT_NOTIFICATION` date NOT NULL COMMENT 'FECHA DE LA NOTIFICACION',
  PRIMARY KEY (`COD_NOTIFICATION`),
  KEY `FK_ROLE_NOTIFICATIONS` (`COD_ROLE`),
  CONSTRAINT `FK_ROLE_NOTIFICATIONS` FOREIGN KEY (`COD_ROLE`) REFERENCES `role` (`COD_ROLE`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `notifications`
--

LOCK TABLES `notifications` WRITE;
/*!40000 ALTER TABLE `notifications` DISABLE KEYS */;
/*!40000 ALTER TABLE `notifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_detail`
--

DROP TABLE IF EXISTS `order_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_detail` (
  `COD_DETAIL_ORDER` bigint NOT NULL AUTO_INCREMENT COMMENT 'PK',
  `COD_ORDER` bigint DEFAULT NULL COMMENT 'FK A LA ORDEN DEL PEDIDO',
  `COD_PRODUCT` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL COMMENT 'FK DE LA TABLA INVENTARIO',
  `DES_ORDER` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT 'DESCRIPCION DEL PEDIDO',
  `CANT_PRODUCTS` int NOT NULL COMMENT 'CANTIDAD DE PRODUCTOS',
  PRIMARY KEY (`COD_DETAIL_ORDER`),
  KEY `FK_INVENTORY_ORDER_DETAIL` (`COD_PRODUCT`),
  KEY `FK_ORDERS_ORDER_DETAILL` (`COD_ORDER`),
  CONSTRAINT `FK_INVENTORY_ORDER_DETAIL` FOREIGN KEY (`COD_PRODUCT`) REFERENCES `inventory` (`COD_PRODUCT`) ON DELETE CASCADE,
  CONSTRAINT `FK_ORDERS_ORDER_DETAILL` FOREIGN KEY (`COD_ORDER`) REFERENCES `orders` (`COD_ORDER`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_detail`
--

LOCK TABLES `order_detail` WRITE;
/*!40000 ALTER TABLE `order_detail` DISABLE KEYS */;
/*!40000 ALTER TABLE `order_detail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `COD_ORDER` bigint NOT NULL AUTO_INCREMENT COMMENT 'COD DE LA TABLA DEL PEDIDO',
  `COD_SUPPLIER` bigint DEFAULT NULL COMMENT 'FK DE LA TABLA DEL PROVEEDOR',
  `DAT_ORDER` date NOT NULL COMMENT 'FECHA DEL PEDIDO',
  `DAT_REQUIRED` date NOT NULL COMMENT 'FECHA REQUERIDA DEL PEDIDO',
  `COD_USER` bigint DEFAULT NULL COMMENT 'FK DE LA TABLA USUARIOS',
  `COD_STATUS` bigint DEFAULT NULL COMMENT 'FK DE LA TABLA ESTADO',
  PRIMARY KEY (`COD_ORDER`),
  KEY `FK_SUPPLIER_ORDERS` (`COD_SUPPLIER`),
  KEY `FK_USER_ORDERS` (`COD_USER`),
  KEY `FK_STATUS_ORDERS` (`COD_STATUS`),
  CONSTRAINT `FK_STATUS_ORDERS` FOREIGN KEY (`COD_STATUS`) REFERENCES `status` (`COD_STATUS`) ON DELETE CASCADE,
  CONSTRAINT `FK_SUPPLIER_ORDERS` FOREIGN KEY (`COD_SUPPLIER`) REFERENCES `supplier` (`COD_SUPPLIER`) ON DELETE CASCADE,
  CONSTRAINT `FK_USER_ORDERS` FOREIGN KEY (`COD_USER`) REFERENCES `user` (`COD_USER`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pay_form`
--

DROP TABLE IF EXISTS `pay_form`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pay_form` (
  `COD_PAY_FORM` bigint NOT NULL AUTO_INCREMENT COMMENT 'PK DE LA PLANILLA DE PAGO',
  `COD_USER` bigint DEFAULT NULL COMMENT 'FK DE LA TABLA USUARIO',
  `HOURS_WORKED` int NOT NULL COMMENT 'HORAS TRABAJADAS DEL USUARIO',
  `AMO_GROSS` decimal(10,2) NOT NULL COMMENT 'SUELDO BRUTO',
  `BONUS` decimal(10,2) NOT NULL COMMENT 'BONIFICAIONES',
  `TOT_DEDUCTIONS` decimal(10,2) NOT NULL COMMENT 'DEDUCCIONES',
  `NET_SALARY` decimal(10,2) NOT NULL COMMENT 'SALARIO NETO',
  `DAT_PAYMENT` date NOT NULL COMMENT 'FECHA DE PAGO',
  PRIMARY KEY (`COD_PAY_FORM`),
  KEY `FK_USER_PAYFORM` (`COD_USER`),
  CONSTRAINT `FK_USER_PAYFORM` FOREIGN KEY (`COD_USER`) REFERENCES `user` (`COD_USER`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pay_form`
--

LOCK TABLES `pay_form` WRITE;
/*!40000 ALTER TABLE `pay_form` DISABLE KEYS */;
/*!40000 ALTER TABLE `pay_form` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permissions`
--

DROP TABLE IF EXISTS `permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `permissions` (
  `COD_PERMISSION` bigint NOT NULL AUTO_INCREMENT COMMENT 'PK',
  `COD_ROLE` bigint DEFAULT NULL COMMENT 'FK DE LA TABLA ROL',
  `COD_MODULE` bigint DEFAULT NULL COMMENT 'MODULO',
  `COD_TABLE` bigint NOT NULL COMMENT 'TABLA A LA QUE SE LE OTORGA PERMISOS',
  `INS` tinyint(1) NOT NULL COMMENT 'INSERTAR 1:TRUE, 0:FALSE',
  `DEL` tinyint(1) NOT NULL COMMENT 'ELIMINAR',
  `UPD` tinyint(1) NOT NULL COMMENT 'ACTUALIZAR',
  `QUE` tinyint(1) NOT NULL COMMENT 'CONSULTAR',
  PRIMARY KEY (`COD_PERMISSION`),
  KEY `FK_ROLE_PERMISSIONS` (`COD_ROLE`),
  KEY `FK_MODULES_PERMISSIONS` (`COD_MODULE`),
  KEY `FK_PERMISSIONS_TABLES` (`COD_TABLE`),
  CONSTRAINT `FK_MODULES_PERMISSIONS` FOREIGN KEY (`COD_MODULE`) REFERENCES `modules` (`COD_MODULE`) ON DELETE CASCADE,
  CONSTRAINT `FK_PERMISSIONS_TABLES` FOREIGN KEY (`COD_TABLE`) REFERENCES `tables` (`COD_TABLE`) ON DELETE CASCADE,
  CONSTRAINT `FK_ROLE_PERMISSIONS` FOREIGN KEY (`COD_ROLE`) REFERENCES `role` (`COD_ROLE`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=42 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permissions`
--

LOCK TABLES `permissions` WRITE;
/*!40000 ALTER TABLE `permissions` DISABLE KEYS */;
INSERT INTO `permissions` VALUES (1,1,1,1,1,1,1,1),(2,1,2,2,1,1,1,1),(3,1,3,3,1,1,1,1),(4,1,4,4,1,1,1,1),(5,1,4,5,1,1,1,1),(6,1,5,6,1,1,1,1),(7,1,5,7,1,1,1,1),(8,1,6,8,1,1,1,1),(9,1,6,9,1,1,1,1),(10,1,6,10,1,1,1,1),(11,1,6,11,1,1,1,1),(12,1,6,12,1,1,1,1),(13,1,7,13,1,1,1,1),(14,1,7,14,1,1,1,1),(15,1,7,15,1,1,1,1),(16,1,7,16,1,1,1,1),(17,1,7,17,1,1,1,1),(18,1,8,18,1,1,1,1),(19,1,8,19,1,1,1,1),(20,1,8,20,1,1,1,1),(21,1,9,21,1,1,1,1),(22,3,5,6,1,0,1,0),(23,3,6,8,1,0,0,1),(24,3,3,3,0,0,0,1),(25,3,2,2,1,0,1,0);
/*!40000 ALTER TABLE `permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_entries`
--

DROP TABLE IF EXISTS `product_entries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_entries` (
  `COD_ENTRIES` bigint NOT NULL AUTO_INCREMENT COMMENT 'PK',
  `COD_PRODUCT` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL COMMENT 'FK DE LA TABLA INVENTARIO',
  `DES_ENTRIE` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT 'DESCRIPCION DE LA ENTRADA',
  `COD_TYPE` bigint DEFAULT NULL COMMENT 'CONCEPTO TIPO DE ENTRADA',
  `CANT_PRODUCT` int NOT NULL COMMENT 'CANTIDAD DE PRODUCTOS',
  `NUM_LOT` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT 'NUMERO DE LOTE',
  `COD_USER` bigint DEFAULT NULL COMMENT 'FK A LA TABLA USUARIO',
  `DAT_ENTRIES` date NOT NULL COMMENT 'FECHA DEL MOVIMIENTO',
  PRIMARY KEY (`COD_ENTRIES`),
  KEY `FK_INVENTORY_PRODUCT_ENTRIES` (`COD_PRODUCT`),
  KEY `FK_USER_PRODUCT_ENTRIES` (`COD_USER`),
  KEY `FK_TYP_PRODUCT_ENTRIES` (`COD_TYPE`),
  CONSTRAINT `FK_INVENTORY_PRODUCT_ENTRIES` FOREIGN KEY (`COD_PRODUCT`) REFERENCES `inventory` (`COD_PRODUCT`) ON DELETE CASCADE,
  CONSTRAINT `FK_TYP_PRODUCT_ENTRIES` FOREIGN KEY (`COD_TYPE`) REFERENCES `typ_product_entries` (`COD_TYPE`) ON DELETE CASCADE,
  CONSTRAINT `FK_USER_PRODUCT_ENTRIES` FOREIGN KEY (`COD_USER`) REFERENCES `user` (`COD_USER`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_entries`
--

LOCK TABLES `product_entries` WRITE;
/*!40000 ALTER TABLE `product_entries` DISABLE KEYS */;
INSERT INTO `product_entries` VALUES (4,'MEN123','Nueva prueba',2,1000,'CAF123',3,'2022-07-26'),(5,'MEN123','Nueva prueba',2,1000,'CAF123',3,'2022-07-26'),(6,'MEN123','Nueva prueba',2,1000,'CAF123',3,'2022-07-26'),(7,'MEN123','Nueva prueba',2,50,'CAF123',3,'2022-07-26'),(8,'MEN123','Nueva prueba',2,50,'CAF123',3,'2022-07-26'),(9,'MEN123','Nueva prueba',2,25,'CAF123',3,'2022-07-26'),(13,'MEN123','saadsad',1,50,'CAF123',3,'2022-07-26'),(20,'LECH123','Prueba',1,5,'PRUEBA123',3,'2022-07-31');
/*!40000 ALTER TABLE `product_entries` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_output`
--

DROP TABLE IF EXISTS `product_output`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_output` (
  `COD_OUTPUT` bigint NOT NULL AUTO_INCREMENT COMMENT 'PK',
  `COD_PRODUCT` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL COMMENT 'FK DE LA TABLA INVENTARIO',
  `DES_OUTPUT` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT 'DESCRIPCI√ìN',
  `COD_TYPE` bigint DEFAULT NULL COMMENT 'TIPO DE SALIDA',
  `CANT_PRODUCT` int NOT NULL COMMENT 'CANTIDAD DE PRODUCTOS',
  `NUM_LOT` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT 'NUMERO DE LOTE',
  `COD_USER` bigint DEFAULT NULL COMMENT 'FK DE LA TABLA USUARIO',
  `DAT_OUTPUT` date NOT NULL COMMENT 'FECHA DE LA SALIDA',
  PRIMARY KEY (`COD_OUTPUT`),
  KEY `FK_INVENTORY_PRODUCT_OUTPUT` (`COD_PRODUCT`),
  KEY `FK_USER_PRODUCT_OUTPUT` (`COD_USER`),
  KEY `FK_TYP_PRODUCT_OUTPUT` (`COD_TYPE`),
  CONSTRAINT `FK_INVENTORY_PRODUCT_OUTPUT` FOREIGN KEY (`COD_PRODUCT`) REFERENCES `inventory` (`COD_PRODUCT`) ON DELETE CASCADE,
  CONSTRAINT `FK_TYP_PRODUCT_OUTPUT` FOREIGN KEY (`COD_TYPE`) REFERENCES `typ_product_output` (`COD_TYPE`) ON DELETE CASCADE,
  CONSTRAINT `FK_USER_PRODUCT_OUTPUT` FOREIGN KEY (`COD_USER`) REFERENCES `user` (`COD_USER`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_output`
--

LOCK TABLES `product_output` WRITE;
/*!40000 ALTER TABLE `product_output` DISABLE KEYS */;
INSERT INTO `product_output` VALUES (5,'MEN123','Productos expirados',3,5,'MEN123',3,'2022-07-31'),(6,'LECH123','Prueba',2,5,'PRUEBA123',3,'2022-08-01');
/*!40000 ALTER TABLE `product_output` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `purchase_detail`
--

DROP TABLE IF EXISTS `purchase_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `purchase_detail` (
  `COD_DETAIL` bigint NOT NULL AUTO_INCREMENT COMMENT 'PK',
  `COD_INVOICE` bigint DEFAULT NULL COMMENT 'FK DE LA TABLA FACTURA COMPRA',
  `COD_PRODUCT` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL COMMENT 'FK DE LA TABLA INVENTARIO',
  `PRICE` decimal(10,2) NOT NULL COMMENT 'PRECIO DEL PRODUCTO',
  `CANT_PRODUCTS` int NOT NULL COMMENT 'CANTIDAD DE PRODUCTOS',
  `DISCOUNT` decimal(5,2) NOT NULL COMMENT 'DESCUENTO DEL PRODUCTO',
  `TOTAL` decimal(10,2) NOT NULL COMMENT 'PRECIO TOTAL DE PRODUCTO',
  PRIMARY KEY (`COD_DETAIL`),
  KEY `FK_INVENTORY_PURCH_DETAIL` (`COD_PRODUCT`),
  KEY `FK_SALESINVOICE_PURCH_DETAIL` (`COD_INVOICE`),
  CONSTRAINT `FK_INVENTORY_PURCH_DETAIL` FOREIGN KEY (`COD_PRODUCT`) REFERENCES `inventory` (`COD_PRODUCT`) ON DELETE CASCADE,
  CONSTRAINT `FK_SALESINVOICE_PURCH_DETAIL` FOREIGN KEY (`COD_INVOICE`) REFERENCES `purchase_invoice` (`COD_INVOICE`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `purchase_detail`
--

LOCK TABLES `purchase_detail` WRITE;
/*!40000 ALTER TABLE `purchase_detail` DISABLE KEYS */;
/*!40000 ALTER TABLE `purchase_detail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `purchase_invoice`
--

DROP TABLE IF EXISTS `purchase_invoice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `purchase_invoice` (
  `COD_INVOICE` bigint NOT NULL AUTO_INCREMENT COMMENT 'PK DE LA TABLA FACTURA COMPRA ',
  `SUBTOTAL` decimal(10,2) NOT NULL COMMENT 'SUBTOTAL DE LA FACTURA',
  `TOT_DISCOUNT` decimal(10,2) NOT NULL COMMENT 'TOTAL DESCUENTO DE LA TABLA FACTURA COMPRA',
  `TOT_ISV` decimal(10,2) NOT NULL COMMENT 'ISV TOTAL DE LA COMPRA',
  `TOT_PURCHASE` decimal(10,2) NOT NULL COMMENT 'TOTAL DE LA COMPRA',
  `TYP_TO_PURCHASE` enum('Cr√©dito','Contado') CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL COMMENT 'TIPO DE COMPRA',
  `COD_TYP_PAY` bigint DEFAULT NULL COMMENT 'FK DE LA TABLA TIPO DE PAGO',
  `DAT_INVOICE` date NOT NULL COMMENT 'FECHA FACTURA',
  `COD_ORDER` bigint DEFAULT NULL COMMENT 'FK DEL PEDIDO',
  `COD_USER` bigint DEFAULT NULL COMMENT 'FK DE LA TABLA USUARIO',
  PRIMARY KEY (`COD_INVOICE`),
  KEY `FK_TYPEPAY_PURCHASE` (`COD_TYP_PAY`),
  KEY `FK_ORDER_PURCHASE` (`COD_ORDER`),
  KEY `FK_USER_PURCHASE` (`COD_USER`),
  CONSTRAINT `FK_ORDER_PURCHASE` FOREIGN KEY (`COD_ORDER`) REFERENCES `orders` (`COD_ORDER`) ON DELETE CASCADE,
  CONSTRAINT `FK_TYPEPAY_PURCHASE` FOREIGN KEY (`COD_TYP_PAY`) REFERENCES `type_to_pay` (`COD_TYP_PAY`) ON DELETE CASCADE,
  CONSTRAINT `FK_USER_PURCHASE` FOREIGN KEY (`COD_USER`) REFERENCES `user` (`COD_USER`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `purchase_invoice`
--

LOCK TABLES `purchase_invoice` WRITE;
/*!40000 ALTER TABLE `purchase_invoice` DISABLE KEYS */;
/*!40000 ALTER TABLE `purchase_invoice` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role`
--

DROP TABLE IF EXISTS `role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `role` (
  `COD_ROLE` bigint NOT NULL AUTO_INCREMENT COMMENT 'PRIMARY KEY DE LA TABLA ROL',
  `NAM_ROLE` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT 'NOMBRE DEL ROL',
  `DES_ROLE` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT 'DESCRIPCION DEL ROL',
  PRIMARY KEY (`COD_ROLE`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role`
--

LOCK TABLES `role` WRITE;
/*!40000 ALTER TABLE `role` DISABLE KEYS */;
INSERT INTO `role` VALUES (1,'Administrador','Permisos totales.'),(2,'Usuario','Solo lectura.'),(3,'Cajero','Realizara la ventas en caja');
/*!40000 ALTER TABLE `role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sale_detail`
--

DROP TABLE IF EXISTS `sale_detail`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sale_detail` (
  `COD_DETAIL` bigint NOT NULL AUTO_INCREMENT COMMENT 'PK DE LA TABLA DETALLE DE VENTA',
  `COD_INVOICE` bigint DEFAULT NULL COMMENT 'FK A LA TABLA FACTURA VENTA',
  `COD_PRODUCT` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL COMMENT 'FK DE LA TABLA INVENTARIO',
  `PRICE` decimal(10,2) NOT NULL COMMENT 'PRECIO DEL PRODUCTO',
  `CANT_PRODUCTS` decimal(5,2) NOT NULL COMMENT 'CANTIDAD DE PRODUCTOS',
  `DISCOUNT` decimal(10,2) NOT NULL COMMENT 'DESCUENTO DEL PRODUCTO',
  `TOTAL` decimal(10,2) NOT NULL COMMENT 'PRECIO TOTAL DE PRODUCTO',
  PRIMARY KEY (`COD_DETAIL`),
  KEY `FK_INVENTORY_SALEDETAIL` (`COD_PRODUCT`),
  KEY `FK_SALESINVOICE_SALEDETAIL` (`COD_INVOICE`),
  CONSTRAINT `FK_INVENTORY_SALEDETAIL` FOREIGN KEY (`COD_PRODUCT`) REFERENCES `inventory` (`COD_PRODUCT`) ON DELETE CASCADE,
  CONSTRAINT `FK_SALESINVOICE_SALEDETAIL` FOREIGN KEY (`COD_INVOICE`) REFERENCES `sales_invoice` (`COD_INVOICE`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=72 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sale_detail`
--

LOCK TABLES `sale_detail` WRITE;
/*!40000 ALTER TABLE `sale_detail` DISABLE KEYS */;
INSERT INTO `sale_detail` VALUES (1,3,NULL,23.80,10.00,0.00,280.00),(2,6,'LECH123',21.25,10.00,0.00,250.00),(3,7,'LECH123',21.25,10.00,0.00,250.00),(4,8,'LECH123',21.25,3.00,0.00,75.00),(5,8,'LECH123',60.00,20.00,0.00,1200.00),(6,14,'LECH123',23.80,2.00,0.00,56.00),(7,14,'LECH123',55.55,15.00,0.00,833.25),(8,15,'MEN123',21.00,1.00,0.00,21.00),(9,16,'LECH123',30.55,15.00,0.00,458.25),(10,16,'LECH123',25.00,25.00,0.00,625.00),(11,17,'LECH123',30.55,1.00,0.00,30.55),(12,18,'LECH123',30.55,1.00,0.00,30.55),(13,19,'LECH123',30.55,1.00,0.00,30.55),(14,20,'LECH123',30.55,1.00,0.00,30.55),(15,21,'LECH123',30.55,1.00,0.00,30.55),(16,22,'LECH123',30.55,1.00,0.00,30.55),(17,23,'LECH123',30.55,1.00,0.00,30.55),(18,24,'LECH123',30.55,1.00,0.00,30.55),(19,25,'LECH123',30.55,1.00,0.00,30.55),(20,26,'LECH123',30.55,1.00,0.00,30.55),(21,32,'LECH123',30.55,1.00,0.00,30.55),(22,33,'LECH123',30.55,1.00,0.00,30.55),(23,34,'LECH123',30.55,1.00,0.00,30.55),(24,35,'LECH123',30.55,1.00,0.00,30.55),(25,36,'LECH123',30.55,1.00,0.00,30.55),(26,37,'LECH123',30.55,1.00,0.00,30.55),(27,39,'LECH123',30.55,1.00,0.00,30.55),(28,40,'LECH123',30.55,1.00,0.00,30.55),(29,46,'LECH123',30.55,1.00,0.00,30.55),(30,46,'LECH123',30.55,1.00,0.00,30.55),(31,46,'LECH123',30.55,1.00,0.00,30.55),(32,46,'LECH123',30.55,1.00,0.00,30.55),(33,46,'LECH123',30.55,1.00,0.00,30.55),(34,46,'LECH123',30.55,1.00,0.00,30.55),(35,46,'LECH123',30.55,1.00,0.00,30.55),(36,47,'LECH123',30.55,1.00,0.00,30.55),(37,48,'LECH123',30.55,1.00,0.00,30.55),(38,49,'LECH123',30.55,1.00,0.00,30.55),(39,50,'LECH123',30.55,1.00,0.00,30.55),(40,51,'LECH123',30.55,1.00,0.00,30.55),(41,52,'LECH123',30.55,1.00,0.00,30.55),(42,56,'LECH123',30.55,1.00,0.00,30.55),(43,56,'LECH123',30.55,1.00,0.00,30.55),(44,56,'LECH123',30.55,1.00,0.00,30.55),(45,56,'LECH123',30.55,1.00,0.00,30.55),(46,57,'LECH123',30.55,1.00,0.00,30.55),(47,58,'LECH123',30.55,1.00,0.00,30.55),(48,61,'LECH123',30.55,1.00,0.00,30.55),(49,61,'LECH123',30.55,1.00,0.00,30.55),(50,61,'LECH123',30.55,1.00,0.00,30.55),(51,63,'LECH123',30.55,1.00,0.00,30.55),(52,63,'LECH123',30.55,1.00,0.00,30.55),(53,64,'LECH123',30.55,1.00,0.00,30.55),(54,67,'LECH123',30.55,1.00,0.00,30.55),(55,67,'LECH123',30.55,1.00,0.00,30.55),(56,67,'LECH123',30.55,1.00,0.00,30.55),(57,68,'LECH123',30.55,1.00,0.00,30.55),(58,69,'LECH123',30.55,1.00,0.00,30.55),(59,70,'LECH123',30.55,1.00,0.00,30.55),(60,71,'LECH123',30.55,1.00,0.00,30.55),(61,73,'LECH123',30.55,1.00,0.00,30.55),(62,73,'LECH123',30.55,1.00,0.00,30.55),(63,74,'LECH123',30.55,1.00,0.00,30.55),(64,75,'LECH123',30.55,1.00,0.00,30.55),(65,76,'LECH123',30.55,1.00,0.00,30.55),(66,77,'LECH123',30.55,1.00,0.00,30.55),(67,78,'LECH123',30.55,100.00,0.00,3055.00),(68,79,'LECH123',30.55,100.00,0.00,3055.00),(69,80,'LECH123',30.55,100.00,0.00,3055.00),(70,81,'LECH123',30.55,15.00,0.00,458.25),(71,82,'LECH123',30.55,20.00,0.00,611.00);
/*!40000 ALTER TABLE `sale_detail` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sales_discounts`
--

DROP TABLE IF EXISTS `sales_discounts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sales_discounts` (
  `COD_DISCOUNT` bigint NOT NULL AUTO_INCREMENT COMMENT 'PK',
  `COD_INVOICE` bigint DEFAULT NULL COMMENT 'FK DE LA TABLA DE INVENTARIO',
  `DESCRIPTION` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT 'DESCRIPCION DE LA REBAJA',
  `AMOUNT` decimal(10,2) NOT NULL COMMENT 'EL MONTO DE DESCUENTO APLICADO',
  PRIMARY KEY (`COD_DISCOUNT`),
  KEY `FK_SALES_INVOICE_DISCOUNTS` (`COD_INVOICE`),
  CONSTRAINT `FK_SALES_INVOICE_DISCOUNTS` FOREIGN KEY (`COD_INVOICE`) REFERENCES `sales_invoice` (`COD_INVOICE`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=83 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sales_discounts`
--

LOCK TABLES `sales_discounts` WRITE;
/*!40000 ALTER TABLE `sales_discounts` DISABLE KEYS */;
INSERT INTO `sales_discounts` VALUES (1,1,'Descuento sobre ventas',0.00),(2,2,'Descuento sobre ventas',0.00),(3,3,'Descuento sobre ventas',0.00),(4,4,'Descuento sobre ventas',0.00),(5,5,'Descuento sobre ventas',0.00),(6,6,'Descuento sobre ventas',0.00),(7,7,'Descuento sobre ventas',0.00),(8,8,'Descuento sobre ventas',0.00),(9,9,'Descuento sobre ventas',0.00),(10,10,'Descuento sobre ventas',0.00),(11,11,'Descuento sobre ventas',0.00),(12,12,'Descuento sobre ventas',0.00),(13,13,'Descuento sobre ventas',0.00),(14,14,'Descuento sobre ventas',0.00),(15,15,'Descuento sobre ventas',0.00),(16,16,'Descuento sobre ventas',0.00),(17,17,'Descuento sobre ventas',0.00),(18,18,'Descuento sobre ventas',0.00),(19,19,'Descuento sobre ventas',0.00),(20,20,'Descuento sobre ventas',0.00),(21,21,'Descuento sobre ventas',0.00),(22,22,'Descuento sobre ventas',0.00),(23,23,'Descuento sobre ventas',0.00),(24,24,'Descuento sobre ventas',0.00),(25,25,'Descuento sobre ventas',0.00),(26,26,'Descuento sobre ventas',0.00),(27,27,'Descuento sobre ventas',0.00),(28,28,'Descuento sobre ventas',0.00),(29,29,'Descuento sobre ventas',0.00),(30,30,'Descuento sobre ventas',0.00),(31,31,'Descuento sobre ventas',0.00),(32,32,'Descuento sobre ventas',0.00),(33,33,'Descuento sobre ventas',0.00),(34,34,'Descuento sobre ventas',0.00),(35,35,'Descuento sobre ventas',0.00),(36,36,'Descuento sobre ventas',0.00),(37,37,'Descuento sobre ventas',0.00),(38,38,'Descuento sobre ventas',0.00),(39,39,'Descuento sobre ventas',0.00),(40,40,'Descuento sobre ventas',0.00),(41,41,'Descuento sobre ventas',0.00),(42,42,'Descuento sobre ventas',0.00),(43,43,'Descuento sobre ventas',0.00),(44,44,'Descuento sobre ventas',0.00),(45,45,'Descuento sobre ventas',0.00),(46,46,'Descuento sobre ventas',0.00),(47,47,'Descuento sobre ventas',0.00),(48,48,'Descuento sobre ventas',0.00),(49,49,'Descuento sobre ventas',0.00),(50,50,'Descuento sobre ventas',0.00),(51,51,'Descuento sobre ventas',0.00),(52,52,'Descuento sobre ventas',0.00),(53,53,'Descuento sobre ventas',0.00),(54,54,'Descuento sobre ventas',0.00),(55,55,'Descuento sobre ventas',0.00),(56,56,'Descuento sobre ventas',0.00),(57,57,'Descuento sobre ventas',0.00),(58,58,'Descuento sobre ventas',0.00),(59,59,'Descuento sobre ventas',0.00),(60,60,'Descuento sobre ventas',0.00),(61,61,'Descuento sobre ventas',0.00),(62,62,'Descuento sobre ventas',0.00),(63,63,'Descuento sobre ventas',0.00),(64,64,'Descuento sobre ventas',0.00),(65,65,'Descuento sobre ventas',0.00),(66,66,'Descuento sobre ventas',0.00),(67,67,'Descuento sobre ventas',0.00),(68,68,'Descuento sobre ventas',0.00),(69,69,'Descuento sobre ventas',0.00),(70,70,'Descuento sobre ventas',0.00),(71,71,'Descuento sobre ventas',0.00),(72,72,'Descuento sobre ventas',0.00),(73,73,'Descuento sobre ventas',0.00),(74,74,'Descuento sobre ventas',0.00),(75,75,'Descuento sobre ventas',0.00),(76,76,'Descuento sobre ventas',0.00),(77,77,'Descuento sobre ventas',0.00),(78,78,'Descuento sobre ventas',0.00),(79,79,'Descuento sobre ventas',0.00),(80,80,'Descuento sobre ventas',0.00),(81,81,'Descuento sobre ventas',0.00),(82,82,'Descuento sobre ventas',0.00);
/*!40000 ALTER TABLE `sales_discounts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sales_invoice`
--

DROP TABLE IF EXISTS `sales_invoice`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sales_invoice` (
  `COD_INVOICE` bigint NOT NULL AUTO_INCREMENT COMMENT 'PK DE LA TABLA FACTURA',
  `COD_CLIENT` bigint DEFAULT NULL COMMENT 'FK DE LA TABLA CLIENTE',
  `COD_USER` bigint DEFAULT NULL COMMENT 'FK DE LA TABLA USUARIO',
  `SUBTOTAL` decimal(10,2) NOT NULL COMMENT 'SUBTOTAL DE LA FACTURA',
  `TOT_DISCOUNT` decimal(10,2) NOT NULL COMMENT 'DESCUENTO TOTAL',
  `TOT_ISV` decimal(10,2) NOT NULL COMMENT 'ISV DE VENTA',
  `TOT_SALE` decimal(10,2) NOT NULL COMMENT 'TOTAL DE LA VENTA',
  `TYP_TO_SALE` enum('Cr√©dito','Contado') CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT 'TIPO DE VENTA',
  `COD_TYP_PAY` bigint DEFAULT NULL COMMENT 'FK DE LA TABLA TIPO DE PAGO',
  `DAT_INVOICE` date NOT NULL COMMENT 'FECHA FACTURA',
  PRIMARY KEY (`COD_INVOICE`),
  KEY `FK_CLIENTE_SALES_INVOICE` (`COD_CLIENT`),
  KEY `FK_USER_SALES_INVOICE` (`COD_USER`),
  KEY `FK_TYPE_PAY_SALES_INVOICE` (`COD_TYP_PAY`),
  CONSTRAINT `FK_CLIENTE_SALES_INVOICE` FOREIGN KEY (`COD_CLIENT`) REFERENCES `client` (`COD_CLIENT`) ON DELETE CASCADE,
  CONSTRAINT `FK_TYPE_PAY_SALES_INVOICE` FOREIGN KEY (`COD_TYP_PAY`) REFERENCES `type_to_pay` (`COD_TYP_PAY`) ON DELETE CASCADE,
  CONSTRAINT `FK_USER_SALES_INVOICE` FOREIGN KEY (`COD_USER`) REFERENCES `user` (`COD_USER`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=83 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sales_invoice`
--

LOCK TABLES `sales_invoice` WRITE;
/*!40000 ALTER TABLE `sales_invoice` DISABLE KEYS */;
INSERT INTO `sales_invoice` VALUES (1,1,3,238.00,0.00,42.00,280.00,'Contado',1,'2022-08-13'),(2,1,3,238.00,0.00,42.00,280.00,'Contado',1,'2022-08-13'),(3,1,3,238.00,0.00,42.00,280.00,'Contado',1,'2022-08-13'),(4,1,3,212.50,0.00,37.50,250.00,'Contado',1,'2022-08-13'),(5,1,3,212.50,0.00,37.50,250.00,'Contado',1,'2022-08-13'),(6,1,3,212.50,0.00,37.50,250.00,'Contado',1,'2022-08-13'),(7,1,3,212.50,0.00,37.50,250.00,'Contado',1,'2022-08-13'),(8,1,3,1263.75,0.00,11.25,1275.00,'Contado',1,'2022-08-13'),(9,3,3,283.00,0.00,0.00,283.00,'Cr√©dito',1,'2022-08-13'),(10,3,3,283.00,0.00,0.00,283.00,'Cr√©dito',1,'2022-08-13'),(11,3,3,283.00,0.00,0.00,283.00,'Cr√©dito',1,'2022-08-13'),(12,3,3,283.00,0.00,0.00,283.00,'Cr√©dito',1,'2022-08-13'),(13,3,3,283.00,0.00,0.00,283.00,'Cr√©dito',1,'2022-08-13'),(14,3,3,880.85,0.00,8.40,889.25,'Cr√©dito',1,'2022-08-13'),(15,1,3,21.00,0.00,0.00,21.00,'Contado',1,'2022-08-16'),(16,1,3,1083.25,0.00,0.00,1083.25,'Contado',1,'2022-08-16'),(17,1,3,30.55,0.00,0.00,30.55,'Contado',1,'2022-08-16'),(18,1,3,30.55,0.00,0.00,30.55,'Contado',1,'2022-08-16'),(19,1,3,30.55,0.00,0.00,30.55,'Contado',1,'2022-08-16'),(20,1,3,30.55,0.00,0.00,30.55,'Contado',1,'2022-08-16'),(21,1,3,30.55,0.00,0.00,30.55,'Contado',1,'2022-08-16'),(22,1,3,30.55,0.00,0.00,30.55,'Contado',1,'2022-08-16'),(23,1,3,30.55,0.00,0.00,30.55,'Contado',1,'2022-08-16'),(24,1,3,30.55,0.00,0.00,30.55,'Contado',2,'2022-08-16'),(25,1,3,30.55,0.00,0.00,30.55,'Contado',3,'2022-08-16'),(26,1,3,30.55,0.00,0.00,30.55,'Contado',1,'2022-08-16'),(27,3,3,4088.20,0.00,0.00,4088.20,'Cr√©dito',2,'2022-08-16'),(28,3,3,4088.20,0.00,0.00,4088.20,'Cr√©dito',2,'2022-08-16'),(29,3,3,4088.20,0.00,0.00,4088.20,'Cr√©dito',2,'2022-08-16'),(30,3,3,30.55,0.00,0.00,30.55,'Cr√©dito',1,'2022-08-16'),(31,3,3,30.55,0.00,0.00,30.55,'Cr√©dito',1,'2022-08-16'),(32,3,3,30.55,0.00,0.00,30.55,'Cr√©dito',1,'2022-08-16'),(33,1,3,30.55,0.00,0.00,30.55,'Contado',1,'2022-08-16'),(34,1,3,30.55,0.00,0.00,30.55,'Contado',1,'2022-08-16'),(35,1,3,30.55,0.00,0.00,30.55,'Contado',1,'2022-08-16'),(36,1,3,30.55,0.00,0.00,30.55,'Contado',1,'2022-08-16'),(37,1,3,30.55,0.00,0.00,30.55,'Contado',1,'2022-08-16'),(38,1,3,30.55,0.00,0.00,30.55,'Contado',1,'2022-08-16'),(39,1,3,30.55,0.00,0.00,30.55,'Contado',1,'2022-08-16'),(40,1,3,30.55,0.00,0.00,30.55,'Contado',1,'2022-08-16'),(41,1,3,30.55,0.00,0.00,30.55,'Contado',1,'2022-08-16'),(42,1,3,30.55,0.00,0.00,30.55,'Contado',1,'2022-08-16'),(43,1,3,30.55,0.00,0.00,30.55,'Contado',1,'2022-08-16'),(44,1,3,30.55,0.00,0.00,30.55,'Contado',1,'2022-08-16'),(45,1,3,30.55,0.00,0.00,30.55,'Contado',1,'2022-08-16'),(46,1,3,30.55,0.00,0.00,30.55,'Contado',1,'2022-08-16'),(47,1,3,30.55,0.00,0.00,30.55,'Contado',1,'2022-08-16'),(48,1,3,30.55,0.00,0.00,30.55,'Contado',2,'2022-08-16'),(49,1,3,30.55,0.00,0.00,30.55,'Contado',2,'2022-08-16'),(50,1,3,30.55,0.00,0.00,30.55,'Contado',3,'2022-08-16'),(51,1,3,30.55,0.00,0.00,30.55,'Contado',1,'2022-08-16'),(52,3,3,30.55,0.00,0.00,30.55,'Cr√©dito',1,'2022-08-16'),(53,3,3,30.55,0.00,0.00,30.55,'Cr√©dito',1,'2022-08-16'),(54,3,3,30.55,0.00,0.00,30.55,'Cr√©dito',1,'2022-08-16'),(55,3,3,30.55,0.00,0.00,30.55,'Cr√©dito',1,'2022-08-16'),(56,3,3,30.55,0.00,0.00,30.55,'Cr√©dito',1,'2022-08-16'),(57,3,3,30.55,0.00,0.00,30.55,'Cr√©dito',1,'2022-08-16'),(58,3,3,30.55,0.00,0.00,30.55,'Cr√©dito',1,'2022-08-16'),(59,3,3,30.55,0.00,0.00,30.55,'Cr√©dito',1,'2022-08-16'),(60,3,3,30.55,0.00,0.00,30.55,'Cr√©dito',1,'2022-08-16'),(61,3,3,30.55,0.00,0.00,30.55,'Cr√©dito',1,'2022-08-16'),(62,3,3,30.55,0.00,0.00,30.55,'Cr√©dito',1,'2022-08-16'),(63,3,3,30.55,0.00,0.00,30.55,'Cr√©dito',1,'2022-08-16'),(64,3,3,30.55,0.00,0.00,30.55,'Cr√©dito',1,'2022-08-16'),(65,3,3,30.55,0.00,0.00,30.55,'Cr√©dito',1,'2022-08-16'),(66,3,3,30.55,0.00,0.00,30.55,'Cr√©dito',1,'2022-08-16'),(67,3,3,30.55,0.00,0.00,30.55,'Cr√©dito',1,'2022-08-16'),(68,3,3,30.55,0.00,0.00,30.55,'Cr√©dito',1,'2022-08-16'),(69,3,3,30.55,0.00,0.00,30.55,'Cr√©dito',1,'2022-08-16'),(70,2,3,30.55,0.00,0.00,30.55,'Contado',1,'2022-08-16'),(71,2,3,30.55,0.00,0.00,30.55,'Contado',1,'2022-08-16'),(72,2,3,30.55,0.00,0.00,30.55,'Contado',2,'2022-08-16'),(73,2,3,30.55,0.00,0.00,30.55,'Contado',3,'2022-08-16'),(74,2,3,30.55,0.00,0.00,30.55,'Contado',1,'2022-08-16'),(75,2,3,30.55,0.00,0.00,30.55,'Contado',1,'2022-08-16'),(76,2,3,30.55,0.00,0.00,30.55,'Cr√©dito',1,'2022-08-16'),(77,1,3,30.55,0.00,0.00,30.55,'Contado',1,'2022-08-16'),(78,1,3,3055.00,0.00,0.00,3055.00,'Contado',1,'2022-08-16'),(79,1,3,3055.00,0.00,0.00,3055.00,'Contado',2,'2022-08-16'),(80,1,3,3055.00,0.00,0.00,3055.00,'Cr√©dito',2,'2022-08-16'),(81,3,3,458.25,0.00,0.00,458.25,'Contado',1,'2022-08-16'),(82,3,3,611.00,0.00,0.00,611.00,'Contado',1,'2022-08-16');
/*!40000 ALTER TABLE `sales_invoice` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sales_returns`
--

DROP TABLE IF EXISTS `sales_returns`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sales_returns` (
  `COD_RETURN` bigint NOT NULL AUTO_INCREMENT COMMENT 'PK',
  `COD_PRODUCT` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL COMMENT 'FK DE LA TABLA DE INVENTARIO',
  `DESCRIPTION` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT 'DESCRIPCION DE LA DEVOLUCION',
  `CANT` int NOT NULL COMMENT 'CANTIDAD DE UNIDADES A DEVOLVER',
  `AMOUNT` decimal(10,2) NOT NULL COMMENT 'EL MONTO DEVUELTO O POR DEVOLVER',
  `COD_USER` bigint DEFAULT NULL COMMENT 'FK DE LA TABLA DE USUARIOS',
  `DAT_RETURN` date NOT NULL COMMENT 'FECHA DE LA DEVOLUCION',
  PRIMARY KEY (`COD_RETURN`),
  KEY `FK_INVENTORY_RETURNS` (`COD_PRODUCT`),
  KEY `FK_USER_RETURN` (`COD_USER`),
  CONSTRAINT `FK_INVENTORY_RETURNS` FOREIGN KEY (`COD_PRODUCT`) REFERENCES `inventory` (`COD_PRODUCT`) ON DELETE CASCADE,
  CONSTRAINT `FK_USER_RETURN` FOREIGN KEY (`COD_USER`) REFERENCES `user` (`COD_USER`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sales_returns`
--

LOCK TABLES `sales_returns` WRITE;
/*!40000 ALTER TABLE `sales_returns` DISABLE KEYS */;
INSERT INTO `sales_returns` VALUES (1,'LECH123','DFSF',5,50.00,3,'2022-08-11');
/*!40000 ALTER TABLE `sales_returns` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `status`
--

DROP TABLE IF EXISTS `status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `status` (
  `COD_STATUS` bigint NOT NULL AUTO_INCREMENT COMMENT 'COD DE LA TABLA ESTADO',
  `NAM_STATUS` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT 'ESTADO (EN PROCESO, ENTREGADO, CANCELADO, REVISADO, SIN REVISAR)',
  `DES_STATUS` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT 'DESCRIPCION DEL ESTADO ACTUAL',
  PRIMARY KEY (`COD_STATUS`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `status`
--

LOCK TABLES `status` WRITE;
/*!40000 ALTER TABLE `status` DISABLE KEYS */;
INSERT INTO `status` VALUES (1,'Activo','Estado activo.'),(2,'Inactivo','Estado Inactivo.'),(3,'Revisado','El lote ha sido revisado.'),(4,'Sin revisar','El lote se encuentra sin revisar.'),(5,'En proceso','Pedido procesado pero no recibido.'),(6,'Recibido','El pedido ha sido recibido.');
/*!40000 ALTER TABLE `status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `supplier`
--

DROP TABLE IF EXISTS `supplier`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `supplier` (
  `COD_SUPPLIER` bigint NOT NULL AUTO_INCREMENT COMMENT 'PRIMARY KEY DE LA TABLA PROVEEDORES',
  `NAM_SUPPLIER` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT 'NOMBRE DEL PROVEEDOR',
  `NAM_CONTACT` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT 'NOMBRE DEL CONTACTO DEL PROVEEDOR',
  `LAST_NAM_CONTACT` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT 'APELLIDO DEL CONTACTO DEL PROVEEDOR',
  `ADDRESS` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT 'DIRECCION DEL NEGOCIO PROVEEDOR',
  `NUM_PHONE_ONE` int NOT NULL COMMENT 'PRIMER NUMERO DE TELEFONO DEL CONTACTO',
  `NUM_PHONE_TWO` int DEFAULT NULL COMMENT 'SEGUNDO NUMERO DE TELEFONO DEL CONTACTO',
  `EMAIL` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT 'EMAIL DEL PROVEEDOR',
  `NAM_CITY` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT 'NOMBRE DE LA CIUDAD DEL PROVEEDOR',
  `ZIP_CODE` int NOT NULL COMMENT 'CODIGO POSTAL',
  PRIMARY KEY (`COD_SUPPLIER`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `supplier`
--

LOCK TABLES `supplier` WRITE;
/*!40000 ALTER TABLE `supplier` DISABLE KEYS */;
INSERT INTO `supplier` VALUES (1,'Leche sula','Mendel','Aguilar','Las palmas',22321456,0,'mendel@hotmail.com','Tegus',11101),(2,'Coca Cola','Carlos','Zuniga','Tegucigalpa',98563214,0,'carlos@hotmail.com','Tegucigalpa',11101),(4,'NES Caf√©','Pedro','Matamoros','La kenya',22222222,0,'pedro@a.com','Tegus',11101),(5,'Pepsi','Carlos','Lopez','La ca√±ada',22222222,0,'a@a.com','Danl√≠',11101),(6,'Quesos Olancho','Exequiel','Bonilla','Olanchito',33333333,0,'b@b.com','Juticalpa',11101);
/*!40000 ALTER TABLE `supplier` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `system_settings`
--

DROP TABLE IF EXISTS `system_settings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `system_settings` (
  `COD_SETTING` bigint NOT NULL AUTO_INCREMENT,
  `NUM_DAYS_PASSWORD_EXPIRED` int DEFAULT NULL,
  `NUM_ATTEMPS_LOGIN` int DEFAULT NULL,
  `COD_USER` bigint DEFAULT NULL,
  PRIMARY KEY (`COD_SETTING`),
  KEY `FK_USER_SYSTEM_SETTINGS` (`COD_USER`),
  CONSTRAINT `FK_USER_SYSTEM_SETTINGS` FOREIGN KEY (`COD_USER`) REFERENCES `user` (`COD_USER`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `system_settings`
--

LOCK TABLES `system_settings` WRITE;
/*!40000 ALTER TABLE `system_settings` DISABLE KEYS */;
INSERT INTO `system_settings` VALUES (1,120,5,3);
/*!40000 ALTER TABLE `system_settings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tables`
--

DROP TABLE IF EXISTS `tables`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tables` (
  `COD_TABLE` bigint NOT NULL AUTO_INCREMENT,
  `COD_MODULE` bigint NOT NULL,
  `NAM_TABLE` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`COD_TABLE`),
  KEY `FK_MODULES_TABLES` (`COD_MODULE`),
  CONSTRAINT `FK_MODULES_TABLES` FOREIGN KEY (`COD_MODULE`) REFERENCES `modules` (`COD_MODULE`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tables`
--

LOCK TABLES `tables` WRITE;
/*!40000 ALTER TABLE `tables` DISABLE KEYS */;
INSERT INTO `tables` VALUES (1,1,'Dashboard'),(2,2,'Facturar'),(3,3,'Ventas'),(4,4,'Compras'),(5,4,'Pedidos'),(6,5,'Clientes'),(7,5,'Proveedores'),(8,6,'Inventario'),(9,6,'Categor√≠as'),(10,6,'Movimientos'),(11,6,'Devoluciones'),(12,6,'Mermas'),(13,7,'Cuentas cobrar'),(14,7,'Cuentas pagar'),(15,7,'Devoluciones'),(16,7,'Rebajas'),(17,7,'Planilla'),(18,8,'Usuarios'),(19,8,'Roles permisos'),(20,8,'Bit√°cora de usuarios'),(21,9,'Gr√°ficas');
/*!40000 ALTER TABLE `tables` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `typ_product_entries`
--

DROP TABLE IF EXISTS `typ_product_entries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `typ_product_entries` (
  `COD_TYPE` bigint NOT NULL AUTO_INCREMENT COMMENT 'PK',
  `NAM_TYPE` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL COMMENT 'NOMBRE',
  `DES_TYPE` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT 'DESCRIPCION',
  PRIMARY KEY (`COD_TYPE`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `typ_product_entries`
--

LOCK TABLES `typ_product_entries` WRITE;
/*!40000 ALTER TABLE `typ_product_entries` DISABLE KEYS */;
INSERT INTO `typ_product_entries` VALUES (1,'Compra','Compra a proveedores'),(2,'Devoluci√≥n','Devoluciones entrantes');
/*!40000 ALTER TABLE `typ_product_entries` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `typ_product_output`
--

DROP TABLE IF EXISTS `typ_product_output`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `typ_product_output` (
  `COD_TYPE` bigint NOT NULL AUTO_INCREMENT COMMENT 'PK',
  `NAM_TYPE` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL COMMENT 'NOMBRE',
  `DES_TYPE` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT 'DESCRIPCION',
  PRIMARY KEY (`COD_TYPE`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `typ_product_output`
--

LOCK TABLES `typ_product_output` WRITE;
/*!40000 ALTER TABLE `typ_product_output` DISABLE KEYS */;
INSERT INTO `typ_product_output` VALUES (1,'Venta','Venta a proveedores'),(2,'Devoluci√≥n','Devoluciones a proveedores'),(3,'Mermas','Mermas de productos');
/*!40000 ALTER TABLE `typ_product_output` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `type_product`
--

DROP TABLE IF EXISTS `type_product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `type_product` (
  `COD_TYP_PRODUCT` bigint NOT NULL AUTO_INCREMENT COMMENT 'PK DE LA TABLA TIPO DE PRODUCTO',
  `NAM_TYPE_PRODUCT` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT 'TIPO DE PRODUCTO (UNIDADES, LIBRAS, LITROS)',
  PRIMARY KEY (`COD_TYP_PRODUCT`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `type_product`
--

LOCK TABLES `type_product` WRITE;
/*!40000 ALTER TABLE `type_product` DISABLE KEYS */;
INSERT INTO `type_product` VALUES (1,'Unidad'),(2,'Peso/Volumen');
/*!40000 ALTER TABLE `type_product` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `type_to_pay`
--

DROP TABLE IF EXISTS `type_to_pay`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `type_to_pay` (
  `COD_TYP_PAY` bigint NOT NULL AUTO_INCREMENT COMMENT 'PK DE LA TABLA FORMA DE PAGO',
  `NAM_TYPE_PAY` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT 'NOMBRE DEL TIPO DE PAGO (TRANSFERENCIA, EFECTIVO O TARJETA)',
  PRIMARY KEY (`COD_TYP_PAY`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `type_to_pay`
--

LOCK TABLES `type_to_pay` WRITE;
/*!40000 ALTER TABLE `type_to_pay` DISABLE KEYS */;
INSERT INTO `type_to_pay` VALUES (1,'Efectivo'),(2,'Tarjeta'),(3,'Transferencia');
/*!40000 ALTER TABLE `type_to_pay` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `COD_USER` bigint NOT NULL AUTO_INCREMENT COMMENT 'PK DE LA TABLA USUARIO',
  `IDENTITY` varchar(13) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT 'IDENTIDAD DEL USUARIO',
  `FIRST_NAME` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT 'PRIMER NOMBRE DEL USUARIO',
  `MIDDLE_NAME` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT 'SEGUNDO NOMBRE DEL USUARIO',
  `LAST_NAME` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT 'APELLIDO DEL USUARIO',
  `GENDER` enum('M','F','O') CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT 'GENERO M:MASCULINO, F:FEMENINO, O:OTRO',
  `NUM_PHONE_ONE` int NOT NULL COMMENT 'NUMERO DE CELULAR UNO',
  `NUM_PHONE_TWO` int DEFAULT NULL COMMENT 'NUMERO DE CELULAR 2 (OPCIONAL)',
  `NUM_REFERENCE` int NOT NULL COMMENT 'NUMERO DE REFERENCIA',
  `DAT_BIRTHDAY` date NOT NULL COMMENT 'FECHA DE NACIMIENTO',
  `NAM_CITY` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT 'NOMBRE DE CIUDAD ACTUAL DEL USUARIO',
  `ADDRESS` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT 'LA DIRECCION DE DOMILICIO',
  `IMG_USER` longblob COMMENT 'FOTO DE PERFIL DEL USUARIO',
  `COD_STATUS` bigint DEFAULT NULL COMMENT 'ESTADO DEL USUARIO',
  `SECOND_LAST_NAME` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`COD_USER`),
  KEY `FK_USER_STATUS` (`COD_STATUS`),
  CONSTRAINT `FK_USER_STATUS` FOREIGN KEY (`COD_STATUS`) REFERENCES `status` (`COD_STATUS`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (3,'0801199912345','Luis','Eduardo','Garcia','M',88795986,33333333,22101972,'1998-02-12','Tegucigalpa','Res. Plaza',_binary 'ˇ\ÿˇ\‡\0JFIF\0\0`\0`\0\0ˇ\€\0C\0\n\n\n		\n\Z%\Z# , #&\')*)-0-(0%()(ˇ\€\0C\n\n\n\n(\Z\Z((((((((((((((((((((((((((((((((((((((((((((((((((ˇ\¬\0rr\"\0ˇ\ƒ\0\0\0\0\0\0\0\0\0\0\0\0\0\0ˇ\ƒ\0\0\0\0\0\0\0\0\0\0\0\0ˇ\⁄\0\0\0\0⁄Ä\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0R\n|mO\Ã\›\˜ñ\'è£{@\0\0\0\0\0\0\0\0≤R±¨)Ö˙\"Ø\Í};ëß∑\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0è\Œ3Qó	\Ô\"ìh¡!\ˆ¶™\Í}Q\€I\ÓÉ\–\0\0\0\0\0\0\\öS†\À»ï<¨>&∂˙D\ÿM\Ê\0\0\0\0\0\0\0\0\0\0\0\0\0\0◊µH\”>∞wBh>\ÒÜ$-¶¬º—á\‘˝\Ù\÷\Â\0\0\0\0\0C0u=DÜ%à\Ï\Î\ÏOw\Zñ\ƒ\◊G\“\Z£kÄ\0\0\0\0\0\0\0\0\0\0\0\0\0M\ÓOõ\»}èGæòò\”\ﬁ;±ù\‰yq\Î\‰7ü\Ù>¶Vl¿\0\0\0Ü\–\Ò@\‰ó`¯ô\”~ô˛—ìfU˝U1˛é˘[\ÈrH\0\0\0\0\0\0\0\0\0\0\0\0\0ã\Û–ø<+dËÉúã+\ÿQd\‰_Å\Ê\0&7\ﬂÕÉ\ÈØóá\’æW\ >û|\›\‹˙;èôqß\Ò˛dK\Í*(\0îva/ÅíX,ps¢\Zg\◊{\€D\Ì\√g\0\0\0\0\0\0\0\0\0\0\0\0\0\0):/t\Èb\˜\'Éú1rÖbπoÇ#|\Â\"¿[aNlaÆW¸2ô\'#\…\”epR#m\Ò•}p\Õ(Mã\ÿ\◊\ÕL\¬\0\ <gq%\Ã\È>ù\«çg≤5\›\‰\›`\0\0\0\0\0\0\0\0\0\0\0\0\0\rqß7ú/≤0ìgòc\«4ïÄ\ \≈ahö\0\0\0\0\0çí5Øú¸\0ïä\»,=\Îy\‰\‹\≈{8ót\Û5\›⁄çy7à\0\0\0\0\0\0\0\0\0\0\0\0\0_im\Á£-¶Ö}<#fz\ﬂ?H≤/+\“\`J\Ú\0\0è\ÍI8\‰\0ñ\0,\—FäŸ¥\„å\Ë\„&Aò\"e™•n˝A\Ÿ&\·\0\0\0\0\0\0\0\0\0\0\0\0\0\0V>|˙g\ÊcùâÆ≠%ñ3\"\≈√ì\Õ3\Ûπåd´¶¿\Á[u6M3\‹\Û¥RE∑∫/ï®Åô{£\rÅ∆∑\Íl∂ºì.\Ò\”\œ‹•\Òdâ2\Á+d¶Ω∏P\∆\Ÿ\‘€∏æ\0\0\0\0\0\0\0\0\0\0\0\0\0\00oüŒπ˘§\‡ûrngaãî#ªgà\ÃØ\"´∞aJÇn(\Ò\ﬁHéêñö \‰d1éºHå,\ŒGÑ\\\ﬂF$\Œ	Ñà\ŸxÅ\ÙO\Œ\€d\⁄ \0\0\0\0\0\0\0\0\0\0\0\0\·Ô¶ä¨ %¢fIúoR[\√3à∆Ü\«,µ°tñ÷æ•˚_\Õ¿ñπ:\rà\À\Ú≤Fïøë\Á\Îï,G\ÙÛßû∂ä|\…tã®bñ\n¯∞˚V;I…í.?+∆Øÿ´\«˛\Ë\ŸﬂùæÉ=Ä\0\0\0\0\0\0\0\0\0\0\0\n©•}|GØ¨·çòx\‡\Ì\Î	\ZM¡\∆nπ¥3uùsxt4Ch\—,è\Ò\⁄:‹õµkuJ¯I>M\Î€¶–çc\“J\‚P,7%i]ÆT\ÿ\◊1\ÕKáïW4ú\„\À\‘x{àKDA∞u\˙©¨6x\0\0\0\0\0\0\0\0\0\0ñghn∏\√/¨\\Ï¨=/qJ±l\Ã\Èh∂\È/Ib•\√\ŒpÉ´\›:Ÿ†{\Âaj_s(9\∆([∂dt\∆l|ü∑Ñπ\—\›\‰hØô©+\€\€\Z\Õ\⁄\Z\Ú\Ãi\ ˇ\0•Y^^†1ñòsp\È\ŒO™ZßjÄ\0\0\0\0\0\0\0\012\‚\rkÆ-U0	Zœ°ebeÄEE\⁄ O}ª§gc{\—\Ï\ŸY÷•\Ô¨\Ï\€f≠\Œ\È\À\÷Îß≤9\ˆﬂù˙\˜\Õ\”T\ÌØ™µû¢ô\ÿ78\‹zqùaiπZñ¶\˜©Rß:q\Û«ß{s\Î∞v\\4éuá©e®∫\À/\√^úÄ\Ò=c\1é\›An®\Ã\Êf£n\0\0\0\0\0\0\0\0\0ª&µ5\'ê;&\ÃY^@|ÅW\„#\‹v˝%ºskz[\Ë∫\ŸHã\È`\˜|\Íñ-ŒüœÆ‹≥k-â\Â\ˆ\Á\”\ÓG\Õ˛[Z∑¨\ l\˜9\◊#R\ \ƒ\\˝^:\≈\Û∑ûµµ9Ω¯>ü\\9-g.∫\Úsº\À\»˘˙\003\≈k\Œ\…\0yp\ÏmΩ\0\0\0\0\0\0\0\0\0\01>oºkÄeô≤ \„úC\◊⁄±îN\‡¯\«fA\„\Ù\œ˚Z[{+7•w\Ìf¢â\›^º\⁄4ãÅ/\Èõ*&kÉüh\Ûµ\ﬂZ≥X\À\ÏIJ¢\‹${Gß,\Ÿ{\Ë-’†,\Í\»È©ô1Wí%∫\√\‚H©Qèê+ebé~Å˘\ˆ¿}\Û\Ù\0\0\0\0\0\0\0\0FO\Á\„®s`ãú\0DK\◊lÑsúMY¨Y¥ªπ∑õá2∏\‰y\„˙˙ûæDFèÅ3\œN«îFGè¶~IÅï\Îådr9¯)]MeÇJ—îheö≥®MCû\÷\ZΩå\ıZ\Ìí4à\”\⁄ˇ\0,n\‚\Ú\0\0\0\0\0\0\0rÉ\Êxﬂ§\ıACs¡\⁄V ZQ\ÚÖvZ$\Ôº5N›ó]\\\‰&\„\«\€\Z\\=Eπ\\Ï\◊{KNDW“çs±≥q¸y\≈%¯\Á\ƒ\ı\Î€ìœ∑a\Á\Ës\·\Óxc\Ò–ì+D∆∂¢˙\Ít\⁄¸M«¶^ºº\Í\›gÜ¢\€\Ùâ1ô©:cùa:\ı\0zXv\Ÿ\„p\0\0\0\0\0\0\0\0ü•æôã>iO@ù¨‹ìú^x6\ﬁ>g7\”?\ﬁ_<\\\·è!åaPvOÖîç•á\Ô,ñjNa\ÊG¨èCÅ\»0\Û03\ÏxÇ\’Q±˙ö[dg\ˆ≥\œ)\È/LØa\Œ>G$4\Êa\Û∑o_\r\Ê\À\€géÿ±ZŒΩÄ\0\0\0\0\0\0\0\0\0ˇ\0üæëÄ>t{xåå{9∑\Ûp\ÛqÆ;ûéGèØ#ò\ŸR≥h†\Ï;$£\Ú|e\œ..\'nqŒµ¶µ≤ˇ\01+/øó®\Î\ÿ9q\»p<˙˙¯öV∑±u÷≤\Ôæ\‡\ˆ \0\0\0\0\0\0\0\0\0\0\0™5g\”ˇ\04ò\€]\⁄#i\Íπ\ÕxøI*≤π≥˘\˜GGåDº)¨v˛ê\ﬁ\ˆcw\∆Ãó%\»q\»q\»ÒéîÜ%5&\·\‘^¶™\Û4K√ë√ûúc[‹¥\ƒ˛≥}”ª\\ãUW~’≥ê\0\0\0\0\0\0\0\0\0\0\0\0i\›\≈|\„\È”Çz∑RÕ∂4ﬂñ~Z77+\÷2P\„é\√\nª/[≥]\Ôˇ\0ü\˜\Ò©\‡õe\∆π\Í\«°*tßqL≥rj≠£´L˚\ˆ¥øæ\›{\ \Î\€\…\¬\Ù¿˚Vó≥\'ùIànx\'æã\◊[\0\0\0\0\0\0\0\0\0\0\0\0\0ü™€ØJ\0\'\‡˘\Êµd\Õ\Ì-#.f>E<∞R\Ô˙\ˆ\Õ}\ÙŒüDöRπó\Â©\Âƒ∂	é=\‰HØLC\Ë}W∞5Æn^\À\÷;d\ \Ú´\€e\Ê\ZV\Ì’Üî˙øÜ†S\'`õ(\0\0\0\0\0\0\0\0\0\0\0\0\0\«Êüß5Q™•\‚6q≠:l]tIn=uçâóâ\Œu3P¥{ö\Î/_¯jF˝\Û\÷\˜4n1VOq,DΩ¸\…\ÏxÇj\r…ªun\Â\–˘∂À∂§∆≤˝¥b\‰s¨L:\∆œ´u8\'¨\ÚÜﬁ∫(}\r©7¯\0\0\0\0\0\0\0\0\0\0\0\0\0\01≤G\Õ;*\«\0_æv˙N∂|\Ûœ∑Å≤\Ì\⁄\'f\Ê\ﬁ\Ú\"≤%ã\“?E\“\Ï‘õwRY¨≤k?¢(r\Î4¥N†4¬¥Jl}>~Ÿ∫\»l¯}∑\ÒÉ\÷\\hûu=ûxÊßØ\–UùíW~{˙§[,`\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\\˜\0Q4ü\‘˙\Ë\”]ùMãt\–\◊v\\\ƒ~moR˝fØº\Î∫˝õ\ÁSLKï\€\nÕ£-≠\"e\⁄\‘\Í&uòW˚%∫To∂®\›ugÆ1®\ÿ¯€§\Óp\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\◊˙g\Íjâ†Ÿ∏D\Ó\”\—\Ú1ºrksô\÷}›û|Áçº\ÙŒ≥Ñ)€∂”àùôëèùu\Û\Û¿=u\ÃuwYï\Á±e\ˆq”∏\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0:7\Ëås\Â\’Œòe\Ì};ï\∆f°fŒ≤\ÒΩ˘*>w1$\ËwäëÄ:\ÍÑ.≤&kwJ\Ã\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0Á§∑èô\Ú\ \ÌI3∑éöç\ÔÉ\”\«:õ\Ê?\‹\È\ÃvY\”O\…“µë3^õ\Ò\"\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0x\Ëmˇ\0Ü|¬õÑ.[C\Ì)l›∫≤U¶\Ù\Âxp\»\‘\…˙\∆\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\07\œ_OS\Õôç\–\ﬁ:\“w6©_5;o\n\ˆ\Ÿ\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\05V™˙üBO|p∂¡}gw\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0dò˘èw\’Kï\ƒ\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\Â\Í\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0?ˇ\ƒ\02\0\0\0\0\0\0 !@P\"123#$%04`5Äêˇ\⁄\0\0ˇ\0ÔÜ£π7eD\‘3\ÿ\»\Zí$åBO´∞ªá&jyn\‰+ôlMa\–}üµ\Íã/G@ãz\€IU\ÂSs¡>¢|\Ê µk&f˝Æë≤\Ò;\ˆß\\ö≥ñS¶Uµ\“4¶≥±\‘vQZ=E\Œ\'\œ\”]\ﬁ7%HvS\ÿ\”$x\Ãq\Ï\„(Q˛@\Èg$¯i\÷S|l6=\‹\Í/v\Ò\ˆP\Û\Ú⁄Ç\°®˝°æ\b™™\„s¥@¯\À&¸r¥§\ÔKa\ˆÖ^\÷ZÕüR\ﬂi<=\\\…-vM¥\ı\ ¡1$!˙Iw\·\ﬁ3]ó`N£ñ\Ì\Ú\ /S/\÷\◊˝üS\ \Ù\’9T\ﬂX\€LO\ƒ&Ö¥ñ˙\⁄f\Á”ó\–jKèF\Ú∏\ÿ\˜1NU#˛76|<åÊäï¯æœ≠$wòü*\–\ÙnG() \”w…í[∆§™a¢:\÷˙Z\ﬂ\ ?Êº≥\ZËÆ∏Nπ¥A\‡]êâåÇ∫MóBYë\‘Ã≤px\ÂR\»\Ù∂üg∏{\‘Z@\Ú\ìî_Ö\Á\Á$G\0\‘◊±l†t6Ic¸í\‰7=å\«\'\ \›\«Tê±\nu^#\re\»~<Æ{\‘@˚,ß<1rúõ¥Ñ\·\”q[êd°\Ïﬂ∂Æi\◊\Ã(F	6*\‚Hd±‹Ø68≥#&z¯y™-=dèl1¸Db8˚\›\Ò>U>-G¥\\\“.˘)˛À®è\«Kî\„\ƒ}¶\'\Ã¿˘\∆\ﬁP\¬¸ˇ\0¿ã\∆ó\√\Œpa\€O,)rOîøƒÆ\ı`;∏\¬r\Ó“á¥|\—¸è≤\Í\Ú\ÎOï\…\ƒ=§f\’9C§I‘ø\ƒ0\‹6Õ≥oTî ºH_˛\"N™¿tn Óøíß¢˙ø≤\ÎU˛Ÿê\‘\›\ˆ∫+\Ì\ˆ~`˚\0	¬è\\à\ÀIûó\n#áZ\ \·’ñEnDG?4A\…˛gp+\\\n∆ìq\ƒa§\œx\Ù\\I,s\ﬁ8\ˆu\÷˘ê\0¶@(#ªøª£ã_≤\Îo\Ù≤Ωyáãéìçí∏k¥î\Âù\Î#¯\⁄˙	£\Ì®–ìa2GUTMây-ˇ\0Ø\ˆ]m˛ñTó1p\ﬁ6\…\√SW\’\¬WA|\«\◊h≠˘_˙+f∏`tÄ{∏J\ÿ=Ä™9\ÍûØóV3Gˇ\0\Î˝óZß\ˆ‹¶?«é∂é\"\«<\\séò\√˘«Ç\”_J\ÙVû\…pÕç¢q\„¡d\…\ZakC\Î4bsk\ˆ]`<\”\‰\Ò\ ÿó®\‰∑2,rêl¥,á∫Lè55á=\Ó\…i¨jj<~\ÂNR|5g#π\–\Ú*\Ú\÷\◊¯\ÛDè\ıüe‘°ﬁìh\ÓyX\…Gè9\◊é§±[\Òµ\Ì\Â6TEI\Ò<\nƒóY\»\”\€w$ÿà\‰{\"L9¨ãr\':\ÓFd§:\ÀB\»{\Õ;—æY5`˙“ú\Ú\»\ÕÉ\Ï∂-˘k\ˆßw\·\Áê1~qoπa∏Ç∏\Ë\‰à\Œ&bÅ!*`\»xqf<M˚ôí\„\"Rü,S%\ƒE\\F\\b;ò\À.\ \‚	‰ñπ\≈Nqåa\Ó{æ(\€h\÷˙\’}öS~XÀä€õ§ÇDW<aûªê≥\”g¶X∏\‰<8©Ü\—ºEK.5.za\œLò\0\„{:ﬂêò\Œzì\≈^Wié)\‘\r¯©˛À®,á\¬U\Âr(\ˆwf\⁄#¡é)ààû\Á\‹\Ò5Ko°Äí:8\‰q,6\»aE%n66)ç6é8\ri	#\ﬁL\·\«!\ﬁ`¸m§,π≤<\Ë2’º„∞ô¥/\ÀA\ÂW\Ê4 ï¢b\⁄9ü\ƒ\›¡¥\\n≈í¿1q%ˇ\0™ä¢±\'!\„ë\—p¡AU9\«ccq\’p9V\„dô-\≈]7Jü˝uTDv{Öiü\ƒ\‹\œ\‚n`\⁄cvñà\˜å\”$~\Œ\Õ8M9O<la˝èUZ˙á7á˙1∞SV¡\0eG	\0\Ûd”û¿2˛ D\∆\–&\Ù\≈DTv>\Ì2ßÄ	>gáUW\"L\Ù\Ï<\Ûè/±>r4i9GöP\Ÿ\Ô\⁄ﬁñƒ´¶4\‡∫\ﬂ\ÿu=ø§o`5mÅg+û•[\…\Ú\Z|2Ö¶$£\‘Q\À£ê\Û≤ªm]/Æ\œ4áå1¥˘~U\Â@T»ì©`	\Z±O-\‹fÖ¥\À(qa¿\»F\€Oz\œ&)*˚hOe[\ﬂL[˙W>¡{j\Ã:\·:\Ê2“∏¢()∫Ø\ÏúU\Á}:\\XlBÑí\Ècªì`øXà)\‰2l=ï≤ª¶\”$$vÃî\À)´Ω3~$KáD	å≤\€#∂¶/\È∑nA°ß±\ˆ8\ﬂL\\\ˆOÆ∫µnµô/π%\ÏaØ\"¢põô £Æ´ã≥,∏\Ò3G$\ÚG•ìàº/¡°≥ÜH\”b\”zÇ\'ïåETXR=CNò¥\'\›\Õ?\Ã˛2\Àlà2´Ç8\Òv<¥Å\Îë\ ì$\√~>\‡J\nÀ®\‚{$3\∆˙v\ÛŒüYwx\‹}\„}\‹eø!\n ß±\Á\¬¿2ÅIå≤Ä(\¬\‚29\„\Í8|\ÙÆ¥nY8h!¸\«Z\·&3\È\‰\‰gïál%y\Àj®\ \Ã7¶4\ﬂ:k0ôØy\…1∫étVCå6\’2u;/\‰ò\Ó\∆sîU≤\Ó\…,\ıﬁáPÒàºß\‘Iê\‘f\Ì\ı!Ωã\Ûª/† í{%5¥)G¯2õí\“|•Ω¨\»..¢ú∏:ébc\Zü\"Z√ïöùÖçaGe\Î\„®˛,\’-#V^\»M˘f†¢è%6HDå\Ÿ;om&dhc#R≤8Ê§ñπˇ\0\»gd\Ÿ\“\›dò¶[ÿ¨\√\∆\Ú|{\„ê> ã∑\Î\Úæ\ 4\˙{(X1gG*\n˚îUóë\œk\Ì¯\œ*f,I,9\∆Iaπ,\Ÿ\¬82≤¢IK∫UÆe\…O8\≈d•Ö1	sSW?)W\„\ŸA\\˚≤v\’3<\“\„æ\‰s©Çvì,\Í[à\∆6\„ï\·;\Á\∆jºñ\nvV«†\Ó\·†#Æìã\ÏÅ]&qR“≥]\ıV5µ\Ó∂}{\Ó\‘e\ˆº\√m3+\‘ARD\Àh≠Oé˚F√¥¸õy\”8ΩK\“\Z&\”\“<\ı\r`À™pò&\Ÿ\Â/ë\·\„\‰n1ë:\Ï∏%4oC~kÆni˙\Òäàhπ>@ƒà\·+áëÑ\ˆ<\«u!Q]\Ù\›}|à\"à)\ıZ\∆çùø<aûâ\ÓyQ]\Õ?\'\”Y\‚¢.Z’µ1æí*§¨à2ÑßDä§ót´ºe\ﬂTW£çi\ \Ùó#góÜ\Óù\Ò\‘(kF\‹*\Êñd£ût‘®\Œ†\Ì´§¸\Ï\nä>\◊\\\€J\œ\Ù≥˛™S\·\Z<\Ÿ\'.V\—Z\·6\\m¡4\⁄KùGo\À+\ﬂ\ı0à’µ\Û¶8\"\‚J£h\Ò\⁄Yaí\"?4\œ˚¨Ø8]GP¬¢/£Éà_éJ\Ê•ˇ\0AÜ\\|¬ûadjè®\‡¢ïK\·-dzõ\r¢π\¬Ï™ÇÄHi≥\Õ˘~m=a\Î\‡}N≠≤\Û=¥v˚û\ÚK´I\ÒÉ \”V):—µÜ§û\Ô	Sî&3\¬x¨í&<\–<\›lÖeéóf¡y¿øú\·v+∂Lj¯A\rú‘±Y<FK\0r\—\ÔO]û#\Ú∏\Ÿ\‚J\‡JIÆ)d\"\ˆKozI\Î_4	>üQZ%|e^WfC†o0ø≤í©{PD\ÛF•ñ\ƒ∆´´V∫±DW\rÆqZ$\ﬁ9|l\·u\rÑ∞\ZT^Çû€ò\ŒMè+\—\—F°`§JøÅ\‰c\’\›\’9G°\Ì§\Ìx˙{[´£Lí\‰πE\Œ{.\ŒbVæQ2cï!ÜEÜr\ﬁ√ëKxÑû\«~W∞\·*ò*¢BΩì>\ -ë`4Éªe\‹˝ñ\ˆ\ÌAG\ÏfF`c±óP}+\Ÿ\nπ˘x©\¬\„e\ÿ7ò?\"\∫v\Â&∑\Ùñ/Ω4˘…ìø\Âå?\Œ\ÔV\QHòo\ƒŒ†ÑÄ\ÌrEa∆ê±[$\…,Üg\ƒr’ó/\¬\»6Q¶¶\œ˛\‹e\›>QEPqSî@\Ÿ6yx\€…í\ÃP≤\‘&\Ê\0\Œ\’¡M©`3ì‚Ñò\Ò´Il\ƒPF\·Ø\réC/√≥Œ£hD§ªÅ(üõ2S?I:∫4\·¥”è\≈\ˆ\∆w∂\”\„)Z\Ú\ÿ\Áç.8tπUU\⁄Tv\‰µa\ÿfü•¶>˚ô%~\Z^\«WÄO\À\⁄¯\ÚJ¸∞ºj	∆Æu\√t\„0\‰á+k\¬b|b:IÄ™®\ÛBèfßk\ÒdR\·\‹y\œ™™Æ\ıt\Úl∂é$/®∏£b~Mà\Ù\'∂E\·Y? H.\Œ\Êìc±ddÿÅå\p¶caJ£öEfc\À…è\Áè~Øq/W\Òˇ\0\‹E˘E\Â5W˛T\nó§\‰X\ÕEo<*∏å.b;>úÜ_G\ÚUb|/d\Ë\È\˜-Ä	√¶”ÇààüSa	ô\ÏZ÷Ω\\˛Ãπ\„-¥\Î>(è\¬/w<ãà\…a†é\'\Œ2\ 8]Bkû(¢úm˙§{§~hº£ˇ\0∏¡\Ú¸r¯y°tTT:‚≤∏\‡˚\Ú\ÏRÅ	áÅ[w\≈V∂å√í^§ßj∏>≤lV¶G¥Ç\Â|≠\ÿm]z\" â\'d\‡}ã\Ûû0\ƒDM§%tx®óÅc\˜=\“K\»H˝}¸w¿ΩKob\n∏Æ=˚w\Ìx\Ï7i≤u\ :†Æc\ÎÆk\¬\∆#†M9∂ük\…a9D_\/\¬/\ Ÿü{\∆ó$/\Û\˜H˝∏\À¯§¶[üÜ\Á^[ˇ\0)\Àˇ\0∑©ö\Âç\Ù•_Åü∞k\Z˛m0)\·\Ûq+W\\µ\Ì¯\0êì\‹\Ô\Ì\Á.†åô%~c~^\Ám•\‡\ﬁN[\‘ˇ\0\ÌDs\À\Z7\Â\ÓU\·\0ªf§ö_\≈ X$¯V¬á]∂ûÅ\Î\Á˝ÜS&4Üâá\ÛO\»\ÒM‘Ø\\ﬁi©^¢π@Äª\'µ\ﬂ\€2\ÍãÕì)\√o/.G˝øq~ú¸\”T|J¢>\ı±ø/j¸cÆvWû∞\\2q\ ¸3\ı$é¨\Ì¶a˙Jœ±k(~98†W˙â9ß\Â˙K?[e–ø4lªé\À˘®If] U\Èc\Œ#aG!eW˚ú.ç\‘\ \ıP\⁄˘oW\'¥\…H \€J™;*\çØa|˘\\\’rˇ\0G.è\€?\Í\'\Â$?[e\ˆ;®û∂∑\€Q/\’\ƒ\»\ÂçW7q8;\’‚≤≠x≤?”®\‰tç¶lB1¢¢£\”c3Ö{^+¸zøñl°Ωà®©®¨õj.ùë\„ô\Ùj\ı˛\·•\◊\Á8§v\Í\∆<\‡≤‘ßäDèfçâ\„ã\ˆMI\“Z˚)•˙Yxã¬Ø\Ê\⁄\ˆe\ƒpd¶j%˛\›z\Õw\ˆ\Ôù\ÚXˇ\0ÅìVùà]ÉUØ6öa©i95TDd¸çaØbU\ÁmI/\⁄\√D˚—ô\Ò˛…¨\"y†{h\Â˙àªF_√á\'\–›∏ùÉRÁ∂ΩM\Ô⁄î]\‰∂\n\‚˙\\uµmvRTãé≤≠\ÌD]\Î\ı)sq¶‹éürª|#ã¿m-\Òç\◊	\◊=ö:\'ñw\Ÿ^l^jdrã++a˘\nä+ê$¨I-ò∏\…uA^√™\"˘\‡Q]ß]P\–\„e\‰Ç\Á\ÎàB#\Á“ìñ∂Üü&\Ç∫\‡Yß˚]\Ÿwµ\“\„Ã´kf†7¶\Z93∞œ≥{_L\Ûø≥\–\\jªm?\—V}õYA\€D7\À⁄∂ª\¬˛\‘¸e¥\–HÑ6∞\÷\œXˇ\0•\ S\Ú\”Ÿµ·ü≥/\'WEë9_ 4⁄Ø+µc^2\À\"4∑¢†â∫\ÌlTÖækπ˛ôù©†Ñ\›R\»ˇ\0\Õ9\÷\ÿ˝ûK!!ãá^àO\È\‰∞X≥Ñp%\ÌKe\Áè˙y¸Wï˛æ)\"âfí{º\rOI¡E	d ≤w\”\◊m¶+z\‚Ø\Á\Ë\À°	óù\'ú¿p\ËÎí∫°NiÑTääø¯|¥_U•åm$\€YyZ6Q]lösTV¢\Õ$†Ç∫HB\—\˜MAQ\Í~3O\ÕHsd\'#:ï∑ñM|ò˛\÷#<˙√¢»çf´ú=rÜ°e™\0År\„Æv\À	≠\√jK\ÓI{m-Q\·\‘\≈6ñ®\È\ˆ±hÕµ%?≠NxZõ~˚u$^r\Íîe„≠ìNW\\Ω∏\÷§\Ï\Ù8\Ôe\‹\"µOπRŸÆà\÷~X¸ñc§\À\‚Í™§¥¥J\Ê\"\"#\≈ÿ≤\Œ\ƒ!ã\Ô\Ó\Ì¶iº\Â≥\Õ¡\ˆ˝GI\Í1~7™∂Vp	@øî\Ÿw\Z\Ê\'çï\\à+åÃê\Œ7w,r\¬ƒ¶∑R\ƒ|\ÔdÆ;e-\‹U\ÂbDz[ït¨\√\≈^\Â•∫3ÑJe∂ù§YÑ(Çüs\‘I/Tj\€!îY!¶É5¸?z}∑qÊçá=µz|\›\∆n;bΩ\‹x˘.°knÆ˚4˝\»¡D˚≠\›+V#*3±\⁄ß\";kr\€˛Lr\⁄\‚∞,\ZïÿÆ\Ï\"¶TTæ«ãÄmz∂\Û¢\ÀvñG0∂R*-=\”\Ô60ûÕΩS\ıÆm\Ûé\Ìt\‡ö\“/\nü)è∞\”\‡ÊûÇj:r,H1¢n\Ú\Úoº⁄≤ús\\\⁄Wf?MJ\Õx˝\È\ˆÅ\ˆØiNº∂é\Ò\«væ`Lf9r*º\'±ï5\Í/:∑e8Êªµe{\÷\÷◊≥^\«\ﬂD\«PR¨\⁄$Éä\Ù	@˚g\Ú\r9\◊wú\„#˛ôN\"eµÇ\Ãwjö\ÁldAà\‘(ˇ\0~1CCN∞⁄≤iC~3\‚Aåû<}S<ù[Ω∞\Ú\’p∞ì#P£ˇ\0¿:ÿ∫\›\ÌQW?µˇ\0\Ï´\Œ◊ì˝;{Aà\Ï\Ÿ5∞ZØçˇ\0*;ròµØr∫V‘ìΩK;Mí1#º\È<\Ó0—æ\Ì-`V\∆ˇ\0ÑµÄ›ÑYq‹ã#\"æQﬂå\\»c.&˙πi™èD\◊¸6¢™K\Íú.PL\ø®&xY\€J\‘\ˆ_¯çWUªŒõ\Œfû´[	\"à#ˇ\0HÑöÇ±k\Âm+ì%@ä\‹(ø\ÒVù\\w\"H\Õ7Y\Ë\"ˇ\0\∆jä\œYI\÷yùˇ\0él±ˇ\0\ˇ\ƒ\0#\0\0\0\0\0\0\0\0\0\0 P\00@`AQÄêˇ\⁄\0?¸eç\»\Á%\VQ\Îa«ÉdOõµ\Â\›+â∏\Îã\‘D&¨¬ùD)F•Êîê\0sÜ\·\È\Û\‹F\ƒ*6!X∞ãq¿≥\«\Ÿ_ˇ\ƒ\0#\0\0\0\0\0\0\0\0\0\0\0 @0`!1PÄêˇ\⁄\0?˛œÇ{ß\…=\«4;bÅ3\€c¨†õ\ÒÕå6`Öëåc`6\¬\÷:Cê\r¿\“I˙¢{N\Â\Z\Œ«†öGä(=∞\ÿZ\Ê56¶¡\”C`£c¥\"Ö%{\„S®\‘(S\Ó\„\ßC\Ù≥ˇ\ƒ\0H\0		\0\0\0\0!1Q \"2Aaq#PRÅ3@Bbë°±¡0r\—\·$CS`sÇí¢4cÉ\≤ÒÄêìˇ\⁄\0\0?ˇ\0\ÁáCDà\ÊCÑvöeh≠gà\Õ\…\·«ú\Ò\Ÿ\˜†Zfˇ\0L-s˙Hù\∆^•Gk`7\ﬁScEç+}fπÿÑ»∞ç¶8L\Ã\Ëaæ/¿fçñì,´\Í_6oc∞VGW\˜g\È\È6\ÈñCyEê∫ò9O3]´&\Œk\»\‚ùG\Ïp=ñ\Ëëö\—2TH\ÔﬂÄ\»+[ﬁØ6^*õ\ÙÅ\‡\"˛*\ÔF0\·J%\'-\Õ\ÊåX\Ô/yŒ¨Ç\0	û)\–\Û\n\Îú\nd_\⁄\rW\Û\Ï¶Qu¢k?íkF\Û$\0¿\\éuMªJ˙Ñ\nQ.£\Ó;\Ÿ˘ \ÊZoz#®\‘38ﬁ≥˚øö$ôìUß\·ïE\’ùz\Ëúz∏⁄æ;ª$ìÇãq:ºëwtVEVÜ5à4ÇMˇ\0Çiò8Buà\Ó∑ºzº9\◊i\ÿVA˝“¶1Pcz\ƒksÏàÄhΩX˙\’kºk\\jò¿\÷(¥óu\'e\«\’?á†˘=˛∞\·y\Ó∆∞ÇΩ6XV\ˆf*èEqˇ\0qø_ßdBÄ0ÜŸûf¶∑!%ißö\n\€qR}\Í\Ô\rC§;¨m\«x\À\Ì\Áqå˚òﬂ™s\‚\Á∫\ÚMvé\ı&_\≈Z}\·NJ\È7:\·TA\‚®\Ò7Zë\‰{\"ì7\»r(c∆¢ë\·U\ÿ™¶+aìÖ\‡Ö3tv\\\Ò\ı˚W∆äd∆Ñ¯\Òw\‡2\Z7$\0)öá\Z°ø1*®\ÒwπÄû}ç\Z/qÖ\’=\Ÿ	VS≤X˚\‘\Ú\“dfaÉÜa\nT\ƒ\ÔxWR`ˇ\0xWEÜ©\\tµ¢0x´\Èº/\ıtˇ\0@∫.ù\Ò\Î\"Ïñ±V[Çïs\Óô\‘\÷˛\Ì≈ø_ØcRémóæß\Õm(>©€íª±πj∆à99]Kè\‚\ÚØ•\∆\tñΩ\"1\Ê\Úµâ?eaû˙ÜA6∏ÉŸ™ï\'ˇ\0}›åGy\‡UæW©FHè≥Ö\'ÖÆ\“\ﬁjMû\ne∂nW˝úä¢\Ì\ZKs`=ç∫>F®\\¥&6Sx†\Ì\0\÷	íßY\ﬂt6{ï\\Ÿ\ÓW\√\n\ÎM\ÒZë\ÊØa0\Œ2ΩpZ†K¢Ç\√/X≠w5ø¨\Á\Ê˝\Í\ËL\˜/6\œrπ∂aI\ﬁ@&\‰TÇ\0h?öà3Ñ~c±®ˇ\0\Ã˙UπZ*\˜\ZéÖ∑mª\–K\‡ã]à≠∆´äêqWô\÷Jˇ\0å\ˆ5˘üJ•ë®¥»´\’\œZ\≈\ﬁ\ÙA3±ªß°áÅ¥+ìU\ŒrΩ\Ú¯©\Œ\ıÄö\≈=\Ÿ6Ø¯\œcB?\Ó˝\rQù\ı_ä∫˙ç¨*ìä\÷\›\«\—uõ~aOiô\’v;\ÍòS7öèµuO\·¸\«c\›x50\Ó¬≤j∞<TõÜ\Ú¨∞]ß7C%ôÖµ#\Ìi\ÎºO%f7:r8\"¯~o\‰Ø¿\’ ∂3+\Í§;&K\„\ÿ‘û\0çl~b´\≈I∑ª%8ã	O\Ï$pVô\Ê\œ¡j:\Ïä\◊\‘w(:\«5(\¬\–\Ã+Vß¿)\rF\‰ñ¯ïeÉ\ÏF\Õ\«%b%\Ÿ¿\÷\˜\ÓùT∑\ÊZ>}çIgzá¬∑B<¬ê⁄™\‡¶vER\≈\ŸU´≥êW“â\‡Vj\Uƒ´¢øﬁãCös\ZdCêû˘+\‚π^\‚|U\¬k\Á\Ï-h\ÓwÖV]uV«äΩ\\¨øﬁúF&\·[ùﬂàOc∆á\‹ymA\Õ–ê\rRi\ÿ\’&\Íå\’\ÓXïsï\Ïí∏ÀöºiÍÖ¨}\ \Ê{\’\Ó∂ï\∆\– Æ5nS¨3sk¢∑6\⁄\˜\ﬂ\ÿƒ¥\ıœπüäæÆU›Çæ\ıpñìü)\…j\Ú+X-W≠\≈k\n\‰\‚{îÆhSm¸Uß∫A8¥\Ù\ó%u\ıáW\‰1M\‚¯áb∫$Ceç%:3ÆnnB∑U7õîò	Rq6≤j\√>%\\∆≠Ü-hcﬁµ≠5MépQ~\ÈSEttè\ÓZó-`ØSá\ÓZ\◊™\À_‹¨∞M˘+O3)\ﬂy^V’£\Ï≠X^\Ú∂∂µ°{äæ\”yÖ¨≥Vöu™umâ\Ÿ{L¡Mä6\{r=â\‰ê\’0\Îû\Ò\–5H)\'c∏¢\«\‚4f\¬AOdA2D¶+\„]\«%}\·Mû\Í\ÊnT+¸\Á\…L\ﬁjsCf\‚fX\È\Ë‹≠ƒæ\'\…H´∂jvÄâå7\\\ˆ\ÊbCu¶8L\¬4j;∫\˜ã\»\ıErjæ\Û£¨Î∏¶ŸüH*ã\n<6∏ã¡ﬁ∫∑=ü\’\ƒ\‚•ô\ÃV\€BVÑ\«\ZÑ(¶\Ì\«*Æ\⁄Vü\Ó™\À<\·¯)î\Z\—7 \‚*ì\Z\\rY¢\ˆó]\Œ˚∑(éá[:†õ\Í∑w`µ\n\Út/+1_í\“\‘8\Íì\Íû¡ìdi\Ÿn\\Süó=◊íj\‡§\›	ï&{\’\ıÀº\“+≤\‡»©\¬\Íù\√\÷7Wº0P¸l\Íª$\Ëqú⁄∫(áXa∆π˙\«\0ãúfM],Q\◊;¸TFAaq¥U™S≠\ÎpRÑ∆∞pÆst\Ù/º)∑F\”0≠¥:Sµ∞ÜÛøáß\Ótwl≥\ÍS¢\∆ußªW≤§4&W\n\Â	éq\‡µ\À!¸Sct÷•∫\ÕSX-TZ\ˆ\ÃAAåh¡t\Ï\Z\\Ò\‚*bΩ±ä/v∫Æô\„R\Í\"@ùÁäæ\‡ÆïP˙\À\'∫k´ä\«sπu–à\ÓÆm\\tm3\›[h\‘\«u\ÿ5\Á\÷¸˝4¬É(îú∑7ötH\Œ/{±&Æ\nCGÖA¨∏\Ó>ô˝ÅYÑ¿\÷\Wö∞Xz9J\È£	„¢§∂\‚\√\Ù\\Uó\"\r\Ì*$.\È®<xÑ\Z\œ6+Ö\Â7sC57b≠\«w!º°\Z#,[Ω≠\‡∞dUqWãët™\'¡Xå\€\'\ÁT\¬F\”p≠¥\“\‡ÿøäò\√\“zH\Ò\Z\∆\ÊQÖAú6~\Ûy¸4$Z¶”£mæ5åë\Ãÿ∞\Ô\∆J\Ïºöa\Ÿy3~\»JΩ∞]\‡∫˙?ã\nP\›u\≈2ëW§æcºü\ÁŸµ«ä*¶=v£y\‡)I\Ò¢\‡ﬂäá\”≥ÜM]tF≥&\Ô\˜)@Ç\Á\Òu\ÀR¯±á˝®BmWÆB\ÿ\€¿3E\∆A≠ƒ´Ç\‹35p—ΩI¢÷Äa\Î`w\ÓJp\"koa\ƒzGG}\◊B&\œKæﬂÆå⁄•É¥xn®O\Õ:\Á/dßBå\€Lrt\'^1i\ÃU\ƒ\‹\"µ÷òLè\ÿ1\\∆ôâ\ÓP\„\–\Ã \‡n524n\√d[Ω_°\nìf\Ã:s;˘W\‰\Ì:ê±˚»æ¨∏âM-9\≈Dî\Ì∂˘Œ¶±Çnqê\n»ëäv‹¨åWí\√7\rø¬©!°2Ø\√-Q\·í;\«\0≠ª¨§w≤\Â\ÈOãIÇ\—dZ/m\≈:¿ìgp–õÃ¥eææâ˚pn\\›Uáj\ƒ\…qúAº:k†•DõXní≥\Í\ \ÚãàMû0\Ê¬ÖF,6ëˇ\0í-x!\¬\‚\rM§SÆ-áü5!TX\Œ¡≥rsç\Ôqöá\‚v∏.íå\Î/√ö{\È&qK/´\ )|\‡;´πEé@\’q)\œyõúfj∂tf\r\ÍGAë˙¯¢\Á[3øíì@\0e\Èm°∞\Î?Y¸¥&v¥Õú*á=á\Í\ZØY<`\Â7∂m7pr-ô˚Wf\095[à©P\Ûëä¸Æ\◊f\ﬂåX¢pa\Ó\Ã\÷TqΩ\“9¶D+°.2∏´m0\Á\ÔB\ré-˘°>¥Oí∏U\nåﬂæ\Ô•b\Œ\ZR*FæâÁ™ç´\»\Ó\Ù∏ë¢ô1Çj$xõO5\€8\Ó–∫ª#°/y∑\ÛW\ﬁ\ˆÇ”∏©¿qÜr\ƒ-Vµ¸ä42\–TO\Â˝B\nu9ÆΩ§H¶\¬\ﬂ2ME®\ﬂ\Ê™±	•\Œ^l7õÇù\"/Éò,\r\nRR`™<]\≈\◊rÆ\…¿\◊2¶+\„†\“\„\◊3Uˇ\0è•y#©\Î\Òuw\‡4™\∆|\’\ÌDöõ\“6VÖ†¨Ω•ß\"¢B8\√w¿©™V:ú»Çm*&¯EÜÀºEA†\„πMCáM\∆ ˘eó∏\Ì;:∏UzπGâº6\ÓuvHy∫E<I\¬\‚*Ω≥*\Èyös|t-è\Z\€\ˆgU\„ÇaõM\‡˙Eòg\ıàõ<8©ö\Âø@7G§à:¶|J\ÈZ5\·¸ê†˛êk^E\–\‹\ÔíyÑK®\Òøù\¬\’a]ö\Õw|§∞\—e≤\ÌwdP¿\ÍS∂KØ<”©Qfl\Ô;‹º¶\◊n\◊¢”°\"à¨P£ü\Âß£\Ùë/q\Ÿfi\Ò£Ω\’\Ú\—&¶\“-4\Ó\‘\ÿLﬂâ\»&√Ü$\÷\’iûi◊∑á\ÿ\◊I\ÿá=\‰ßU\Í\Î\‘\‘\≈\\*\Ã\÷N\·¢X\Ÿ>?w.j\Ûj#\Ò9&\¬f\r™\€R¸8p™lgx©\ZÅ\–Æc R©-ˇ\0?E/£\—\›&A9\Ù¢zLé\Ó\Z6_éu∏\‘\0ƒ¶C4I24!\Áà©ø\Œ;iL\\V	\–‚â¥´\√s≥Aé\Î`\˜N\ÓK™~øq\ÿ\÷Q\ZÖrëW\rWj<F∞qEî a∑æqA≠\œr\Œ+∂ä∏-d\Ê8bºû.\Àuâ\Ã ÷âÄQÜ\‚m{\Í#*˝•7h4ê\·Å\ı∫;Ñ∞ãÖØEï\"\'º1æç\◊\¬ˇ\0!£e\ÿ\‘T,õ≠SAëòW)JJ\ÛQáL|ñ∂¥=\ŒW(∞£D/k[1:ÄB£¶\·PùE\e\ˆÄöµ\≈\ŒÃî!\¬l‹ª\—N.™ÂöºI[ï\Úî\ÍÉ˙MCç\’qS:clA˝\„∞A\÷zXΩ\˜˙A{:™Gxo\Êå*C,ª\Á]\ {—™,S\˜\Ô¬¢jΩ\\V!]z-xßqE\ÙMa\‹TÄ\‡A\r\ﬂX©≠\”kòSG\ÔÑ˛Æg¨AláŒ´àWï∆ÆU8\ÔnµSV∑)\÷\Z¿\\\„ÄF˝ -;t-√öêîaGl\Ú;¬±\ˆó\Á§\Ã»µ\ÔS\Õ\r		InRƒ´ëyŸ∫uDx\∆Ws@}ãJHá\› ¯ˇ\0µeI¿\‚j\ı\'{\’\ƒ\√FH¥\·Ç{-2®2∂¬Ç\“\Áª\0≠:O§_ó/Mt\ÌõO¡Qp\ı]ò\–d1\Î\"H†4∞WU,ï\Ô\"Ñ?`*¨\Óâ	^\n\Ì\"äq\‹\ÒkA∞·¥π\Ó2\0+\‰\ÍC∂\›\Ùûaõ¢\ÿ\Ïäs\"	9¶DVπÇi\»q˚\’Ef\Ê¸\Í\Êè\ÿÅTXô\Û®}å∑îT(Ω\”-+åﬁµ\„S\ŸÇ\⁄l1é¨O°Æ3˝b\È\'ƒàd∆ã\‘:[Œ´srj¥\€\∆*\Ì3UØ\˜dâ@#¶PEB˚ä˚\Õ;\—;ìë\–`FiÆ\¬ π\·G\ÓŒ∞:òz\œ¸;\n$õ/Q!D\⁄aë™¡Ÿâwäá\0z\⁄∆†\«xZæï\ cHß8\ÓP	Ô†è\ÿ\Zπ®_uC\ˆf\”\‡ü\ÿ4M9\Ô3så\ k}Xö©ê/º\Ú≠Ö√¨ãÆ\Ôßa√•4]U\‹\Ín\"\Ù◊å:1SmÆ&´ë™\Ì§\ÂH>¡\nç\˜\≈Oà˝ëyB#±¥Ôûõúphöké\€u\\Çá\˜F\‰\ı\≈L\ÔÆ\ı5!ÖP®å>\”˛ïCvNDw™5EP°©¥˛]â\Zµ\Â6\Û\“«¨n´™≥¢T^2˘™/\Û[\ÛE6\∆!øí|\Ó≥\r\˜Çw0f[©y\È\Úi^tˇ\0aZîò~&J`‹üGÑ\\Ë±.2\‹FvbçPøï\ı*ê\ﬁF†+≤Üfß\ƒ~\ÀD\‘HØ\⁄qûã\È.\Z\—Lõ\»v,@§Mv\ËãG´}\Œ\–£-\Œ->˝AQ\ŒQ\ÛE<n`≥\ˆ,à1iöò¿ﬁáaF\ ìÄLxN¢kf/\—d&m<\»(pY≤¡.\≈lvçh&˛GJ√èY\Ô\n\ÕNdC(4êN¡á\ﬂT\◊dQQ]õâRk‡ØÆA^\Â<EPè≤ã¿4|Oπ\ıSP®è[\…\“\‹\’ çoä\Ì\…\œ}\Óqô\—u!\√Vªô\Ïg\√}\ÌpëQ`?T`\√\∆\…r âSb7å\¬aõM‚ßî\n\È\Z5†ô¯oM£\”-Õà~´Ö†jÜ\Ï\ÿ\nw4\Èê¶πV\\§S§\·T/˚ΩRO∑%\Ó\…tp\‰¯˚õó5õó\Ô9öù_B\√\’\√¯ö\‡Rﬂ≥\ƒˇ\0|kÜ\¬%\⁄\Ó\Á\ÿÏ¶∞{˙\Z©Q2hoøˇ\0K\ \·Æ&\ﬂW\‰\ÒN£∂NG@á	Ér|#≥ãNa\Z9|\·dwUG˚ñ}\◊(\Ì\ˆß]òãTÇ*ìL ôÆÊ®±;\Œ%?†uÇ¸N\Ù\ZŸπ\Ó>\ı\ƒm\ 5\Ùp\œ\\ˇ\0Ä≠∞øf/y\»\'âE§ÖM¥:®z\Ó¸;!¢â±\‚E>M\ÿ¬•h\'¡ä&«â\Ë17lú\≈bc÷åz£\ÕIj˘\Ê^\√\ÙD8HåEOáæ˛yD1x\⁄\Â\ˆ-y[º®\Ô…ósØ\À#œõZè*≠\ﬁv[ötHÜn55åsÆ~\’◊º™W\›A≠&\‡a\ÛÆ\÷y\„\Ÿ:≤Ÿ∞~äó\r\‡µ\Ìxò5Y\¬3ocìô•Øië†AëBåeˇ\0*ÅÖ\≈\ZEu\√iΩ\Ô\Õ^∫\√(Q5]¡ã\Ë\Á£~[óYÀº/\Z=L79R\›˝\rMk\Z\Z\÷\ÓQ!õ\Áiˇ\0ÖB= u\ﬂ¸ó\0≠;rê¡Z}\Ó;-\ÕëL…¨S)\r\Î\Ê\∆C:©_u\nm%∫ﬂ≥i\›«≤\ﬂ≠ì\ﬂ+G9W\”\—\«\Î-\›\ﬂ\nG\Z¶ÉJ2~\Á\ÁT\Í1®\Úl}\„sëdFñ∏b\n\Ë¢uêwf’©w]q´¨Ç\¬síc\‡Ç	t•5\—≈ùõ3πj¿oç\Í\Â8\—\Z\‘\ÊP≈ô˙\ÁIºî\ÿ\‘\—&náü4\0∏)nHkF\‹\‘bEuß\Z\≈*îﬁ§l4˙ﬂïv\"∂\”2=†\ÍUΩw¨\ﬁ\˜\Á†!Ru°\Óv\ˆ†Êô¥\Ô\Ê‘¢â<`\ÒàSxµæ0´´å\2ö÷∞˛a1Ø`mì;óJj\ÈIj∂|¥gM\ \ıbè¿!4¢F\œpSOw∫£\nåmD\ﬁ\Ì¡8Ãù\Ê±H§âQ\∆ø˘ \0ê®iP#{{ˇ\0ö-x!\¬\‚\rr⁄Ñqj∑\”i\\\–xYÇã\ËrÜ˛\Ê\„¯#+K^7!õ63πº†\»,h\‹\0Ñ∑£h…∏£\näe{≥\–m\"ò%≥Ω˘ \0ê≠míáH;>h¬é\¬«ä\Ì\¬<\∆j\‹3\'[ípVj\Ó\∆nÀæÖq\ÿZ\Í\√Z	q¿)±\÷z¨\Ó\’\Õ=\≈uñ∑z≤\›X9gX\r\'rlzxõΩXYsÌûé;y;xZ˙–é\ÃAæ±ìÇõnx\⁄jùvc1ØnD+ÑF}\◊+\ÃS\ÕÀ®Ñ÷ú\˜\◊\…ë]&Ö}\–\∆\Àk†2\”\ wYH\ﬁ¸πv€°\∆hsà+•Ö7—é˛\Ô:\ƒHFN\n\”np\⁄nJY)ùâNâ\“hﬁßÑ1≤\⁄˙8\"\ÔY€ö∫8\"ˇ\0Y\€\›€•Ø\0¥\‹AF=F?\·Xâﬂñi±a\·ºdè%#Örn5ô5∏ïeóAnx\◊b\ÃO\Ó°d\—\Ò\Ì\Ú\◊\0Zn Æñ\Õ\ﬂ\·¬π\„\Ì3a¿\’d©j\0bç	\‘G3XÖY\›–õ\0ìG\«¯Ãà\–\Ê8HÇ¶Ÿö;\ˆ]\ÙØ\…‚û≠\€<\rw\’\—B=k˛∂¡Ç&\„\B/\Íwxˇ\0∫f\⁄cëÑ˚\⁄oc≥\ÙqZœà≠\—_\‡3)\—\"π\’6&\⁄{åÄVqå\Ì∑òQ.8µ\Ÿ¯1Ñû⁄õòÑÿ∞\uZæió7ÒØßé?Yx˛\—¸n˝eõ>\–\…n5t/=\\L8\–0\Îø±M§6\Ô\Ÿ4¸ˇ\0ÇM:é?ö>µó\ƒ6úw\’7ˇ\0ßf\ŸœÇ¢@n˛	 âÇ¶\œ\Ù\Ò/aÀÖlÅk;\‡ô\’n¸ˇ\0Ç\ﬂ.ë\Õ>Q\'¥\’n(˝b&\◊ó\oOu\á\˜ÂëáV√®3?¡\ˆX\–\÷\‰?˙ˇ\ƒ\0-\0\0\0\0\0!1AQaqÅ ë°±¡\P\—@\·\Ò0`Äêˇ\⁄\0\0?!ˇ\0\Ô¸\…=\’4)P3∫|\À”≤^˘˙sBR\Ëè\Û-&\ÚéÆE0\Ë£ªoJ\ÀXîMH4£C\r6¸fDE\œ_\‡T\n4&1ò\Íü\ÎµK\\˙µ˛L_ó.˝2•j\ˆû\◊\“\∆7v≠ñ≠G\Ú\ﬂ\'øø_\≈Õ£ô†Uö\'PU\‡\\û\⁄Q≠\\Üºêµ¡K*Dn5\"\Áõ˚\Ûˇ\0i\0n\„Z\Ãk˙8¨\Ÿ`\Ë\‡\€èu´¡:–≥î]\ËL¶huô—êly˛+Ö`–∂;æ\‘˘Ã®d\‡!Q\r0µ\Ó§RXò8\√l\œ\Ÿ¬á\Í\»Hü\ƒûA\Â\ƒ˙èfdâUªÖ†p\›EäÅ∫\ÿ\¬r\Z?üZÅç\Z\„[\„ø\‚I\ÿU“êKf66=*I\À\÷~∏\Ì6fn|\‚±<’π\∆\Â\»6O\·u\ÃO#\Í:\‰\ﬂQnõ\‡¡PÆÑaóÅ\Ë\”@∏îõ>\œ\‚-D\ﬁg\È8^ô≥\ÿ\∆(Yïë”∂∏Zèœ∏gk\Í\ﬂ¡ü\—\„\Ã˙Êíä\ \Ê\‡†\Î@vßLiç‘û∏ã]\È!Ü¢∞O\ƒ;\Ëé¡\ÁA\0Õ°?\"§já45ù\'QH\0	µK¶sçk@[\ÎM¶:Æ|W7^\„\€˛\Ò/ô-\‹ëCP\\e\Û≤t≠Qy*o£æµe\ÔÅN\–\ËsÜ\⁄,;\‘\∆\ƒ^X˚˛\"˝»â\ÿz±>\◊\¬L\…(H≥† gõ¯äü.\‘jQ7åWkL¿hkê\Ï\·ˇ\0≠\˜\ƒ\Û\«Zr/fûêxZlQMÕ£\ EdrK∞Ä:ã∑˚Ñ\Ú\œd\ı¸7˘¡J¨π\‘ˇ\0\Î\Ê<}Ω3f¢N’êë⁄ñ\÷w¯ß\r\Ô(îÇ\0û\‰⁄≥\'\”\˜W§`hI\·\¨ØZBVF∫˛\ÍK?ß\Õç9ñ\›\È°\‚ï9XV^úV¨=\Ù ∂°\0d[	›ß\√\Áç¯g8D\ÛÉ\Á\r¡\ˆ\ÃzêäH¢<\ËîA\Œt\≈§xØX\ÙØv\√ﬁΩ\Õ\ \ı¡4◊ö3ˇ\0\ÙÄ∞\Óiæt\÷\ZçE∂goQ\◊	ˇ\0±b~\ıbø\∆u/Æ3±ù\˜ô˝T\Ë\ÊÕönÉ	\√4\‰t\Âpb\‘Qj§EHûˇ\0\ÛuÃ®´µ}˙âCïH1Pˇ\0D\Ô\\–\Óõ\≈\nB]\ÈVéYªTi\Îg¿\≈2E\Ë\⁄?t%óm9\≈\€_ßoj\Ã˝){\—<†\≈}ôäb\Â\’\Ï\"ï\›\ÈGâØHJ~É\Î$R\÷L{i\\¸ç}dªT#ë\»\…\Cãµ3ç\ﬁ\’{\ÌY	Y\˜¸>\À}]ÑœÑ\ı¿Iù*ba…°\Œ\0Yûá\{\–6w†2}\0\√0\ \' \‘)\ﬂ8\ÚC4\„Ø\·¸1Ω\ıv[≥\0£aM*\\\Œ8¨ã\ÈVÉ§\“@ã\‚\¸è\·\…4\\\ÍbÇYö ê\Ï5õ\Ó(\—u©¨R#3\◊5\À\˛\ZM±0†\ÿ\€˝\√FM\»:–Ö\ cæ\·ñE!πó Ä?àS\—4\Ãz=:\‡/å#\0C¨\”\“\·\’\ﬂ\„	è\·ë\ÙÜì\Á	[3>¯ö97ΩXìöd¿\ˆh,a\Î\„X\ÓßVçg\ıYíx≠`ÿª\\Öj¡\„Yç(%\Ÿ\˜ïv§\·kf3èDª\·6\Õ\ÛO\√Au\Ú\‡YµP:\ÎÜZsHpKê©%¶¥B\Zà\Òr3Yçg3\Í6ß}\ÃPPçµo:î>NE3\—\ ,L\Ú\Ã˛™uyK˘–ãF{å\Û\◊“ÑrO´íEó\œE*\Zµ+>\⁄q÷ÖgL ⁄èo\Ì¯mi@\Î,ds/\Ó©æ íUe©ò	´qπ\œ7ÜGL\Zíë‰≠ükYF\ÌY\Ë\◊\»M¥ã6nD∑\Z\ˆÇ«µz\›Q€ùm≠)3¯ZÉÖ\Ÿv\Ëp\Ê:(9(d£≠):>[˙\∆M2Ä\·õ\◊˘â1Étâ∂\’3|IÑR≤7\–Tü\'∂\Zqù]za_ÿî\Ã\ı:Nº∂¶\’nxﬂÑi6¯†Y\Ô\’\"√°FµNö\Ú´\0oæ(dú∫\—@\ÿd“¥JeµM¿\'lRã§<\„\˜\Â˝üÜ+Á≥Øg\Íë´ö\ÎÑ\"\‰g∏ç\Õg\’˘Q∞CèÇπä\ÓGùV÷ê°^>Dªò\¬x≠c≤•°këïÕ≠GY\‡uxêHI++íóã~∏€ôñqíÕé\Ík\Ú\Û¸)?I\Z+ò≥z.\ZoS(pZí∏3°Ø›ä\–>´_a≠Z\È\n≤‰í∫\Ù%	˙÷£*íç ñ\¬\…\ÎWe-ú™	\0Ä#Ω~¡O\œM≠C\0¶à+\≈#\né\Ùµ3~\≈øv)í\0j’Ñ\\Oö˝\ı.ü©Fø©Ç+Ñü¶U	p\»U°É3)¿œôãyö%CH>ÉO\¬LÃ¥4t\Ë{¯\nJ7páΩ\ˆØ5\ı \‰\ÊP°ßáë\‘1Dü(˘±\œU˙µ@Äï$Ü?\ﬁ\ZÄABõ\˜ù2U.Æ\Zîëjî¶\√C\¬WJ4e\˜≠ç+2wmÄQ.«Ä16K\Ã\ÍQxÄ\Zè\‡º\≈$æ_∫c*˚\›\„,f\≈íî\nFî¡\'8¥aî\ C&˛U&∑\÷∫óvp˚ü∫ô´•8åúH∫0ù∞[—Å≥f\Ì\ÎAÈÄ§§<îàíπ≠-&@iA\¬CÄ∂\\ÜZåw;øñuØ∞á\ÕZ\ÎTΩx\¬:(d&\Ù\…fµô≠ªàz\€3¶ßªåGtï\˛\⁄\˜{\“E\rAp\Ÿ6¢\‰\0dÄ§f…∫ô\ Wú~˘,¸`ï?Z\Ã$jF^˚\…Y™y_T¡ñ£©pé∞Øt~\Ò…¶\’I\ÈZ	`¢)Æç∫\Ô[ 3K\Îµ\'•y≥\ˆÆé\·âôÑ\ÁG\˜\‡¥\˜˘\‘‹üI\r Ω\ÍM±Àπt\Ûy\€\À˘˙q3æÖ!\˜J`≤∂¥Do^ñ\“c\—\›&(A;eóß\Óù\Ï\Óú\…\ŒCJÇ®Fµ|≠k\0gQ>p\'*<π}<`\Ì†∏îr0X?4¶\≈]†\råf\'w\ı˝`i\‘\Ó.j\ÛS$:‘Ü\÷a\ı\ cû(˘\‡\ÂOw7Õå¥Ü∂	\Ã\\ﬂµŸÄ£&tp ∫y_©\Î¸÷∂\“\ˆ¶\ÍSÇX2¥$`<\‘\√!ëÇ\—HVé.s{¥d\„C3(\ÈC\ŒZMïB>»≠<\‘\«J∂iúµ´¢\⁄\Zì!N$¥i\’özaëN[ÖLá7´èæJ—ã\ÂV^\Ë⁄≠)≥u\‡£lM2\Ô≠ÖK–ç£_\›\–\…?öÑÉ¡ü∂î\Â:.úå	º%[òüàπõ`0\…P,üo\ﬂ\œz AW˘+\ƒ\ıs\ÈΩT\ŸV\È}=))UWW6õï	\·ÜB\⁄0$\” fV\¬\n\Ê∂iÇ\—f \ˆê\ÒL[±˝©˚G/·†êp\◊‡ø∫u\ıµ•9ÉIüI	`\Ï\Ÿ@\Í\Ë‹á*ì\‹n|xfåõ\Ë¥G\"Åä\\-X\’héh»Æájê\‡^îyxöV¡\‘{\’\Íz\"b~vmI4 ZóÇJ⁄†ãõ\ÒÇ\‹Àù\0\0@x%AFû\·ï9\Ìã\›Jﬂ©ßJä&c\⁄˛Fj%\ÛOeê\‰p\”\€\√?!´£°øÅG&¨\Z\ÔÅ—π/\œjê9\r\0\0B}÷§g\ˆª\Áçã˝ä@∞vrâ®\Òø±⁄•¢h\‹s(Å%#πÄNsm\Ë)&û~F^\‹N\Í/\÷^t¯›è0v†*∫\Ù\—˘F)0|\ÊU°\·q\›v\ÈP§ª>)¥\0£WL9\Õ\˜ºOM\Í\‡GÑ©v∫\Õ0\≈\Ÿn?∑\Ú•ûi[:iTå°à+-X#Åùˇ\0P¶\Œhu∫˝£µn=äNŸî3~©Eæäa\Ë˛©\“`Kf\Ÿ⁄ö|Å!•≠\ÎC¸jnoP>Z\À\—*D\ÊY¿U\ˆ8º\ÛL=\ı¿\Ó.\Î\’√ä\0\0Üî†ÆEd\"ßbjD\€\\´Wqlπm˘†ÕÉL¡\“*\Œ\Úqt\ı†V\Ë8Y\À\À˚≠3Ã¶§\»vŒñÇ	∫\·+ò\ÿ\È\·îo*è∞¯M≤¿<õ4.—Ä@/Å§\–\‰w}±\0J\–g\œN¶\’Øó¨`-ÇVAâk3\ˆQπt28w•\¬--;”ùê`ûZ@Ñ\‰AµOÆCyè\≈{ñ*v0\Ûª{t©ëñZf=ajåXQ\Ó\ﬂ–§∞©\ZÇ4ê\‹\Í\n\”q.;T\ﬂ\ƒ_õ±MB∂\È\Áö…å/µè\—\Ú¿\Êê\Ùm\‚\Úr\ÌH±\‡\·Bß∫¯\Ô¸π\⁄˝R;òçç\∆6Ü\ÏJr*DÔ©∂7\„\‚1IfÆm\…\ÙZÜùñò-%gº¬íów\È˛îïèß\Ôº\ÚÑ•cIQ\÷ÆIÅ\Á$ç\Â\’˝FmÇΩŒîs˚\‘-AM‹õ\‘%}≥UøÇåﬁ≠\nJ\€T\¬\ÂﬁãqóV†ÜXt¨zc∂:\„8@≠7\ÃbP\È…††êò\\´ëw]ªø à\Õ\ƒyΩ˙c‹ì\‡\ÊT%H£Yò£˙V≥p\\#5\ZD+ò\√S´2q˝ÉG%7¿\◊Œ¶6\‡`M\œ\÷y{Xhaíç¶\˜+°\ﬁ\0í\Í©=€ö\0\ÃxÆM#5˙\¬ˇ\0ñÊÅ†\˜ßfÉ≤˚\‘f\¬E\ «´@¨\’\“\ËπRlç\rfæ\0RRÀü¯~\€z\Ó\ÍgC∞†2G˘øv\ÊëV\Í\ÎåQ\M≤%\\Î\Z\…\Ú™U◊ùz—â\rB9f;S\”9∞6û3øá)\Zâ›≠\Ïqå\…f\\\∆aÆF9°nZÃ°V3\·éP©êœõ1Q\0w∏[\Ù\Á\ SP÷§,KO3©\Ì\·\ÿ	á¿MpiQ\”vw5˚\È¸uí&\Ô\ı\ÕK\ﬁv\ré1\\Æ\\Ú[l\…\◊Jor\"\ı\nã`ÇíHn5d5S¶ànπ¨\…2\6jh¿d·óØΩleî#ê\·ë\‰ ≤\¬\r\⁄Õªò\Ï1ÜdYm<ˇ\0J∏\˜\ \Ë˝Qkk\Õﬁõ\ÁZ∫;∏	è\”\Œ\€\“0B0òsy\‡=\∆X°\"â•Ytnsπ\ﬂ¯∫Éñ\Â\’\ÌKˇ\08B:FûTå5fº1odAÄá)Aëñ¥ù\˜zâCq|t0\0\ŒTnW©êé\Ù§e\ﬂH\÷\\[\ı(\‰f´\˜\€*\˜SΩecY&;\—\Èî∏)=0ó›µic∑qïﬁÜm°≥ù\È∑‹©±?Uj\Èè\\'õMGw⁄ß\ﬁ\r=\Œj\Ë/G≠!@B$BzøxL\›Så`∫»©˘/Å-¨¢£ab\Èœí\ﬂ\≈\“Èñª\‘S—º°ØjH≥\‡ç5π;\·\Î,!âr}ø∏\¬\Z\’\√Gz,ÜEäûÅ\÷z8J\Õ\…\’nU¥ë∂[æ\Õ%\nÑ÷äè≥i}\Û\¬\r\Â\Î\“8Kµ Ñ\≈\‹sá®™”≥ï∞fê?\Á)•d\ﬁG-OlØC‹í≥Á∫§r(ë3CÜ\ÿB1\˜èú \⁄`π¨ädíæ\0õ¿=\–aBa\‡\»˛@á6+tæiH[\r\«SBPápÆ&[Yk’¢Cïwf\ÿgz˛˛∑(UZjàYÆy´ntu°XQ%\óÿ±J\Òº\‡\Áù>9\»¡\ ‡®ÜÉDC\\\»›£\»>j25ùV\ÎÑAqZ\0\ÈWL\˜8K\Ôv	•\Ì˝N	ôz¥lBi\ˆ6≈áúU£H\Õ\Ã˘2¢bß\Ú°¶\”\Õ\‹j&Áà±¯x\≈.%\ n\ﬂ‹âOÆ\"≠‹Ω\’7Ä\ráïú(x;\Ó\‘Zä\nî/T”Æï/ √©c\’*\0dX\¬z\Ì„¥ïÕÑ\‡ß\\\Ã\Ë>i2Yó*¡∞òJÄ©ë—•fà¨¶8-\œ(ﬁò<\Ù^H\„*\ÕMæ\ÿiò\œæ\–.\'\ \Úp˛n˚O™\‹\Êái\Ã∑º\Œù£.\0Ör+Ü< \ÂÖ\…A\”*By<É˚J|\◊f[å]\Ê≠;¢åOrØ[e\ÊO\È\«D$î∂ö\" µõû,á≥\Ì\‡\ﬁ\Ùk)á£\{ˇ\0>nW\“\Z[Æ#D\∆q.˚\Ú=\È\‹RAA\»N\ÒBl)Hπµ\Í]Y{E@qz∞\Ó°èûÜ†\‹kµW\⁄	}\'>òs\¬\ﬂ\ÒH§\–7•\’óW\—ˇ\0<Zluu\Í˚~`dN<±\"6˚\Ù´\€\n©LY	\ÂHfCí•~3å2.b#µæ+ÿ´\‘\‘/\Û\„3—©j\È\÷g\Í\Ìn:ùbïüI`U∏Yb•ô7;ø4!pwﬂ£O@πs\Ïw-ªΩ¶ãe¯\⁄˝\Ò\ÕPﬁ±Ñ[˝_Æ\Ù\ÌsvLæ\ÒÖ\Ÿ.˛ùªV¯°\Û\œöK(2\ÌIûêµ\…\◊@⁄Ñu>1!\≈3V\„`:3÷¢zØW¸¨\œ>$r)-e¨\‘\\wt<\‚¶X\r∫\“ ⁄ó]>\ÛSf\Ám˝˚cf\ÿ9<Ωˇ\0î∑\ÿ\Â\Ê{`ÜCÅ\Ÿ(\Û\Ú\Œ\“Lz\·í\œR\…\Û£zY4‘°$\’G&∫\‚f-´(\ÍE\\èÿµ	\r\À÷ãS¡∑¶&MÆC\…<güä\ÏTÕü85ß\Ëk®g\Í‘º≥\Ã?TJ\ÚØj)bH\‰)ek[4\¬à\›\Ú¡\œ\ \ZÑ\Ÿ^\…\ı\¬\Â\Ïs˝w†Ç¡\√2\Ú=\œ\◊zmÑ\Œ+/C\…~XjªUãF\ﬁ/5\€Á¢¶HRá‚¶Æc°˝\≈DOA\…\÷\ﬁTl…®\ÕHKlâÚ®Ñæ÷ïê\Ôˇ\0MAMvó\‰\‘h;ä\Zù\È\ˆäílóeœöS\“‘Ö∞£\Í≠p\‡\√±’´)¡ÉïU´öq\∆c\˜pWü∑\·l\ÎY˙œá!ùãgÃ•)›≠–ã‡´òá*?∫ªªjâr^\ı\ #\—OÀ®a≤\Ô™\·>\√$ñ{QJLΩF6>´\Û]A?Zèh]ßlU–´\0Giæ†\”√Ç>ôl|˘xH\Ÿ/Y¨•Y\Ì¯[\‚{D˙«Øä;U9\–¸c!l\‡3G\ÚÉ“∑\√J˙m©√É^∆æˇ\0çy\ıv®\∆˙C298ëZ∑Ø¡G]ÀÑ\Ô˝K|TW¸Ö}æ\ﬂj\»Xæ´?ªP\0 ©ü\Â≤ln\ËS?p<?\—\ƒ^\”\È¯`.\\∏k9ü-\Õ,ê3ûy∞w¶,®GL\'Ω\ÛÇÄ¿d0ô4\n\Á\n\Ãgúˇ\0\√⁄Æ9N?jÅ&â\Îá˚≠ÉA	\ÃU(D\ÎSÄ∫\ÈS\È™q\È\‚*n≥\≈LBL∞BMüup≤\Ú[\‚ö&\ﬂ3˝T»É\Zˇ\0J≤®\ro\Í\˜¿c\Ë˙N9\‚K\«\÷ﬂºm\·¥@\…\Ô\Ï\«\‹h≠;~\ˆ\’”è,&R\Âw->∞3øæ0WÖ\Ô#æ\ƒiNzZÇê\ÍTùy”ó\Íîl\ó\Ï\€l$üI|)\"\·—ø\Œ/ù§K©WBÚÜ¢âVàm≈´L\˜\0ñ\n\…2C\÷+˝\√Y¢@	ìáJ$ ¡™j:Pù\«6úæ\Zp–°ßùâ8K\Î-BXÖ°?\ÓtWn\Á\Á\Ò<°\ˆ\Ôÿöãx~è\Ó≠[ÇÆöõâX:\ˆè\ﬁ9π≈®lC¨?µ*EBf8Ho¿?cD\Áå\’\Ôˇ\0\»˘^¡A9K©ãÃπ°Sà\Ê∞VØ¢\ÿn?U5+Ép’ß\ƒ6˛˚\Î\ÚJmÅö\–2◊£∑\‚r¥•u\Â\≈\Òçqè\Î¢%´}û\ZNÄÃá,âJBY\”˚T\‰\ÓRß	YÆ\\\Î\"R∆ö Ñ“è\ÿzª\—sﬁä]Öˇ\0™Eí|)\Â\¬\ﬁySHπ\Ó˛©±ä\‘\"{î\È∑\À\À4Æ™L2äñx©tïë\Z%ø\ÙØLj\råríÆü\Ï}∞ô\Ù˙î\Ê!Lõ˘\€\Ò`¿\09#\ﬂRÉq\‰u⁄ëÅë\”D\…4†ç\‰6]\\\ÛÇ†d\÷\Ò^G\ˆ\“nx%\0=¢˘\‹Q\„\0ìôp>e\Í\˜=\"9≠@ãëz∏µ\ﬂ\˜\–\0\’\”[Ω≥©C\»}≥ÊòïR≠÷ìW=≥¯é(ì\0Ä4*\ÿ¿_ôr\”h\‘8\ÊXH≥\Ó˝N(Hàπ3\Ò˘\ˆ-\œ\÷}M\"\"h\„/ú\œ\ÿP\”$â\"S#:•\„ZO}•\ W±Ω\ˆ\ÿGÜ≤∏y5\ã\ˆ¨¸0M\Ëê§c:\À{©}\Í`∑\È§E*\Í\—}z}∆ßx\ÚE˛\r˘†EëJßß\"£\'7\ˆ¥–ù*J\‚í\’w5A,(\0±˘MjñQ˙Q>¨#ég:\Ôπ\ÕCe£π\√V-)\«˘\Ù£<∏‘ß\Ã\À\“˙:Uªj¯@V\Ë*\·\ı∂\˜\ÈZu®©~\ﬂZâjQ∞B\Â`*J2≤^ùè\Î\Áã<ﬂ©°,(\0±˘dM∏˛’•(M\Õ\ÃOuGö\'™n•^ó*%Z\‹¿\¬!∫øµæO#Æ6°†%iá£x\Û\˜•Zå\Ï©VπUuI\'6\⁄˘8®E@	Z8æj\\\Âπ\„\Û7å¨˛\ZÄô\÷\‡\ÏÒèΩÆ5ó\r\—\Á•1ç)@ô8uJ¶oÏöì∞|\⁄\◊\Êoå˛\÷Wøcq÷•≤◊πr\ÛäN\ÚÅ∫\ËTH)p∑\Û˘±ä—™¶íïµq˝±\˜n\ﬁ\Z\€z\‹~™A\ÁBlä/óÄ@iû\Z\" ™Bû\‹\Â\ÁqÖ\◊#ü\’ªf\Ês˙¸\ËΩX	ûÉ\‹\Õ[<s\ı\¬\ﬂ\Êz\Õ;w\€QmY6¥ù˛\Z.aöπ;QΩ›° \\&U4[\Ób\ÛX~¯¨˝Qu{º˛|}¨âK\rn™\›\∆\Œ9\Îg«øZ\'ê§ΩF\Àm+v>ò\€\ÒY\Ú\ˆºÆòã0n˘QØ\ƒ:Ω\ﬁ\:ÄIW˙\›.\\\„t\\˘]Q ó\rYûw\\uóóCª\≈\Ú\Êô\Ó?¯8Ω(Oìö⁄Ö~\Ïs∞wü;\‘EΩ\"¶¯•pC\√Väàº\ﬂv8?\æg\Îﬁ©¯OìåXyçÕ©díûé‘†KH£\Œ\‰¿\nÅvÄ\ˆ!\Ú∫\Ô\Âˇ\0áÄ@n˙:SAÑt\√^\∆o≠\Ú≠y~∑\«,\Î\»~\Ìˇ\0â\Ù\Â˚\Ô\ÁÄ\√%:|\“\¬¢é\„mA@˛$K\n,ïU°ˇ\01ëg†\’jA}KUˇ\0≈ôi§*\Ÿ\‚y\Ÿ\È@¨hr+>ã\˜ˇ\0\∆\Êéd\ıN¶es\Ô^Cﬂß˛<(ÜAˇ\0\‡ˇ\⁄\0\0\0\0\0\0\Û\œ<\\œ,\Û\Àí\≈<≥G\Û\œ<\Ò\œ,\Û\œ<\Û\œ<\Û\œ<\Û\œ<\Û\œ<\Û\œ<\Û\œ<\Û\œ<\Û\œ<\Û\œ<\Û\œ<\Û\œ<\Û\œ<\Û\œ<\Û\œ<\Û\œ<\Û\œ<\Û\œ<\Û\œ<\Û\œ<\Û\œ<\Û\œ<\Û\œ<\√0\√\”\Û0\√\r0√å\‚,cÅL0\√\r0\02å(Ä\0M\¬¿\0@¡3\… \0\0\√\nÅ<\\ÀpA,\Òáq\À\0!\√\Û\œ8\ÚÉ<#G<\Û\œ<\Ú\œ<\Û\œ<\Û\œ<\ÛÅ\„Ö<\Û\œ<\Û\Œ,\‚\0\√O<\Û\œ<\Û\œ<\Û\œ<\Û\œ<\Hë<∞\Ã<¡\œ<\Û\¬\œ<\ÛO<\Û\œ<\„L8\Û\Œ8\ÛJ\ÒO8\”\œ0S8\ÛÉ Så0\”4√é0\„\n0\ÛD8ì\«8C\œ4≥\«,0\√s\ƒbè$cK,\Û\œ<\Û\œ(r\∆,\Ò¡<±O\0\0Ç0Ç3#\«<\Û\œ<\Ú\œ<\Û\œ<\Û\œ<\ÛO4\Ò$SG≤å\„Å\Û\œ<\Û\œ<\Û\œ<\Û\œs\«<\Ò\ \0¡F\0¿\Õ<\Ú\≈0BHS\œ\è±\√\”N<\√\Ã4≥\ \—\√±É\‚ä\Ò¿b\Ã0\”4\„ç0¢\03àìÄ \”ÕÇ\œ\˜ ìˇ\0º;\Ã¡\œ@\«\·<\Û\œ<\ä,\¬C\Ë+ä®[,\ÚS∫{Æ¯\¬\Û\œ<\Û\œ<\Û\œ<\ÚÖ<2Dm\Á\…\‡ü¸¸R-ø-l\0A±\œ<\Û\œ<\Û\œ<\Û\œì\√\–X*Eõ)§l>\'1\Õ<\Û\œ<\Û\œ<\ÛO4\Û\«8\0I\ÒI	»ód@ó\r\»-!Ä\Û\Ã<\Ûç<\‚ä \–\œ01O4i$QQ%•»®!Dr¥\ÚA0\N0\é<\Û\œ<≥OH-	;9TaíÉ\Ú\Áù{\¬\Û\«<\Û\œ\Û\œ<\Û\À4#\∆Gµe^èÜMOÆ§©AzI<q\œ<\Û\œ<\0K<\"B,”éΩ∑\€N÷ØM5n~3\“MC8\0@\0@@S\Õ±\»(”µóR\ÕlQF®ABZ,\É<£¡\Ú\Œ<\Û\Œ<\‚\Õ89uz¡ëY\≈¶±M0\Ûå<\„<\Û\œ8\Ûã<\Û\œ,\’Â•ô\Ã<\√\«\”{\Ô\÷\Ú\«<\Û\œ<\Û\œ<√å8\„\Œ0\<\Á\·Ä\·K8√π\n\‰<rM0\”N4\”0C¿$1N4¿ì•ÉΩm<\‚Ö:;\Á∞0B\03ã(≥B<\Ú\ 8ì\∆:›∑ôüík\…1ãê\œ,\<\Ú\√,s<±\¬ë+π\Â¸≠™ù\‚ã8\”\≈4\Ò\¬(\Ú\œ<\Û\œ<\Û\œ<\Û\œ<\Û\œ<%m¯s\œ<\Û\œ<\Û\œ<\Û\œ<\√\œ8\ÛL8√ç8\Û\r4\”˙†_\0\”0\„å8\”<\√0s\…@3\≈M\Õ/ô\Œ É\ \0\ÀB L0pâ,\ÛN8\ÛM<\ÛEq	\\r\Û\œ4\‡É(s\Ã4¿á<\Û\œ<\ÛO<\Û\œ<\Û\œ<\Û\∆<≥\œ<\ÛO8\Û\œ<\Û\œ<\Û\œ<\Û\œ<\Û\œ<\Û\œ<\Û\œ<\Û\œs\œ<\Û\œ,\Û\œ<\Û\œ<\Û\œ<\Û\œ<\Û\œ<\Û\œ<\Û\œ<\Û\œ<\Û\œ<\Û\œ<\Û\œ<\Û\œ<\Û\œ<\Û\œ<\Û\œ<\Û\œ<\Û\œ<\Û\œ<\Û\œ<\Û\œ<\Û\œ<\Û\œ<\Û\œ<\“\œ<\ÒO8\ÚN,ì\≈<≥è,≤\√<\Û\À,\Û\œs\À,\Û\œ<\Û\œ<\Û\œ<\Ò\œ<Å\œ<\Û\» \Û\œ<\Û\œ<\Û\œ<\Û\«<\Û\œ<ˇ\ƒ\0#\0\0\0\0\0\0\0\0\0\0 !1@APQ0Äê±\ˇ\⁄\0?¸Jï+@Jï*ªïÄcôZ5ÇvÜs-Åë∫[[o/|<\‡\¬¡Ç\Ó≠∑ñ\¬¸\≈\Ìé\—.0\ÓüâlMØõ˘Éäﬁ†T∏•Q\…\Â˛˝\ƒ(´Wn EÆ\Ú•CC*WuP~u∫VV›Ç\‡§\≈\Ëº\\m	q\Î–ïäÅZ*VyÅä\Ô\ZùoPã/C\ÙH\Ô∞\‡√Ö\Ôã0ª\Œ\„B\˜gåú=ë\«2¸:\œhÅX^\ÿ\·<¡¶&Ä¿yó∫8Iu.yñKÜ\ﬂJ∏ïÄπUÖ\Ù#QÜ/£\Z–æîpæû\ˆ˚ˇ\ƒ\0!\0\0\0\0\0\0\0\0 !1@AQP0Äêˇ\⁄\0?ˇ\0áÀæpoB‘∫¿m\Ó-F.\Ú:|q.∞\Ì%\√iDdRû>\ƒ\€0µÅ¥Q±rà◊êv\≈1T\—\Ï)º|\‚&\Ú\Í^\◊\·]/êƒ®†\'\¬Ω\Œ\Z\√vÇ0∑èæ\›\Ô\Êã\—z\Â\Ô}í\ÌX\ZàbW\Ò\Ã\\\rN]e\ﬂ@\‘[áo≤\Îx\‘k8\Í<@ï†\÷\Â.\…√¨=\–a[bú\◊9Gù\ﬁ·âßñFª#L≠\Ï\÷\Â71m¿\˜∂òU¥E\˜Chº¿_u¿ß2ÜZoR“ë¯¿w\“\‚A®7Ö®´Ä¸∏\‚\‹+\\“\Ù\≈\‡~=o_\‡_ˇ\ƒ\0*\0\0\0\0\0!1ëAQaqÅ °±¡\—\·\0\Ò@Pˇ\⁄\0\0?\Á\\Îˇ\0s¯\Û\‡|9\Æ=!+ã+Å¬∏sˇ\0\Ï~=c¿û¯?¸Uˇ\02˝\Áˇ\0^\ﬂ˝xˇ\0\Ú\Ô˛>¯\ﬂ¸\Ó{\„r\Â\À\·\·\Ôˇ\0öˇ\0\Ìs\‹\˜=\œs\‹\˜=\œs\‹\˜=\œs\‹\˜=\œs\‹\˜=\œs\‹\˜=\œs\‹\˜=\œs\‹\˜=\œs\‹\˜=\œs\‹\˜=\œs\‹\˜=\œs\‹\˜=\œs\‹\˜=\œs\‹\˜=\œs\‹\˜=\œs\‹\˜=\œs\‹\˜=\œs\‹\˜=\œs\‹\˜=\œs\‹\˜7õ\Õ\Ê\Ûyº\ﬁo7õ\Õ\Ê\Ûyº\ﬁo7õ\Õ\Ê\Ûyº\ﬁo7õ\Õ\Ê\Ûyº\ﬁo7õ\Õ\Ê\Ûyº\ﬁo7õ\Õ\Ê\Ûyº\ﬁo7õ\Õ\Ê\Ûyº\ﬁo7õ\Õ\Ê\Ûyº\ﬁo7õ\Õ\Ê\Ûyº\ﬁo7õ\Õ\Ê\Ûyº\ﬁo7õ\Õ\Ê\Ûyº\ﬁo7õ\Õ\Ê\Û~\Õ\Ê\Ûyø\r\‡\–h(ó¨ñ\‹‚±ø\«\ÌUº¨\0∞ót\ˆ5^Å\ﬁL)Cí&§\ﬁo7õ\Õ\Ê\Ûyº\ﬁo7õ\Õ\Ê\Ûyº\ﬁo7õ\\ﬁo7õ\\ﬁ5†6•\œB\ﬂf.À†=¡\Ù\ˆñÜ\’§a≤yá\\\\\—u\Óhúío7õ\Õ\Ê¸7õ\Ò\ﬁo7õ\Õ\Ê\Ûyº\ﬁo7õˇ\0\’¯\◊¡Ü≈££\Ì/\‰L¡ZõkGV¥àç<∏X^Rûæén\Ù|\ \÷\÷\Õaó@\Î\—\Ísˇ\0ô\ÒØó.+n&†π˛pîäj¯~ú\ˆM\Ò¿\ﬂU\ÂzGZàs\À~G)˘\ÕQˇ\0ç\«\◊\\=OSü_[\…H-v%ø€ßèYØuy\¬\Áa\«&\€W\‹yÆud\Ì\ÓR\Ÿ\œK˘ïN`\≈x4q¨¶QVz\Î\Œ†#ÑgÆ>ß©\Î\ÁÎÜø2)\›E¶\Z\Û\Ì\œZ)Q\Â`t4 \«@d\Ûx\Î}\ZW]\Î\ƒ\0Å®öj{\Ã:ñKk\‰b§0>@¥9fπ|˝NQûßØáÆ/_ø\n\‡|9¸ñâ\’\»˛\ÛG,{j\r¿√†V%B`\˜úø30¿9\Á/>˝ˇ\0¡î\‡#ÀÇ˘\·w\‡˝öçNbT\Z,àöêá?\8rú∏£üØSØ\‘\È\Âöó\‰uWõùx[ô±\‰\ˆ\Ì\Œ\0\0\0(4¢TØj\œS\≈\ÓÅ}\ƒ’∂ú\ÊWsó\œ_É«üÀü˛æ>¶ü\¬\Á(Wic¶G`◊ÄΩ\÷V´rl_I\ŒfQ∆ØC\À\ı¿\Å\…¸ü\Ó\\q\’\Z…æ\Êøaõó€í≤#\Ão\„2_∆Æ|:\Õ~œ§ïUxj\—\ËFø\„\Ú\‚zà\ZãD\n•ì\Õ\ﬂ33%èGÊ∑â}¢â¢2\„\–Ëºã\Ïü\Ùx\ﬂ\∆\Âx\„\\=p©\\kÖJ\Ò=p©\Í=4‘π¢øH\Úú17\Î!\˜{Õ¶“ãM¶:ç\Ôôt ]¨Nx\rbws?|[ß}ç\Ã\ÚK\ÌùäLO\\*zï*zûææ\n\Ê}c\Ï49°ïh⁄Ωxk\Ê≤\Ù9∞wßA˛\Á;\Í•\nEU(ògö\ƒ\⁄m	)æ\\é\Ù\ƒ`DiòQ)¿îGíﬁô\Íz\·\ÎÖOS\◊S\‘\ı\«\‘\ı∆ºM¶\”i¥\⁄m6õM¶\”i¥\⁄m6õM¶\”h\˜ª\»t]ÅMP´)O$\Î@/¥πzªÜ†\„√ôEÜ\È~£πU¥∑}ΩE9r˘ÉØü\‘@íty\Î\rnJá.\›\"#Nã^T\Û\0\÷\Ù2uL\Ì6õM¶\”i¥\⁄m6õM¶\”hùFRﬁåáx\Ú\—\Œ\∆~7≠YWâ”ã\Ú‹ΩF\⁄<u¸DJ[WC°\÷0\„\Zjr\‹+~à+6°]M≥i@ï\Î\Ÿct\ı0\Í≤\ËdüΩM¶\”i¥\⁄m6õM¶\”i¥\⁄m6õM¶\”i¥π¥πsir\Ê\”i¥\⁄m.m6õM•Àè\Â°%§_nQ˝Ä\˜=¿\◊h|$qÄ•\‰c$XH?π¥6•É©\È˝L^ﬁ´G\…(ìvµ\”\œ\ÔãL˚®Mà\ıÅ∞∑êy»ú≠π¥π¥π¥\⁄m6õM•¿f\”sZ™h;≤∫KQ±ª+µ\Ê´œâWù&®Z\ÍÛö†µ\„º@\Ë\Ô\ÁºS\0-\ı6Ä‰¨üz}TπN0ã∫≥\Ú\⁄\r8ô\Ù;\‡\∆m6õM¶\”i¥\⁄m6õM•Õ¶\”i¥\⁄mˇ\0\∆h?πˇ\0Hâ6¨æ\Ã\ÚØã\‰üp\ŒQ\ÔpÅÆ\”èÃºméøØí–µÜK{\ÛHCA∏óHúéIÖª\Í\‚£3˛\·ù\‰∞?π\0se\˜¯\ÛVc<yÖ®B9Äê4\ÈL øcë>U\„±˛ø2\÷ﬁªùå\ƒ °\ \Î˝#\Í@X:ÄÆ°õN\Õ˛é•ù\Ÿ?˘\r\Ê\Ûyº\ﬁo7õ\Õ\Ê\Ûyº\ﬁo7õ\Õ\Ê\Ú∫iˇ\0*\Ú\\-˝I\Ë\ \Òpz#\Ù\ﬂ\Ìñƒ≠ùæ]iOC∑H9có\Ÿ˝ˇ\0∆àW5L®\≈\È˙¶Rb\Z\Ïíh∑˝∫#\ŒW_\ﬁ\≈\Ò≠˘\ƒ(\rYZ\ÈèV\’;w÷¢R•^rπ\»°\”\‹Ë•û\‘D\˜√õ™|üÆ”†ü\Ë\—7õ\Õ\Ê\Ûyø\r\Ê\Ûyº\ﬁo7õ\Õ\Ê\Ûyº\ﬁo7õ\Õ\Ê\Ûyº\ﬁo7õ\Õ\Ê\Ûyº\ﬁo\›\ﬂ\ÈxuJ\»jæ´äWZÉΩk˚Å%$I®\›\‘\‰\√\«&ˇ\0\Û◊ëØòS\'ñ]M°h>KD-àòêZ83ió\Í\Â\0â\Âˇ\0<=≥•É“≤}\ÿ\‘\r\ﬂo\Í3ú`\ÔeFV^¶IÂæπ\ﬁo7õ\Õ\Ê\Ûyº\ﬁo7õ\Õ\Ê\Ûyº\ﬁo3+çqÆ*T©\\+ÖJïæ†˛^\≈—ø\r\ÁgG¨fÖlkS\…˝E™iß\\ñ~™Påqß\◊¡\Ã5˚I\»ˇ\0R¢~“ºGk∑®V\‰ﬂ©£øi¨r†Ç˝\ÀGªπàôo\0\\Ëq\„H+Äö%ç\ˆâ\ıÜÄø˚]W\ƒ+\Õ\œi^å\Ú\n=`˚Üä<\È\Î?ô¨?_§Z˙õ\ÿfﬁ†HÅ\‰ˇ\0aG\'	}\Ù\'©Y÷ìa˛{r\€\·U/n?∫èë \·—ü¢\ÔA\÷-;ø\Õ\Ò\ﬁ\0O⁄ù .\œ˙˘W\\kçp\«\Zï*WT©R•Jå©\ŒTÆ	:Ñˇ\0è<;U¥D\ı\¬RØQ\‚\„Rï\‡\…¸\ÃLa9éë∫\»c±˛©£\ÛS⁄ì˚¯ZñO\Â\¬\œS‘©\ÍWiS\‘\ı*T\œ\Zï*Ä•\”}(∂£D\«Æ~\ÀR¡F\œ:B–µ¥{«öz5XÖ\ \«Iô°nÜ≥º\÷\Êbz?ø\„*T©Ø\nï9J\·\\*2•Jï3\Ò\Î\8\Ú\„\œ\·\‚ˇ\0^8z˙\ƒ\ \œPDÇ¥\n¥oHZ\‡=5˚ñç^è\”o‹´\"Ë™ü\r\ “åû¯´\ÿV¶©ó>\0\0TW)\Ízûß©\Ízûß©\Ízûß©\Ízûß©\Í>¥4;\n˙Æ,æQKàuD˛†\È£∂\⁄D\“?\r,]-˝\Î\nﬁ©u_ëH^C¸.øW\˜¸˛≈ùxs\„\◊\·ôRæ+ç|7¯\„{\ıW¸<	\'EyS¯p†\ÿu<\ˆ\Ì*√¨\Ùƒ≠YO<åßb-\Ÿ\\\Œ˝#Wç!{ÅúAÍø≠YÇ£R\√∆ä\ÛpòÉ@4ˇ\0ùpÆ¬∏T∞õ†Ü\ıæ~\Ó\"±\Zû¡\ÀŒû4\‡zLës\Ïx™\·Bñ\"!_ü®IÉ”ß\ˆïﬁ∑*\ﬂKáM◊π˛¯‘©Ræ5+É+ÖqØç|+˛0\ÁöΩ7˚G\‘\ı=J¥˚\r=±)ZÆ{∞\Èù\‘”°˚\⁄U\Ïuå\€\⁄\Ã\≈Ê∫Ø_¸*zû•Jï*\"é¢£K\…\Z≠\‚\·[ï˘ˇ\0(  éDn\ÂJûß©\Í<é\Î™\˜\r=\‘¸‘ÜÍπ£\÷g©S‘©\ÍzÖ-#\÷\ı\"ím£*\Ë\ı\Ó\Ù\ıhE^á£¶éêlr´€Ø\›OS‘æXS:\‡_|;\\«\€\ÊN¬∏W\n\·_\Zï/ƒøo\«\r∏ﬂé\„Ö¯\·~%¯\‡\‡ñµ\˜\–\H)ú5¢ñ˚i0ˇ\0˚Åä|Æ\Ë~\"ó\Ÿm\Ìy\È\n’ò∫r˛~*PÇ4]ŸõAZ®!\‰åa\Ë\Ê\Î[∂¥˙\Ú\n\‘9\Ã˙\Â\Í•\–∆èO‹¨}\Î\ƒj˚˚ÖØÄ\ı?Rä\Ì◊ø#üjà&\‹–é˙ü¢uÜés\Á¥\rö£ïu_\ÓÜ%L0=\‘\‘ÜW\n\·J\ˆ≤/R9(ÑNn\›?\Ò,i•\Ë\ˆ}B˝\˜(RT\È\r\—+f\»}∏>é±Ñû	¸%¯ó\‚_â~%¯õK\Ò/ƒø\Ò/ƒø¸K\Ò/ƒøi¥\⁄m6õM¶\”i¥\⁄m6õM¶\”i¥pOfî}\◊b≠\«\Èª\r•UQ£\Ôﬂ¥j%ä\ﬁ[ñFPµz´ñ8dá¯\Ô\⁄r\≈QÇ©»∑üoæÉ\ı¸≥üƒ∂2\Ê°j	¥w[˘õ“™∑å\Ô°¿\r\rñ•\‚.\Ï¶˘˙˘∏åîå\‚µ\ÂÕäµé¶\Ì2å\◊qô°û†pπ\Ã¡˝s\Ów$≤\ﬁ\€~Áπ®[\Ë\ﬂ%\Îd),§s\Ê%Ü¡Ä\‰s˛cvΩ@F\Z∞ËµÆ\≈\Ëvä\"kQ\—\Ì\ﬁ\≈x^v∑\ÌÔé¨:˛G\r¶\”i¥\⁄m6õM¶\”i¥\⁄m6õM¶\”nLLL|6òòòòˇ\0iââé\0Ç<¶i\'ø˙pEOR\¬l\Œb\Ì\Œf\”Gî¡äE}\œO6˚÷Ω«∏ßwø7Å≥∏‹ºVÜœà\∆\‘6\’-\˜¨≈ç≤b\≈\„\ˆˇ\0R¿G=O¨¿ æ•ÔπóOx˘\ﬂ\ÎŒåX\‡K≤∑xÇ¿ˇ\0xD\r¸ˇ\0ñS\ÿ#Üª\‹1>\Êî\Ó¡\„IWF\∆LÃæEé\€\—\Ì->]yw\«\Ó\0ßæWÈóñΩFã\ÏrõM¢\·\»]ªi\ƒ\ñ/›é8c¸Lââéˇ\01/\ƒ\«¯\·è\Ò1˛&&?\ƒ\«¯òˇ\0yº\ﬁo7õ\Õ\Ê\Ûyº\ﬁo7õ\Õ\Ê\Ûyº∫—£\–#\Â\‚dkE´´¿Äﬂπt?›¶\ÛyQ\Ëx¯\Ê ∑ù96?ô\€¯\0ø=f:\Ãuò\Î=\\»JJ\ıe\÷ÊÇÅtÎü•çD´uæQØbûy\'yk_L\’Îó©p\0\Ë2>#R\Ù\√*\«;/\Ò)ä\Í∏\ÂÉ\«9\Ì\»¸\∆∫?Ä2ª òcE\‹[£N_\‘\ƒ\ƒ\ƒ\«Yà\»IäKøR\’F\Ê®\Ÿ\«\‘)pÛÇáÆs®\‹\ﬁvl\\\∆ˇ\0\ﬁ¯ñµf\Óz\Ú;vyº\ﬁo7õ\Õ\Â˘õ\Õ\Ê\Ûyº\ﬁo7õ\Õ\Ê\Ûyº\ﬁo7õ\Õ\Ê\Ûyº\ﬁo7õ\Õ\Ê\Ûx\¬\Ë˙/üíNC°tyrØW•q;|\–\ı\…1\Z*\Ën^∫k_ù\·\0:ÆÑ\‘*)}\⁄ 7í@1∏˝ê\Álˇ\0(\ﬂ¸Ü>s	˚É?Pß?õ=cG¥™=_bQß\rÆë\Ï °\‘ßê\Û¯\Ê#vÕó\Ë\Í}\À nè\'\«(‹≠H?ò\r•=o\√˙f\\èí˛ \¬;ØΩX1\Ôê\÷`≠∂\Ô°\˜\Z0t;∫˛„µ¨Å\–9yG˚\Û\03ZÄ\ﬁDY6\Âaππí±Ö\Ó[\√;\ﬂ\˜9\Ì‚ü∏\÷U\Á\Ù\'\Ó?i∆°\È∑\‡à!\’B\œ|\«‘∂4Zy\‚µ¸\ÃC\Ì\√bqfq>YbD∫ú\ŒO_mN\Õj3yº\ﬁo7õ\Õ\Ê\Ûyº\ﬁo7õ\Õ\Ê\Ûyø|=Œº=\À\„s\ﬂ\√3\‹\’(óÑiy∂˘rÇ¶µ\ƒ\ﬁXEsZyB\√k®g∫Pë±ø\ı:üá2\ı+SA\…;|HÖ\Èi\0Ωã≤∞\Ò\Ã€ä55Z¸_\Úºi\‹\‡8YCU\À\√\Œ\"&¢Vz3x ´\Û\Á\·\€˝ô@\’\Ê¿§ù@W?¿\Â´\Ë\ÿZΩ¯j\r¢\Â\Û\‰2Ω}mØß\≈J\"Äeaˇ\0!	`\ËrzûZ)\ZëénZj\ˆ˛f\òQ\–D¨:\Ò\≈/1\Ã\–{fãñü\∆`ú5\‡\Ò\˜\8u\„\Ó[\Ò\Î=|}NQ\„\Íëô≤moëi\Ã3àªxfÖ\Ê\Ú<\¬¡£T`\ΩL∏CòÆ\Òõp\Ë\¬\»t+ø˛\·¥ \Ê•˘§\«^ΩûFÑßû\^Ö”ñ\Ú°fñ/XEãG\◊k\“0º«ûD\‡˘ìKnv\Ô˛1êZh\ˆÑs7ò“π≥§`kcüy\Ô\”~\À`u¢\’\Í¿\ﬂ&J<ÄñHΩ	\√V±z3\rTgb«∞ú\‹_lõJL†‰¥•öK%CÅÉüπ\È~¸K`úá/{\œ\‘e]zå@rKKò\‡äÉ§Ø\Ì\˜,Ç\◊óûúqqï0\Óo.w!\œ5ö\È«óÀü√ü_≥\◊ûßØã∑W~A•}á6:¢w\n÷¨´\¬\Ìùr}Xl°∫˘\Ê\Ò∏PÕïk@\Ú9ûá˝\‚%z\Ê≠\‚Ÿ∏[ΩE\Í\"†ØiäŸï\‰	O∏M\Îûu\Ô|z@\Ô5™\Úº\Ú{5H.Àì∂Çs;\”]!\…\ËùD\…\Ÿ\·ïlÖê\‰\ˆ}ü|¨∫πΩ^\∆>à§Å\»+W@Å. Üπ£∏\’\Î™\ﬁ’∏8\ p;µ5\Û©\Í\ÛÑ;wZµ\Ó´\0Kû££Øy\∆(\ÿƒÖ\Û0\˜¸\ aß3\‡L\"a\ﬂdèQzµ^\ÔC∆ÇrMãüuY\∆\Á(«Ö¸˝p~[¸y\\\*\«mÉC∫\‡\Êâ\‚L\Ï 0áò\ˆ\«x4∞Äû¶f`\Úy¨¿\·\Â˝\Ò\Î|\«\Ú.Å›çXj\Ò\ıÑñJh\ˆoN\\5\rBJ\‹Q\»s˚&\Û≠ﬂàR*¨Å\‰é[(jZ–πL¡ \‰¶y∑‰Øã\Ì¡êπÄD—Åqòz\ÚF•$≠Ω\›\Õ\‘Cj\y9A˛\÷¯\Z°®ò|õ3\ÂèQõ%ß*ú≠æåà\Ó†VR™9≤\Ó\Ãk§\ı˝˛•\ˆ\"ïR]~.J›¨aH\‰+\„StâØBè´g≠xÅi\Ï˘ò5˚Nß\„\·\ÍyA/±\€\Ò¿\“ lNP∑ê√∫_\Ëˇ\0g\∆˛O\œ\◊_\pñôZV®\’È´≠b\Ï\ﬁLµG@¿`\·W^WLÄ?\‹\Ê\‹A—úf+Wá\”?ûlR\–\r`Z•\n\·ÿø¸¶Ñ´(w\È}]aC\ÿE ú˛\Ì~*i\œ\‰ø\ÃC\ıÉ\ÃBh\’•\Ú±≠*7Îì¥=Ç≤a:&Tì˘\Ì.mçv¸BN,#®û\Z\È,2ù∫∫◊¥</Q\Zå6ß˚ú\Zàƒ∏\’;]˙\Ò•l˘l\ˆ∫\ı\rÜ\÷\ÒZr7Ü\0/\'¯\◊\ÒT∂ê\”\Ú8\—OM\˜R\Û1E\'yvª9à} MØ¯\ÃÊáÉ˛¸A≤\¬5AOhq:\–9{è±≥5S\r@\Íhü\Ê∏!k¨1R¡ôå=&\“˚M£ß)eî\–\Ê˛8 \"&â\rBîÆù˝\›\Èl,Gô\⁄_\«\◊\À\◊ó.\\πr¯_\rßB\ﬂt\ZÆ≈≥ñ;v\ÚwÇñ%R\’\ÍºK°|æW™@}É\Â\Î[\·\“z\·g l9=xxT\Í\À‘∫2~1(ôJjÀÆ|&c\¬X*âq¢îª\À\„:\ÍfX\Ùt˚Pß`\\∆\Ú W\Íá-@ã»º.\¬ ªp[0\Új˝€ç¡°h@\Ë\Û≠ÇBeºâß\Ó\0QTód©\ÁÉN\«\‚?[†è\‘@j\ıeN°Q›¨˝Jöb8^\Èk¡ù3 \"R”†\–|πr¬ª∞0\–“£ÄåY]¿≥\Ù\≈)\ÿ\“}@\Ôi\”G\ÊÊâ¢6U3™E8(Ph R˘°}≤rîjØJ5Ç≠Mè!u\ŒA\Ô¥\’bµ\ı\Ì∞Ä®9OS\‘\ıêU™;¡+IKÇ⁄øQä@°ÀãdõM\Î˘åv\‡\·[\Ás\À;Àõq€Ö\ø˚∏{m\0\„U\”é\Z:ËÑÆ˝èû{æ$ì˘°E!\Ã\„\√¯¸\\⁄mÅ\nD\÷\‚ \ŒQ\È\”\◊jCZ\"u\’\‚\Œp\Ÿ9 \ÿ/1\Èˇ\0±&è$\Ê≥®\«-:\ZO#D\Í=∏,c°]ˇ\0Îº∏†\Í\'C8±ßó-tª ôÆ\Í©2Sï\÷#”Å\›—ì∏BÄì∂!b=)π~\"\Z˘∞\”Vö\Ù∏•J)è¡\Ë\0mWh9˘\–\Î\ \\S\—ßÄ\‡ô\ÛD\Ú\Óï¯bò≥£F¶c]LÆUP\Ê˝\≈q\’r\≈K\ÂÀÜ∫¶5\n\œH\Ù\›u®\Ô\’è\Â¸AK.gr\Œ\ÿ^\Ër\‡\€\—+˘£*\’\Î6õM•\ÈÀ£Ø˘\÷h!\–h/ƒã∆∑ô\≈\ˆ-\ËJKñí\‚ë\Â\ÃV^\√_\ı\⁄m.m6ó6õM¶\”i¥\⁄™\⁄¶∂°\÷\„0\√4xö_jL\0DZ∫üΩ\ \nµã_∂{û\Á∏e\Ô\”ﬁê(\"\'N°†©´\’>HÎìøzDE}ÆS#\’P\'æR…®\\˙#\Ãy3å3\…˘@L6&±hZ\ÿ^Øyçﬁµ\Î~åtπxWÅß(=⁄ªáA~µ=KÖ˙è\ÒP°\ÌìG≥\»z<ëé,jHúªPµ^E\Ù\Ê\Áå#Ä\0\0Ut™\ÂABΩÉ1Ñ\√\˜©ç∞W®\Ù¢am\„∫À•x#U˝ù.è)›µâ•ia=ÖLª\Ì\n\÷()! T\–\„ÉR=\Ì\≈˘òz\’I£ç\È¯DEZÜ•uYEΩ3TZ\Ó\0¸=_\Ô\ﬂs\‹\Á*‘π∑\‡s\r\„\'ü\ﬂ¡\—X“≠}îB\«Zá|)Ä\Ë	si¥\⁄\\\⁄m.m6õM¶\”yº\ﬁo7õ\Õ\Ê\Ûyº\ﬁo7ÅK\◊kQì¡~:.Y8XE\’¸\€\Û%\Ú\’\’\Ê\Ô¡,´EVﬁÆæó¬°\ﬂDR©*7\Ÿ˝\‹FFB\ˆÔ£öúù)ï3\Z>gafª0\\93\ÍÿëUØ´WM\ÿ¯s∏\Ùì3v\◊\Ò√úÄ3¢WÆ\˜tCdêY^°´\Ë—ö9W\reöèo\Ò¸\·¸à)å}D\»\œ\ÂQâÑ\ÒU\‚^\ÊdQ\€$|*£ïß@/õ\Œ\ﬁ\…\ŒpÖø\Â∞r\ÍåV\Ô´¸\g+9≠á\Á]«Ö¶9 ∫∞—†bæ´\‰\Ë≥\»\◊¸\È\Œ4y\'^<\…Q`?\"æéìyº\ﬁo7õ\Õ\Ê\Ûyº\ﬁo7õ\Õ\Ê\Ûyº\ﬁo7õ\Õ\Ê\Ûyº≥æmh;≠\’%\—ö\Õ!\Ï\0x\„EÑ\‡\Ú:ˇ\0πL\Ã¿u@Øj%	\ı-?\Á]8frî\Á?\„ˇ\0xëtì¨\’\ZS\∆X+gü]õ5e‹Å9ë\ÃAoG\Ù\€k\œ\⁄\›ã∞?§ÆHNCZXß˘\È\Êà˘!ñhW\Ô˚	çj@\˜˝\\ It\'äîõ\Z-\\S\ÊÉ\◊Àú=ˇ\0\Ï\∆nˇ\0àÄ9\≈ﬂ®=lz0\’]ª\ÿ\Á\né˘A∞Ø‘§‘íMÂÜè±\˜\rx<˝\ÛSîΩ;\‚	2ú˚ƒΩi_˚@˚„°¶\…\Â˝øâô\Ó0\Êø\Ï\ˆôÀì#ß¯\·\Ó)†X\˜∫xbÜE#\…\‡àDMÄLØ(>Å~Nâº\ﬁo7õ\Õ\Ê\Ûyº\ﬁo7õ ï¬•J\·R•Jï\Ûπ¯-<NΩ\Œ0\„GO±\ËC\0±33(c\»{\◊\Í\—\Zatg\Ó=Q__\”Q	∑∑∑n7G\’?L\◊¿\¬^G1ØöCaπ\˜	ﬁòA6}ü\‘,ß\…IV©\Œ\«∏â®Ÿâ\‘\Ê\Ós§uíÄß®ÿ¥˙:ú\È2vIC◊èIØ˝®}P_ü\ı\\n1¡Ñ\ne|å~¢d\Ú£¡˛∏∏ë+ÅXúÖ\ÎË∂à\n∞ø`¸™πÅ#KCW∑\Û£ª~\Êˇ\0r∂\÷\’egäûLø†ÜÅS@sÉ:ØM)\Îf\Òú\nCQÉN#\\*∑\ﬂMfõÃ≥\˜<≠\≈\‘»Æ∏~\‘\Ã\ÃÃ¶è∑\Ë˛∏´\Zú•ÓÉ©áÑ\Ê∆õvÿÇ#\Ãq+É*T©R£¬¶~5\Ú\"óÇç∫\n\ÒßWP1±∫Ö©\Ê\h\À.\‡∂^˝>èpˇ\0\Á\≈3S4cX\Ó\r_G<%,R¶é\ıCÿä\\A2\Ëi\Z!,∆°tΩB¨\":ê\◊\„\\ø3\œPΩ\ıïuE∑∑à®9ª˙\÷\"(èπR\Ê~\„V9û\«¸≥yS$\Óß\Î \‰\Ó=}\√Hmã/oàÄÀ§„ôÄ≤˙ïa@åßfãr\›ÖFrÉ)P[ößù\n˘Nì4XªD˛\Á\\œ\¬\Ã\’\Ë8˛˛e*Iì;a\Írx\‘\◊B\\©\Ó\€\›gCäpØû\‹k\ÁP7ë¨óae\ÚT\–\…\Â\… `8°%8\Û^_ÃÆ5*f\ƒ\Ù0}pz\‡nD¶ÜFØ\Ìú¿Bïh¡jø\⁄\—1FCö\ÍØuVÄâ≠\ı&\ÁDiOSóS∏√Ñt•r\Â∞\Û\ŒQGóiR•M\"ò~?l\–øIP¶ûÅ©_\\§\ı|é,\È\Z+\rªyãB®©Fs\Áwx›Ø˚1¨¢E\\∆û	°à\ıtà6Éﬁ∂˝J¯+84›ú\√N¥\À\ÿl:r∫º\≈\‰@\Ï•\Z™\⁄ôWuW\Òà(Ç\ƒ\Õ\Û#a\ hcU\Ï9ù±ÀÖreµ9ak\∆;ëÆ,çD\¬K¶uõ/ì\›\Õ¯ots©Ø∫˝\Òkj%J4Gî§¸UA˝S…£æ\„\Û©R•Jï*T5\À¡h\Ï\Ì©ùZ±\‘\Ë:yªU¯P6#U.\0,uº\˜òòî&<Ö∏˝\aÉö\‡öô\ÎJøu~\„\r8,±ûW‹ΩX.ôbjh~Œ≠Ú®™Ç\Â\∆ÔºøΩ\‰~4ïµñÉ¢?\√béA\‘GítNg-îó`A˙N\Ÿ:V∞\Ÿ\Ÿj]4ßT\˜Æ\’≤.w˝gÉ\’`†≥\‹∫Mó\˜oæ•õ\ﬁ$zóW¥J¬ö5i\ÔYP.z\«\ÎÉ\’k\ﬂ\ıq\‡?\◊\né™•\Z∞\Ï4ﬁÄ\’Œöy\Â\Áîfù¢\ÏµU\›_1\È^4\Áw!\ˆ˙∞ùy}\‚X÷Ö˝˛†¶•hYY;?\“f\\\05OeÉµΩ!\Ò ä¿T\‹3%xQÎÖû\Õ\˜111 ö∏;ø\«8…øã\‡=Ç\–&\ƒLå\ÒL?+t\€\–Wnu*W\nï7\·Rº¸jT©R∏4$>ì˙l\Ì3FÜ/\‹\È\Ôó`àêD\‘OÖô\—\”\◊\nÜ\ÍØ\÷\À\√\'é\ÏÜ\ŒLN•\÷\'µ-t\Û*îu+º0\0rUøxã_ònT\÷\Ë0úü™\«h\ÃEÖ≠\€\6∫bîEÅ§Åé°\›k´\"∫≤•.\Â>Å¸≤¡x_k+\ÛR•M®ßñU\\äÿï*T©Ráπ\ˆ•¿p\Ï~°äpá\Ô\ı*2Fße\’\Ûk•\Ù®ª\ˆ\÷o+ô©\Õ+\‘\–;\ŒTπtvy\ÌØºP@s\‚b@t˝\√W\ÓWx\€\ÍcaHëmÃ∞kî\ﬁi4√¢\'\rê\–\€\ı\ˆp\\™\—˚û\ƒvJµyø\›u$wW\„™BSE¨∫õkØyR•Jï*T©\\*T©R•Jï*T©R¢t\‚\‡øB\◊\√>j¶j\Ùµ\ı∑˛\r8\‚âbr`íÅÇ\‰ˇ\0øÿóº?_\›\/\«¬ëìQWÑÇ¥\–.f%@\‘4jDµ\Ëi=\¬\Ã≠¨´(÷ïo\Ò\“\“yF\Ïe¿Æ\ˆé\Œ|≈Æì\\#\ŒbW\Ùü\‹1bÄúƒ¶¥B\ˆ\◊\Û1\√1,m	wøÏòï.Å˛\ﬁ3\¬\Ó◊ô\ !ò{ü\·wå\n”¶;\Ÿ\ˆ\«K\“÷á\…<Ö˙\‰QàUóuPEæE≤\œQiMÿøò®ï\»\hLAQ\‹\ˆˇ\0\\\ƒ\…M´™\Ô\·\¬*\Ã2A7\Ï˛ÂæÜùN$\rí\–+0\ \‰}©´≥\ \Ô∞¿\ËÄ\Z•Jï*T©R•Jï*T©R•Jï*T©R†B\ \‡\Ì\”\Ù\Ëâ^-;\ıé|ù\ƒ^\ÂI\Ë\«\‹J*◊ü\’\œ\’]¨˙BRs\ﬂ\Ûx\ÔﬁÇbT\Î\÷(a\’O\‘X∞\Û\Õ˛\"˙O\n\ÁºÑ\–∏1g√õ&Sµ\—\ TnX\Úc›Ü∑Õò\r\nùä\ƒ\ƒ+\'\"x\œJï*b\∆i<fˇ\0pÑ˝K!\‘\ÊÇZL;z-¯®+?¿Ü\≈\0\—%\ÛÀùzG\…\Ó\‰\˜r¿1\„§Yldrc\Ò¢”ú\‰e¬°\Ã\r◊πâà,\Ë\ê\…yr\Ë]>h\r>\Í}ù»ì\ı¿b™\Í^?\ﬁ8“åÉ\ˆ∫ï\\(¢•ãôøNßWüB•Jï*T©R•Jï*W\«11\«\‘g\”\Ú”ãù7ó9qﬂírNx~\Z&\Ÿ\ÈAp	‹ÄhÅØßØòD∂\Z∫˚òòòòäV õ•˘XE\ÿÖ0nø\’NXÑ\Ë\÷CFs\'´!!\ŒO!\Z\ˆ®˝p\ƒ\ƒ\ƒ\ƒ\ƒ\Òn\\0÷ßß˘î\„P\«\ s´°\ÿ\Â3t9\¡G\Z\„ú0HÖæ¶ø5#ì5\˜11111.ô:™\˜^!=\'‰ò∫´∫\◊\‰OøÅ\ÙqV£ÇH$+π∂^Aˇ\0\«q1\√ª+ó¢¯”®CI\Á\“\ÍG\Ÿ\«4N\◊Ky\’\Íy\0\'\ﬂ\ı=SQ`∏5\\7\⁄bbbbbbbb9¥E\Q\n˚Ãº\◊B\ËU\√/\”ˇ\0%®\‘Ffê\–ø\‘\ƒ\ƒ\ƒ\ƒ\ƒƒ∞kA˚Ø\‹a\Èò1•Ø¯\Œ|Å\Ò~«ÉXuv\È˘&&&&&&&& \rí´öU—¨†\ÛA\˜5äO≥b¯~\ﬂB§\Ú-Éµo\«º¸\Ò\«~òòòò\·º\«LpﬂÅÅÇ\ÁTª_â‰πå∞ké≤\Úör™UujgÖIj¡:©∑õ⁄ÄCëq\√f\ˆÅü&ß1\È1\√ít≠\”˘òô+$v`˙]1Å˘˛%\≈\–´©\”19LJ=umü\‘\Ër\€\ﬁ?s\ÀQ\Î¸¡@ÏïöﬂíÜ\œN\'ã#∏ˇ\01111\Z0+UÑh&™f<\ L5æïa\Ÿ9¿xØ,&≠\rû\Ã\’\«÷Æ±\–wP=\Ò:¶ò#ì\À\0\0\√LLp\ƒ\«\Û\\ı\√\◊\√K°`ú\ÿ¿\Ó4ù\…KFñUù±c\√v\ˆ\‚ô~uÉ,öPzãoû\0ø0n´x°äuR®\ÎZêø°\—\Ë\πr\Ê#\‰^\ﬂ˘>é†¯ä\ÌºwYú>\⁄N\¬^î7(^´˛\⁄b\\ƒπr\Ê*’õâ£gòQ≥\Ù˝ã´ò\Ù\‚¨\⁄M\rò:l \ÿeÀó1.)`e\¬`\Î\ﬂ\œ\‚R˛Hj\Ê¨Óáñ)Ôòµ›ïïP\Ú\¬ﬂõ+\⁄bnåup=úé#∆≤\‚ê}4kí∏\„\·\Íz\·\ÎÜ\'©èá©r\Ê>•¸1\\ƒ\ƒ\‘0OÑ=¯%\“Kò±‹àyâ\r\Ÿ¢é\‹^\ÊÇ\Ÿ¸S<Öî>\˜|˛\‡Éj\«X˛`ñX\ı\ƒçp:?\«ÖAùH≥W&\ÒÈï∂@®\»\ﬁ1z\ÔTÄ\0\0x\'äl\√8\Í\Ù9±s∫˙Ä\◊…¶.Ç7:ìÖ\ E{˘πksè•ˇ\0Üh[\À\ı.ß>©¸§E\Â\‘~å\¬\€\rtQ∑\Ë\ÿhÇ\ÕJô6s´¸~\ÂŒè{R}áöÅû\‚˛ß™±\Ù\Ï\Ï∂\˜¡ô;mÖñΩ\0\04>.\\\ı=Kó\√‘π-\ÁÆ\ÕÁ©ºπø\r¯\Ô=B\Û=\Ûüë9pPZ(\Ò∆ÖkïÉæ¿\ﬂ[ó)W√ú\Ù\Ì˚åã^\ÁO\Û.\\π\”[\'º˛\Â(¬æ˚\KÉJw)\Ÿ\÷˝1©\nô\Á\ıkc>\≈§\\Äd\‡{∞8j\ \ƒ\Ï\ÈP:[\ÔÄ\ﬂ\‘PykX@\‚∞\ˆá\Â\ı)L4ºl≤»∂Ds¶]ÕæìÖ,j\Õ\Ù¥Ø®NTøE<§Ω:ß\„˘Ä3ø\Ò\ \–\Íµ¸êŒÉ0\÷@|‘æ	ïá˙cz\‚}o\Óo/e«≠\Zwxä›¨/ê\Ï\0éÖ\"hëz\\«\ıâ4jS\Õ\ˆ\\ﬁo7õ\Õ\Ê\Ûyø\r\Ê¸7õ\Õ\Ê¸w\·øõ\Ò\ﬁo\√~ÀõÃ¥LZht¢k•|l\ÿ\Õ~ó\Èf=DGIgdò\Í¨|[,\'*y˝Kïtò’éà≤2Çh-\Î?\ÃB\◊/‘∞?ÅIR¯ná\Ó5\ÈS\ˆ?\0\ı¿@Ç\”\À\‚ Ai◊á\ﬁ\ÏàQu`ﬁ†˛*fY)GH\Ï?Ã≤åõê±\Í\0µz2òe\Î\0˘\ﬁ.-˚à•\‰O\˜äî7C\Ìøw\¬«§T˚âMG˝¿/∂a\—Xø(*\ﬁÓØô\Òﬂéˇ\0\Ù\ı\Ú\ﬁ_\r¯\Ídh2±\‰´{!^\¬_Æóy¢\›\Ã\Î.\\Dzªü\◊\0	á\ÌB«∫\“\Â9\…~FI˘Ño\‚QåP“Ω≤G}∑~l§¶2ö`Ø\Í¸¿t∫è|¨£ß	\Ób5B´\…¡ZZgy ™˛\¬˝œ≤çÆe\”¡.]T2\Ì]\–w<\À\0\≈°\Í Zà8?<.<c\Á˛<ã^≠óN°zv¯\Á2ãMIhxØ¸∑\·ø\ \Êˇ\0__/_\\NOV\DŸÅu•U°Ÿ¢vxP	âf∞zYg,ªG$©F:∫†¨’µ¯\ÓT?BG?\„ó\0¨U9 X\nwˇ\0€é|¢L°C\ÚvQb\∆\'Å\…˘<Ö\Óí–Ø≠c£O\À¬ão9\◊)\˜4Õ∞!\»s´ ‚≠¨ho¸Ei~g\Ó¯\ﬁ\„^\ÓP-‰∂ó^`\“8-M¯s√òßj\ﬂ\√)\ˆ˛ÜI\\€ë\—d\ÔP\ﬁSNº\œc0a3òMît*\Â`)Xóy3\œ3\È\‚gi±†æ4q\–R\Á¬á@\Û\«mö“êLªáê˘333333.ffff\\\Ã\Ã\Ã\Ã\Ã\Ã\Ã|Ñ™-œ∂¯p<∏ád?Nùp\«\‚>Sà\“˘\Á¥Zw\ÛãÅ3©∑∫\\¥h},{ÇR\'ã!xØ{òm\‰\ \Ó1Q\ˆ§–ór1¶ô”Å\›/~Ñj¿.πµ˙E\0J2h˙âÃÄâ££\ﬁk/y \Ú¡e\Â\Á©\ÕO˝®˚€µ\‡Ä\n∏!É\¬P{ôí\Ú~\⁄9\†ºu©û\‰%ΩiQ\ÂVa∞\Í?A|ÇV∫ç\Ï Ä\‡É\„\Ê\\DV[û°\ÌÂï∑<\‘t\»>É\Õ\Úetn¥!\–Ç\‰¸¥∫\ƒc°333333333337ôôôôôôôô„ôôôôôôôôôôôôôôôô’ã•O1\‰òGíGåﬁÆÖ\—\Úlâ©ò°È†∫+ÃÜ¢tFë\‰Éd*¥G\úë8\n62¶Tó¶s\Ì\ÛL\Á<9dΩG¢Ubùªè\Á\ZD•Ç\ 9-\ˆ°]\È\Îoâ°4â\…8ò\ƒ:!hokk+\Ÿm\Ÿ_\Òj\’H¿\’=sK\€\·.\«˝é8S£’ò}å≠\ÊG9Dué¨\ÊAkyò≤∑m\Á®\Û•ñ˙\"v≤ˇ\0Ä\‰éú_jPUÅMvR\ÎÜ\Ú\\º‡≠†7/\‘w\‘\–5c¸°î¥`Ω<\€\ŒfffgÜffffffffffffffx\Êg·ôº\œ\Ã\Ò\œ\∆˛P[ury9\Îu{\0Ç\'&3+#@i\Ã\ﬁ\Ë\” íú¶PµÄR\"\Ù£Dz\ Zi\!©Àº\Á©\€\\cã5˛˚ƒØlú¡\Á\ﬂIâ°†\Î‹îﬂòz†\‘:4\Ów\’J\"îR3]∑:+∑\Ï6=\∆\\LX\ÿ\›\Ù\ƒdß/±Ø•ùπƒéA8∫©ß∫¯ü\Õ)\«˘X{cJç9K€ì\„td\«IA\À{ π\\∞\◊TG§3w¥G*‡≠Çï\Â\·\Õ\ÁTs´(Eh¥ ¥)\—y<\\fÑ3ûo_•<2\Õ\Ë9ºπ^	¶â\· ˛\‹\Òjªôf5Å\«N\Áö\—\ﬁK\˜:\¬ÿá#®\Ù\ÊW˛yôô\„û9¯\ÊfgÜxgÜfx\Ô37ôô\·º+ê&ãuK≠Q»ôôî6	*ÉWo7=T\÷\’îj#£¡1Ω¢ï‘Å\‡U\Ÿ\È\ÿ|\Î9\Íu:D(DN\‰<u\Óy.è>¶x4ê\ÓÆ1C¢òé_ò\«JÜ5Vjûî\·|)¡Öv]\ÊuóyqcçWÉú£¨ºÑ’≠)bÄ.kUÔØ®d\0\0;\Zä/óañ\Ã(\ƒ’î6O,\ˆ5é_	®[Ur´\ŒW8y∑:5°åú\0¢Ä¿hTºLïÂôô\"ê\‡]:\'m^\⁄≈Ñy\–@ráØ≈¢∑K°4\Ê\Ïg\«éu\Â2\'2\∆4teW,p\ﬁgéfˇ\0\Ã\Õ¯o7\„º\ﬁfo\\ﬁo7\„ø\Ã\ÒﬂÜf\Ûyø\Ò\0\Íß¯~⁄©bD)â\«√≠\„ê\Û\Ï\Írºç\“\¬\ƒ\≈@:~g?\˜òDPp:?\ƒ\≈CÅWryY…æuNK¸\ÌW@j˚8\Ëº\‘!G∏}CC∫U;\»\Ò6≥	+FYÀÇ\·N™¸ï>°iæp<b\\l\ÌjZ˘òT\= ¸\ÚÑ\–3\ÏØpæï\Õ	†W±0$‡ªøy\ÃuÃ™if§\Ù9}w\Ë\—\¬UxÿÉ\◊:-´\œCö \0¿†Vú3\√yüÜf¸33337ô\„ø\r\Ê\Û32•Jè •JåﬂÜf¸k\·S<=\Î∫\È\‹\—\Á\÷-§éâ\ƒl\“˘ºæè>∞q∆ΩZ5¥|òÃ©m>b:˝)\’j~%ê˛\":â•r®b\ ÷Ω›™\ﬂGt{\ﬂMIﬂ¢tL&Oà T\–\·πM,;˘{CE/∑™\ÍΩ\’c q˚,[ñ|\Ú\\)üá\ÚÆ-\ƒrò˛Q\Õ\ˆ=π\Ò\∆\ÁÅ\Ÿ\Û∑aîBº&\09q©Sü\r¯o+Ü\Ú∏W\® è∆•Jùx\Ûˇ\0Ü\Ú∏o*o\ÒﬂÉD\‰jr\Ê;òé~\Úx\‰&â\‘\«\Zkçæê~\ı&\ﬂ\˜è\·\Ÿ>Ö˛b®¿\\'-≥¡πZ\„\Ï^˘≥ë∂\–p\Ù\Œ/Ylâ\ËV;M§_Iö\◊X\˜ìñ\Ïs˛!Ç\‰ùL\„˚ñ»ßí\‡5[h5\\Jπ_î\—M{\Z\ı\‚yqzÄXûU\'ó\'`s∑\0ç?\Èºﬂç|\˜˘‘Æ*W\nõ ï*TÆ+Ü¸*T©R•E\„aq\’œï\ \∆«ô-6âÉ˝\rµ\Õ(qjæ\—\Œc\“1@\·ú\ˆ:ÆO©¨3\Z,xeDm≠“Øq\‘{îƒ¶û¥6¡\«W\“˝Ãá≈®π\”5;]vï*Wî\ı\œxBkwn@\Ê¥<\Àf£Fù\œ√ó~%KXÊ¥Åzøñßw,™¥;≤\ˆ1\Ú©R•pÆ∆•Jï*W¬•|\ÍW\n¯W∆∏W¸\ÍSá`˛yâë§Ü\ÊdñÀé\’\ÈÕ£M_¨<á0\Ê=!\‰+≠\ s;©G÷∂#&<r˚è\¬æuhDB:f¯{û\‚WmN\≈\Â\Á¸rypDDO\¬´t´A∫	~ç0jøØ<1qc∂yÆnµ©\›.ùJrØ5\”Z\–{V∏WŒ•Jï+\·Rø\Áº\ﬁo7õ\Ò\ﬁo7\·º\ﬁo7õ\\ﬁo\«yºﬂÜ\Û~\\ﬁ3ÑKé£:–í©™˘z9ßäª[\À.è\Êô~‹π4ªö\˜2a!/ÑD\Ô\Œ1:Ø∑_\0çéú2z@}<\ _ú?\ÃH3\\°B™∏†º\∆ï\ÈGWë\»|\ÒRïmü∫©°Ø`PdÇ\ﬁqm˘™˝\√yº\ﬁo\√yø\ÀyºﬂÜ\Ûyø\r\Ê\Û~\Õ\Ê\Ûy^eyòòòòòï\ÊbbWôRº\ \Û1+ÃØ2º\Õ\Âyï\ÊbbWôSº\ \Û+\ÃƒØ1+4\"XDu^sú«ô\Õ~á4º	\‰!\›zG/gxjÖû)ˇ\0y%L-\Ò\À#Øßo&A√éŒæcm≠€¨vÜ\›\À\˜\„\⁄û°◊´\„<MBñ\ÊØW°\Õ\Ï(mKoKu~jøÄ%yï\ÊbWô^eyï\ÊWô^f%yòï\ÊWô^f%yï\ÊbWô^f&&&%yï\ÊWô^eyï\ÊWôé¯\‚bbcÜ&&8bbbcé8cÜ&8{„âà\◊e´Q%XQvW≠˝ûfzá°r\ˆß\—6|º9\Ÿ±*◊ü)\Óh\˜52\ÿÀ´5\Ì\Èw◊Ö‰ïÆ´\Úx5IU\Û\\\Ô\‡F\Û\‹\«p\˜=\ÃLLLLLLp\ƒ\ƒ\ƒ\«LLp\ƒ\ƒ\«\À11\Ú\«LLLLLp\ƒ\ƒ\«\√~\·ø9d5I\»9§\'[ÄßW\ÿhúû»∞iƒ∂™ÇY¿\È£\È\Á11Akπm?%\Ìr\Ës˙\«@08∏ü\–sWô@\Z˝÷µu◊ù|±7ò¯\‚cÜ&8o¬º\Ò\«˛¯\„é¸1\√ò·ââº\ƒ\ƒ\ƒ\ƒ\ﬁbbbbcÜ8◊ôàb/ìGD\Êw¶,~ìûbsE#\—·©≠ç9À≤biiUó\Œ]\ƒF @U\ÌÕå\Õ@^?j\«j\Ô¿\—Q†3p\ÚV_5\Ô¬øEq1\√òòòò˘cçLLT\ƒ\ƒ\ﬁo117\·^f&&¸1\«11\√7ò\·éòòòõ\ﬂÜ8bbcÉÜç\–\Ê-\Ûï\…\Ë,\\¶\nîaÆº,jÇ\À\Z\'°KΩwî4÷≠Z	\ŸX\Ò|K[\49ŒÉª<áé&&\Û7\·º\«p\ƒ\ƒ\«\r\Ê&&8\Ô1\«~\ÃLKòòòòòòòòó11111.\\πââs\ÂÀó1.b\\\ƒ\ƒ\ƒ\ƒƒ≠¡\‚ü\‘˙˛«Ç\"dIU\\Ê\0˙8QÕì\·:∫ΩäC\Ÿ\Í\–\n\04\nòòòòó11\Zòó.\\\ƒ\ƒ\ƒ\ƒƒπr\Ê&&%\ÃLLLLKçLLKò\Î1=Àó/áπr\Ê8\ÂÀó.\\πs‹πr\ÂÀó.\\πr\ÂÀû\ÂÀàJ\‰a¶tåì\0»πß©À≠9\›p«°\÷a\Íπo÷©5u˘-U\€Ñπr\ÂÀó\¬\„.\\πpó=Àó.\\πr\ÂÀó.\\πr\ÂÀó.\\æ;¸}M¯\Ô/\·º\ﬂ\·ø\r\Êˇ\0\r¯z\„ºﬂÜ\ÛÆƒ∞nqNr\„\Â\“áö);0ê®\–\‹\0\˜\Î\”›å\–\Õˇ\0\Ìø\r˛7\Ú\ﬂ˛w\Úø˘_\ ¯\\\ﬂ˛\Ò%æ	\Á™\‰\ˆ\Z§¢≥H8ø\'˘˛kˇ\0\Áø˙_ˇ\05£&∫\√m´ˇ\0+ˇ\0µˇ\0\\\πr\ÂÀó.\\πr\ÂÀó.\\πr\ÂÀó.\\πr\ÂÀó.\\πr\ÂÀó.\\πr\ÂÀó.\\πr\ÂÀó.\\πr\ÂÀó.\\πr\ÂÀó.\\πr\ÂÀó33.{ôôó/Üffffffgπs32\Êe\πô\Óff\\\Ã\Ã\Ã\Ã\œÀó333.\\πôôôôs3<.\\\ÃÃπr\Â\ÃÀó333=\œs32\Âπôôô\ÓfffffffffffffgÜfffffffffffffffffffffffffffffffffffffffffffffffffffffffxffffffffg\·û\Êx\Êo3\√~ô·ôôø\\ﬁo\√33yûôõ\Ã\Ã\\œ¸Yº\ÃﬂÜ¸37\·º\Ã\ﬁr\„û·ôø\«yº\Ã\ﬁo+Ü~\\Ã\ﬂ·ôô◊é¸7õ\\Ã\œ\r\Ê\Û<7õ\Ã\Ã\Õ\Ê¸337õ\\Ã\Â37\‚\Ã\Õ\Êx\Á\·ø\À<sˇ\0˛¯ó√üs\‡¸â\Œsù8\ÛÑ!ßì§˛8u˘\Û\„\ rÑ\Â«ßtù\'9\Œs\‚p8rÑ!õ§\Á9\ˇ\Ÿ',1,'Aguilera'),(4,'0801199912344','Mendel','Brez','Aguilar','M',88795986,0,22101972,'1998-02-12','Tegucigalpa','Res. Plaza',NULL,1,'Perez'),(5,'0801199925684','Lisandro','Emanuel','Maradiaga','M',33333333,0,89784514,'1998-02-02','Tegucigalpa','La ca√±ada',NULL,1,'Pereira'),(6,'0801199993312','Enrique','Emanue','Ortez','M',22222222,0,33333333,'1999-05-30','Tegucigalpa','La Kennedy',NULL,1,'Camavinga'),(7,'0801119996564','Maverick','Manuel','Fonseca','M',22222222,0,33333333,'1998-02-02','Tegus','Los alpes',NULL,1,NULL),(8,'0801199991232','Alberto','Jose','Perez','M',22222222,0,33333333,'2000-07-02','Danli','El paraiso',NULL,1,'Bisho');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_notifications`
--

DROP TABLE IF EXISTS `user_notifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user_notifications` (
  `COD_USER_NOTIFICATION` bigint DEFAULT NULL COMMENT 'PK',
  `COD_USER` bigint DEFAULT NULL COMMENT 'FK DE LA TABLA USER',
  `COD_NOTIFICATION` bigint DEFAULT NULL COMMENT 'FK DE LA TABLA NOTIFICATIONS',
  `IS_VIEW` enum('1','0') CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT 'ESPECIFICA SI LA NOTIFACION FUE VISTA POR EL USUARIO  1:Vista, 0:No vista',
  KEY `FK_USER_USNOTIFICATIONS` (`COD_USER`),
  KEY `FK_NOTIFI_USNOTIFICATIONS` (`COD_NOTIFICATION`),
  CONSTRAINT `FK_NOTIFI_USNOTIFICATIONS` FOREIGN KEY (`COD_NOTIFICATION`) REFERENCES `notifications` (`COD_NOTIFICATION`) ON DELETE CASCADE,
  CONSTRAINT `FK_USER_USNOTIFICATIONS` FOREIGN KEY (`COD_USER`) REFERENCES `user` (`COD_USER`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_notifications`
--

LOCK TABLES `user_notifications` WRITE;
/*!40000 ALTER TABLE `user_notifications` DISABLE KEYS */;
/*!40000 ALTER TABLE `user_notifications` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-08-16 22:14:42
