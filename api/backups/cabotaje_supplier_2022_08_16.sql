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
INSERT INTO `accounts_receivable` VALUES (1,13,'SDCSDF',13.00,'2022-08-13',83.00),(2,14,'3dfdf',19.25,'2022-08-07',89.25),(3,32,'Una descripción',5.55,'2022-08-18',5.55),(4,52,'Descripcion',30.55,'2022-08-17',30.55),(5,53,'Descripcion',30.55,'2022-08-17',30.55),(6,54,'Descripcion',30.55,'2022-08-17',30.55),(7,55,'Descripcion',30.55,'2022-08-17',30.55),(8,56,'Descripcion',30.55,'2022-08-17',30.55),(9,57,'Descripcion',30.55,'2022-08-17',30.55),(10,58,'Descripción',30.55,'2022-08-17',30.55),(11,59,'Descripción',30.55,'2022-08-17',30.55),(12,60,'Descripción',30.55,'2022-08-17',30.55),(13,61,'Descripción',30.55,'2022-08-17',30.55),(14,62,'Descripción',30.55,'2022-08-17',30.55),(15,63,'Descripción',30.55,'2022-08-17',30.55),(16,64,'Descripción',28.55,'2022-08-17',28.55),(17,65,'Descripción',28.55,'2022-08-17',28.55),(18,66,'Descripción',28.55,'2022-08-17',28.55),(19,67,'Descripción',28.55,'2022-08-17',28.55),(20,68,'Descripción',30.55,'2022-08-17',30.55),(21,69,'Descripción',30.55,'2022-08-17',30.55),(22,76,'Cuenta por cobrar',20.55,'2022-08-16',20.55),(23,80,'Cualquier cosa',55.00,'2022-08-24',55.00);
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
INSERT INTO `company_data` VALUES (1,'Cabotaje Supplier','Colonia Kennedy','cabotajesupplier@gmail.com','88786952',88795632,'Tegucigalpa, Francisco Morazán','facebook.com','instagram.com',98785236,3);
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
INSERT INTO `inventory` VALUES ('BOL1123',6,'Bolsa de semita','Ricas semitas',0.00,16,1),('CAF123',4,'Cafe Oro','Rico café',0.00,19,1),('CHO123',6,'Chorizo suelto','Rico chorizo',0.00,20,1),('LECH123',1,'Leche sula','Nueva producto de leche',644.00,17,1),('MEN123',1,'Cafe','Saffd',6296.00,2,2),('MOR134',6,'Mortadela','Rica mortadela',0.00,20,1),('PEP123',5,'Pepsi','Rica pepsi',0.00,2,1);
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
INSERT INTO `inventory_transactions` VALUES (6,'MEN123','Entrada',2,'CAF123','2022-07-23 00:00:00'),(20,'MEN123','Salida - Devolución',1000,'CAF123','2022-07-27 19:59:39'),(21,'MEN123','Salida - Compra',50,'CAF123','2022-07-27 20:00:16'),(29,'MEN123','Entrada',25,'MEN123','2022-07-28 00:00:00'),(30,'MEN123','Salida - Mermas',7,'MEN123','2022-07-28 21:41:20'),(31,'MEN123','Entrada',1000,'MEN124','2022-07-28 00:00:00'),(33,'men123','Entrada - Devolución',1000,'MEN123','2022-07-28 22:02:38'),(34,'LECH123','Entrada',25,'LOT1234','2022-07-31 00:00:00'),(35,'MEN123','Salida - Mermas',5,'MEN123','2022-07-31 19:07:58'),(36,'LECH123','Entrada',25,'cal123','2022-08-01 00:00:00'),(37,'LECH123','Entrada',60,'MEL123','2022-08-01 00:00:00'),(38,'LECH123','Entrada',1000,'CHM123','2022-08-01 00:00:00'),(39,'MEN123','Entrada - Compra',5,'CAF123','2022-08-01 22:01:08'),(40,'LECH123','Entrada',25,'PRUEBA123','2022-08-01 00:00:00'),(41,'LECH123','Salida - Devolución',5,'PRUEBA123','2022-08-01 22:41:41'),(42,'LECH123','Entrada - Compra',5,'PRUEBA123','2022-08-01 22:43:03'),(43,'LECH123','Salida - Venta',1,'LOT1234','2022-08-13 00:00:00'),(44,'LECH123','Salida - Venta',1,'LOT1234','2022-08-13 00:00:00'),(45,'LECH123','Salida - Venta',3,'LOT1234','2022-08-13 06:20:25'),(46,'LECH123','Salida - Venta',20,'MEL123','2022-08-13 06:20:26'),(47,'LECH123','Salida - Venta',2,'LOT1234','2022-08-13 07:16:49'),(48,'LECH123','Salida - Venta',15,'MEL123','2022-08-13 07:16:50'),(49,'MEN123','Salida - Venta',1,'MEN124','2022-08-16 19:50:33'),(50,'LECH123','Salida - Venta',15,'cal123','2022-08-16 19:52:39'),(51,'LECH123','Salida - Venta',25,'PRUEBA123','2022-08-16 19:52:40'),(52,'LECH123','Salida - Venta',1,'CHM123','2022-08-16 20:03:30'),(53,'LECH123','Salida - Venta',1,'CHM123','2022-08-16 20:03:53'),(54,'LECH123','Salida - Venta',1,'CHM123','2022-08-16 20:04:06'),(55,'LECH123','Salida - Venta',1,'CHM123','2022-08-16 20:05:23'),(56,'LECH123','Salida - Venta',1,'CHM123','2022-08-16 20:09:04'),(57,'LECH123','Salida - Venta',1,'CHM123','2022-08-16 20:11:28'),(58,'LECH123','Salida - Venta',1,'CHM123','2022-08-16 20:15:42'),(59,'LECH123','Salida - Venta',1,'CHM123','2022-08-16 20:15:50'),(60,'LECH123','Salida - Venta',1,'CHM123','2022-08-16 20:15:54'),(61,'LECH123','Salida - Venta',1,'CHM123','2022-08-16 20:19:37'),(62,'LECH123','Salida - Venta',1,'CHM123','2022-08-16 21:03:24'),(63,'LECH123','Salida - Venta',1,'CHM123','2022-08-16 21:04:20'),(64,'LECH123','Salida - Venta',1,'CHM123','2022-08-16 21:05:44'),(65,'LECH123','Salida - Venta',1,'CHM123','2022-08-16 21:05:45'),(66,'LECH123','Salida - Venta',1,'CHM123','2022-08-16 21:08:05'),(67,'LECH123','Salida - Venta',1,'CHM123','2022-08-16 21:08:08'),(68,'LECH123','Salida - Venta',1,'CHM123','2022-08-16 21:08:11'),(69,'LECH123','Salida - Venta',1,'CHM123','2022-08-16 21:08:12'),(70,'LECH123','Salida - Venta',1,'CHM123','2022-08-16 21:08:14'),(71,'LECH123','Salida - Venta',1,'CHM123','2022-08-16 21:08:14'),(72,'LECH123','Salida - Venta',1,'CHM123','2022-08-16 21:08:15'),(73,'LECH123','Salida - Venta',1,'CHM123','2022-08-16 21:08:15'),(74,'LECH123','Salida - Venta',1,'CHM123','2022-08-16 21:08:16'),(75,'LECH123','Salida - Venta',1,'CHM123','2022-08-16 21:08:16'),(76,'LECH123','Salida - Venta',1,'CHM123','2022-08-16 21:08:17'),(77,'LECH123','Salida - Venta',1,'CHM123','2022-08-16 21:09:11'),(78,'LECH123','Salida - Venta',1,'CHM123','2022-08-16 21:09:55'),(79,'LECH123','Salida - Venta',1,'CHM123','2022-08-16 21:12:20'),(80,'LECH123','Salida - Venta',1,'CHM123','2022-08-16 21:12:22'),(81,'LECH123','Salida - Venta',1,'CHM123','2022-08-16 21:12:39'),(82,'LECH123','Salida - Venta',1,'CHM123','2022-08-16 21:16:30'),(83,'LECH123','Salida - Venta',1,'CHM123','2022-08-16 21:16:34'),(84,'LECH123','Salida - Venta',1,'CHM123','2022-08-16 21:16:35'),(85,'LECH123','Salida - Venta',1,'CHM123','2022-08-16 21:16:35'),(86,'LECH123','Salida - Venta',1,'CHM123','2022-08-16 21:16:36'),(87,'LECH123','Salida - Venta',1,'CHM123','2022-08-16 21:16:36'),(88,'LECH123','Salida - Venta',1,'CHM123','2022-08-16 21:17:15'),(89,'LECH123','Salida - Venta',1,'CHM123','2022-08-16 21:17:17'),(90,'LECH123','Salida - Venta',1,'CHM123','2022-08-16 21:17:17'),(91,'LECH123','Salida - Venta',1,'CHM123','2022-08-16 21:17:17'),(92,'LECH123','Salida - Venta',1,'CHM123','2022-08-16 21:17:36'),(93,'LECH123','Salida - Venta',1,'CHM123','2022-08-16 21:17:37'),(94,'LECH123','Salida - Venta',1,'CHM123','2022-08-16 21:17:39'),(95,'LECH123','Salida - Venta',1,'CHM123','2022-08-16 21:17:40'),(96,'LECH123','Salida - Venta',1,'CHM123','2022-08-16 21:17:41'),(97,'LECH123','Salida - Venta',1,'CHM123','2022-08-16 21:17:41'),(98,'LECH123','Salida - Venta',1,'CHM123','2022-08-16 21:18:34'),(99,'LECH123','Salida - Venta',1,'CHM123','2022-08-16 21:20:13'),(100,'LECH123','Salida - Venta',1,'CHM123','2022-08-16 21:21:56'),(101,'LECH123','Salida - Venta',1,'CHM123','2022-08-16 21:22:02'),(102,'LECH123','Salida - Venta',1,'CHM123','2022-08-16 21:22:17'),(103,'LECH123','Salida - Venta',1,'CHM123','2022-08-16 21:22:18'),(104,'LECH123','Salida - Venta',1,'CHM123','2022-08-16 21:26:32'),(105,'LECH123','Salida - Venta',1,'CHM123','2022-08-16 21:28:48'),(106,'LECH123','Salida - Venta',1,'CHM123','2022-08-16 21:29:52'),(107,'LECH123','Salida - Venta',1,'CHM123','2022-08-16 21:37:26'),(108,'LECH123','Salida - Venta',100,'CHM123','2022-08-16 22:00:45'),(109,'LECH123','Salida - Venta',100,'CHM123','2022-08-16 22:00:53'),(110,'LECH123','Salida - Venta',100,'CHM123','2022-08-16 22:02:30'),(111,'LECH123','Salida - Venta',15,'CHM123','2022-08-16 22:03:50'),(112,'LECH123','Salida - Venta',20,'CHM123','2022-08-16 22:04:19');
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
  `USER_PASSWORD` varchar(255) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT 'CONTRASEÑA DEL USUARIO',
  `DAT_CREATE` datetime NOT NULL COMMENT 'FECHA DE CREACIÓN',
  `DAT_EXP` datetime NOT NULL COMMENT 'FECHA DE EXPIRACIÓN',
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
INSERT INTO `modules` VALUES (1,'Dashboard',NULL),(2,'Facturar',NULL),(3,'Ventas',NULL),(4,'Compras',NULL),(5,'Personas',NULL),(6,'Producción',NULL),(7,'Contabilidad',NULL),(8,'Seguridad',NULL),(9,'Gráficas',NULL);
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
INSERT INTO `ms_bitacora` VALUES (2,3,'Agregar','Usuarios','','Mendel Aguilar','','','2022-07-24 16:11:40'),(3,4,'Editar','Usuarios','Contraseña','Luis Garcia','','','2022-07-24 16:13:36'),(4,3,'Agregar','Usuarios','','Lisandro Lopez','','','2022-07-31 19:21:37'),(5,3,'Editar','Usuarios','Estado','Lisandro Lopez','Activo','Inactivo','2022-07-31 19:31:42'),(6,3,'Editar','Usuarios','Apellido','Lisandro Maradiaga','Lopez','Maradiaga','2022-07-31 19:34:04'),(7,3,'Editar','Usuarios','Teléfono 1','Lisandro Maradiaga','22222222','33333333','2022-07-31 19:34:04'),(8,3,'Editar','Usuarios','Estado','Lisandro Maradiaga','Inactivo','Activo','2022-07-31 19:34:04'),(9,3,'Agregar','Usuarios','','Enrique Ortez','','','2022-07-31 19:38:53'),(10,3,'Agregar','Usuarios','','Maverick Fonseca','','','2022-08-02 21:07:47'),(11,3,'Agregar','Usuarios','','Alberto Perez','','','2022-08-02 21:11:12'),(12,3,'Agregar','Usuarios','','Carlos Flores','','','2022-08-02 21:15:29'),(13,3,'Eliminar','Usuarios','','Carlos Flores','','','2022-08-02 21:15:56'),(14,3,'Editar','Usuarios','Contraseña','Mendel Aguilar','','','2022-08-02 22:20:05'),(15,3,'Editar','Usuarios','Contraseña','Mendel Aguilar','','','2022-08-08 21:09:23'),(16,3,'Editar','Usuarios','Contraseña','Mendel Aguilar','','','2022-08-08 21:09:26'),(17,4,'Editar','Usuarios','Contraseña','Luis Garcia','','','2022-08-11 20:35:39'),(18,3,'Editar','Usuarios','Contraseña','Mendel Aguilar','','','2022-08-11 20:43:58'),(19,3,'Editar','Usuarios','Rol','Mendel Aguilar','Administrador','Cajero','2022-08-12 23:53:58'),(20,3,'Editar','Usuarios','Apellido','Luis Garcia','Mendez','Aguilera','2022-08-15 23:27:22'),(21,3,'Agregar','Usuarios','','Juan Bandido','','','2022-08-15 23:30:13'),(22,3,'Editar','Usuarios','Apellido','Juan Bandido','Figueroa','Mendez','2022-08-15 23:30:29'),(23,3,'Editar','Usuarios','Apellido','Luis Garcia','Aguilera','Aguilera','2022-08-15 23:31:03'),(24,3,'Editar','Usuarios','Teléfono 2','Luis Garcia','0','33333333','2022-08-15 23:31:03'),(25,3,'Editar','Usuarios','Segundo apellido','Alberto Perez','Messi','Bisho','2022-08-15 23:41:23'),(26,3,'Eliminar','Usuarios','','Juan Bandido','','','2022-08-16 22:14:18');
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
  `DES_OUTPUT` text CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT 'DESCRIPCIÓN',
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
  `TYP_TO_PURCHASE` enum('Crédito','Contado') CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT NULL COMMENT 'TIPO DE COMPRA',
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
  `TYP_TO_SALE` enum('Crédito','Contado') CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL COMMENT 'TIPO DE VENTA',
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
INSERT INTO `sales_invoice` VALUES (1,1,3,238.00,0.00,42.00,280.00,'Contado',1,'2022-08-13'),(2,1,3,238.00,0.00,42.00,280.00,'Contado',1,'2022-08-13'),(3,1,3,238.00,0.00,42.00,280.00,'Contado',1,'2022-08-13'),(4,1,3,212.50,0.00,37.50,250.00,'Contado',1,'2022-08-13'),(5,1,3,212.50,0.00,37.50,250.00,'Contado',1,'2022-08-13'),(6,1,3,212.50,0.00,37.50,250.00,'Contado',1,'2022-08-13'),(7,1,3,212.50,0.00,37.50,250.00,'Contado',1,'2022-08-13'),(8,1,3,1263.75,0.00,11.25,1275.00,'Contado',1,'2022-08-13'),(9,3,3,283.00,0.00,0.00,283.00,'Crédito',1,'2022-08-13'),(10,3,3,283.00,0.00,0.00,283.00,'Crédito',1,'2022-08-13'),(11,3,3,283.00,0.00,0.00,283.00,'Crédito',1,'2022-08-13'),(12,3,3,283.00,0.00,0.00,283.00,'Crédito',1,'2022-08-13'),(13,3,3,283.00,0.00,0.00,283.00,'Crédito',1,'2022-08-13'),(14,3,3,880.85,0.00,8.40,889.25,'Crédito',1,'2022-08-13'),(15,1,3,21.00,0.00,0.00,21.00,'Contado',1,'2022-08-16'),(16,1,3,1083.25,0.00,0.00,1083.25,'Contado',1,'2022-08-16'),(17,1,3,30.55,0.00,0.00,30.55,'Contado',1,'2022-08-16'),(18,1,3,30.55,0.00,0.00,30.55,'Contado',1,'2022-08-16'),(19,1,3,30.55,0.00,0.00,30.55,'Contado',1,'2022-08-16'),(20,1,3,30.55,0.00,0.00,30.55,'Contado',1,'2022-08-16'),(21,1,3,30.55,0.00,0.00,30.55,'Contado',1,'2022-08-16'),(22,1,3,30.55,0.00,0.00,30.55,'Contado',1,'2022-08-16'),(23,1,3,30.55,0.00,0.00,30.55,'Contado',1,'2022-08-16'),(24,1,3,30.55,0.00,0.00,30.55,'Contado',2,'2022-08-16'),(25,1,3,30.55,0.00,0.00,30.55,'Contado',3,'2022-08-16'),(26,1,3,30.55,0.00,0.00,30.55,'Contado',1,'2022-08-16'),(27,3,3,4088.20,0.00,0.00,4088.20,'Crédito',2,'2022-08-16'),(28,3,3,4088.20,0.00,0.00,4088.20,'Crédito',2,'2022-08-16'),(29,3,3,4088.20,0.00,0.00,4088.20,'Crédito',2,'2022-08-16'),(30,3,3,30.55,0.00,0.00,30.55,'Crédito',1,'2022-08-16'),(31,3,3,30.55,0.00,0.00,30.55,'Crédito',1,'2022-08-16'),(32,3,3,30.55,0.00,0.00,30.55,'Crédito',1,'2022-08-16'),(33,1,3,30.55,0.00,0.00,30.55,'Contado',1,'2022-08-16'),(34,1,3,30.55,0.00,0.00,30.55,'Contado',1,'2022-08-16'),(35,1,3,30.55,0.00,0.00,30.55,'Contado',1,'2022-08-16'),(36,1,3,30.55,0.00,0.00,30.55,'Contado',1,'2022-08-16'),(37,1,3,30.55,0.00,0.00,30.55,'Contado',1,'2022-08-16'),(38,1,3,30.55,0.00,0.00,30.55,'Contado',1,'2022-08-16'),(39,1,3,30.55,0.00,0.00,30.55,'Contado',1,'2022-08-16'),(40,1,3,30.55,0.00,0.00,30.55,'Contado',1,'2022-08-16'),(41,1,3,30.55,0.00,0.00,30.55,'Contado',1,'2022-08-16'),(42,1,3,30.55,0.00,0.00,30.55,'Contado',1,'2022-08-16'),(43,1,3,30.55,0.00,0.00,30.55,'Contado',1,'2022-08-16'),(44,1,3,30.55,0.00,0.00,30.55,'Contado',1,'2022-08-16'),(45,1,3,30.55,0.00,0.00,30.55,'Contado',1,'2022-08-16'),(46,1,3,30.55,0.00,0.00,30.55,'Contado',1,'2022-08-16'),(47,1,3,30.55,0.00,0.00,30.55,'Contado',1,'2022-08-16'),(48,1,3,30.55,0.00,0.00,30.55,'Contado',2,'2022-08-16'),(49,1,3,30.55,0.00,0.00,30.55,'Contado',2,'2022-08-16'),(50,1,3,30.55,0.00,0.00,30.55,'Contado',3,'2022-08-16'),(51,1,3,30.55,0.00,0.00,30.55,'Contado',1,'2022-08-16'),(52,3,3,30.55,0.00,0.00,30.55,'Crédito',1,'2022-08-16'),(53,3,3,30.55,0.00,0.00,30.55,'Crédito',1,'2022-08-16'),(54,3,3,30.55,0.00,0.00,30.55,'Crédito',1,'2022-08-16'),(55,3,3,30.55,0.00,0.00,30.55,'Crédito',1,'2022-08-16'),(56,3,3,30.55,0.00,0.00,30.55,'Crédito',1,'2022-08-16'),(57,3,3,30.55,0.00,0.00,30.55,'Crédito',1,'2022-08-16'),(58,3,3,30.55,0.00,0.00,30.55,'Crédito',1,'2022-08-16'),(59,3,3,30.55,0.00,0.00,30.55,'Crédito',1,'2022-08-16'),(60,3,3,30.55,0.00,0.00,30.55,'Crédito',1,'2022-08-16'),(61,3,3,30.55,0.00,0.00,30.55,'Crédito',1,'2022-08-16'),(62,3,3,30.55,0.00,0.00,30.55,'Crédito',1,'2022-08-16'),(63,3,3,30.55,0.00,0.00,30.55,'Crédito',1,'2022-08-16'),(64,3,3,30.55,0.00,0.00,30.55,'Crédito',1,'2022-08-16'),(65,3,3,30.55,0.00,0.00,30.55,'Crédito',1,'2022-08-16'),(66,3,3,30.55,0.00,0.00,30.55,'Crédito',1,'2022-08-16'),(67,3,3,30.55,0.00,0.00,30.55,'Crédito',1,'2022-08-16'),(68,3,3,30.55,0.00,0.00,30.55,'Crédito',1,'2022-08-16'),(69,3,3,30.55,0.00,0.00,30.55,'Crédito',1,'2022-08-16'),(70,2,3,30.55,0.00,0.00,30.55,'Contado',1,'2022-08-16'),(71,2,3,30.55,0.00,0.00,30.55,'Contado',1,'2022-08-16'),(72,2,3,30.55,0.00,0.00,30.55,'Contado',2,'2022-08-16'),(73,2,3,30.55,0.00,0.00,30.55,'Contado',3,'2022-08-16'),(74,2,3,30.55,0.00,0.00,30.55,'Contado',1,'2022-08-16'),(75,2,3,30.55,0.00,0.00,30.55,'Contado',1,'2022-08-16'),(76,2,3,30.55,0.00,0.00,30.55,'Crédito',1,'2022-08-16'),(77,1,3,30.55,0.00,0.00,30.55,'Contado',1,'2022-08-16'),(78,1,3,3055.00,0.00,0.00,3055.00,'Contado',1,'2022-08-16'),(79,1,3,3055.00,0.00,0.00,3055.00,'Contado',2,'2022-08-16'),(80,1,3,3055.00,0.00,0.00,3055.00,'Crédito',2,'2022-08-16'),(81,3,3,458.25,0.00,0.00,458.25,'Contado',1,'2022-08-16'),(82,3,3,611.00,0.00,0.00,611.00,'Contado',1,'2022-08-16');
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
INSERT INTO `supplier` VALUES (1,'Leche sula','Mendel','Aguilar','Las palmas',22321456,0,'mendel@hotmail.com','Tegus',11101),(2,'Coca Cola','Carlos','Zuniga','Tegucigalpa',98563214,0,'carlos@hotmail.com','Tegucigalpa',11101),(4,'NES Café','Pedro','Matamoros','La kenya',22222222,0,'pedro@a.com','Tegus',11101),(5,'Pepsi','Carlos','Lopez','La cañada',22222222,0,'a@a.com','Danlí',11101),(6,'Quesos Olancho','Exequiel','Bonilla','Olanchito',33333333,0,'b@b.com','Juticalpa',11101);
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
INSERT INTO `tables` VALUES (1,1,'Dashboard'),(2,2,'Facturar'),(3,3,'Ventas'),(4,4,'Compras'),(5,4,'Pedidos'),(6,5,'Clientes'),(7,5,'Proveedores'),(8,6,'Inventario'),(9,6,'Categorías'),(10,6,'Movimientos'),(11,6,'Devoluciones'),(12,6,'Mermas'),(13,7,'Cuentas cobrar'),(14,7,'Cuentas pagar'),(15,7,'Devoluciones'),(16,7,'Rebajas'),(17,7,'Planilla'),(18,8,'Usuarios'),(19,8,'Roles permisos'),(20,8,'Bitácora de usuarios'),(21,9,'Gráficas');
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
INSERT INTO `typ_product_entries` VALUES (1,'Compra','Compra a proveedores'),(2,'Devolución','Devoluciones entrantes');
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
INSERT INTO `typ_product_output` VALUES (1,'Venta','Venta a proveedores'),(2,'Devolución','Devoluciones a proveedores'),(3,'Mermas','Mermas de productos');
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
INSERT INTO `user` VALUES (3,'0801199912345','Luis','Eduardo','Garcia','M',88795986,33333333,22101972,'1998-02-12','Tegucigalpa','Res. Plaza',_binary '�\��\�\0JFIF\0\0`\0`\0\0�\�\0C\0\n\n\n		\n\Z%\Z# , #&\')*)-0-(0%()(�\�\0C\n\n\n\n(\Z\Z((((((((((((((((((((((((((((((((((((((((((((((((((�\�\0rr\"\0�\�\0\0\0\0\0\0\0\0\0\0\0\0\0\0�\�\0\0\0\0\0\0\0\0\0\0\0\0�\�\0\0\0\0ڀ\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0R\n|mO\�\�\��\'��{@\0\0\0\0\0\0\0\0�R��)��\"�\�};���\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0�\�3Q�	\�\"�h�!\���\�}Q\�I\�\�\0\0\0\0\0\0\\�S�\�ȕ<�>&��D\�M\�\0\0\0\0\0\0\0\0\0\0\0\0\0\0׵H\�>�wBh>\�$-�¼ч\��\�\�\�\0\0\0\0\0C0u=D�%�\�\�\�Ow\Z�\�\�G\�\Z�k�\0\0\0\0\0\0\0\0\0\0\0\0\0M\�O�\�}�G���\�\�;��\�yq\�\�7�\�>�Vl�\0\0\0�\�\�@\�`��\�~��ѓfU�U1���[\�rH\0\0\0\0\0\0\0\0\0\0\0\0\0�\�п<+d胜�+\�Qd\�_�\�\0&7\�̓\���\��W\�>�|\�\��;��q�\��dK\�*(\0�va/��X,ps�\Zg\�{\�D\�\�g\0\0\0\0\0\0\0\0\0\0\0\0\0\0):/t\�b\�\'��1r�b�o�#|\�\"�[aNla�W�2�\'#\�\�epR#m\�}p\�(M�\�\�\�L\�\0\�<gq%\�\�>�\��g�5\�\�\�`\0\0\0\0\0\0\0\0\0\0\0\0\0\rq�7�/�0�g�c\�4��\�\�ah�\0\0\0\0\0��5���\0��\�,=\�y\�\�\�{8�t\�5\�ڍy7�\0\0\0\0\0\0\0\0\0\0\0\0\0_im\�-��}<#fz\�?H�/+\�\�`J\�\0\0�\�I8\�\0�\0,\�F�ٴ\�\�\�&A�\"e��n�A\�&\�\0\0\0\0\0\0\0\0\0\0\0\0\0\0V>|�g\�c����%�3\"\�Ó\�3\���d���\�[u6M3\�\�RE��/����{�\r�Ʒ\�l���.\�\�\�ܥ\�d�2\�+d���P\�\�\�۸�\0\0\0\0\0\0\0\0\0\0\0\0\0\00o�ι��\��rnga��#�g�\��\"��aJ�n(\�\�H���� \�d1��H�,\�G�\\\�F$\�	��\�x�\�O\�\�d\� \0\0\0\0\0\0\0\0\0\0\0\0\�力� %�fI�oR[\�3�Ɔ\�,��t�־��_\����:\r�\�\�F���\�\�,G\�󧞶�|\�t��b�\n���V;Iɒ.?+Ưث\��\�\�ߝ��=�\0\0\0\0\0\0\0\0\0\0\0\n��}|G��ፘx\�\�\�	\ZM�\�n��3u�sxt4Ch\�,�\�\�:ܛ�kuJ�I>M\�ۦЍc\�J\�P,7%i]�T\�\�1\�K��W4�\�\�\�x{�KDA�u\����6x\0\0\0\0\0\0\0\0\0\0�ghn�\�/�\�\��=/qJ�l\�\�h�\�/Ib�\�\�p��\�:٠{\�aj_s(9\�([�dt\�l|����\�\�\�h���+\�\�\Z\�\�\Z\�\�i\��\0�Y^^�1��sp\�\�O�Z�j�\0\0\0\0\0\0\0\012\�\rk�-U0	Zϡebe�EE\� O}��gc{\�\�\�Y֥\��\�\�f�\�\�\�\�맲9\�ߝ�\�\�\�T\�����\�78\�zq�ai�Z��\��R�:q\�ǧ{s\�v\\4�u��e��\�/\�^��\�=c\�1�\�An�\�\�f�n\0\0\0\0\0\0\0\0\0�&�5\'�;&\�Y^@|�W\�#\�v�%�skz[\�\�H�\�`\�|\�-ΟϮܳk-�\�\�\�\�\�G\��[Z��\�l\�9\�#R\�\�\\�^:\�\�����9��>�\\9-g.�\�s�\�\���\003\�k\�\�\0yp\�m�\0\0\0\0\0\0\0\0\0\01>o�k�e�� \�C\�ڱ�N\��\�fA\�\�\��Z[{+7�w\�f��\�^�\�4��/\��*&k��h\�\�Z�X\�\�IJ�\�${G�,\�{\�-ՠ,\�\�驙1W�%�\�\�H�Q��+eb�~��\��}\�\�\0\0\0\0\0\0\0\0FO\�\��s`��\0DK\�l�s�MY�Y������2�\�y\�����DF��3\�NǔFG��~I��\�dr9�)]Me�Jєhe���MC�\�\Z��\�Z\�4�\�\��\0,n\�\�\0\0\0\0\0\0\0r�\�xߤ\�ACs�\�V ZQ\��vZ$\�5Nݗ]\\\�&\�\�\�\Z\\=E�\�\�\�{KNDWҍs��q�y\�%�\�\�\�\�ۓϷa\�\�s\�\�xc\�Г+Dƶ��\�t\��MǦ^��\�\�g��\�\��1��:c�a:\�\0zXv\�\�p\0\0\0\0\0\0\0\0�����>iO@��ܓ�^x6\�>g7\�?\�_<\\\��!�aPvO�����\�,�jNa\�G��C�\�0\�03\�x�\�Q���[dg\��\�)\�/L�a\�>G$4\�a\�o_\r\�\�\�g�رZν�\0\0\0\0\0\0\0\0\0�\0����>t{x��{9�\�p\�q�;��G��#�\�R�h�\�;$�\�|e\�..\'nqε����\01+/���\�\�9q\�p<����V��uֲ\�\�\� \0\0\0\0\0\0\0\0\0\0\0�5g\��\04�\�]\�#i\�\�x�I*����\�GG�D�)�v��\�\�cw\�̗%\�q\�q\�񎔆%5&\�\�^��\�4KÑÞ�c[ܴ\���}ӻ\\�UW~ճ�\0\0\0\0\0\0\0\0\0\0\0\0i\�\�|\�\�ӂz�RͶ4ߖ~Z77+\�2P\�\�\n�/[�]\��\0�\�\��\��e\��\�\��*t�qL�rj���L�\����\�{\�\�\�\�\�\���V��\'�I�nx\'��\�[\0\0\0\0\0\0\0\0\0\0\0\0\0��ۯJ\0\'\��\�d\�\�-#.f>E<�R\��\�\�}\�ΟD�R��\�\�Ķ	�=\�H�LC\�}W�5�n^\�\�;d\�\�\�e\�\ZV\�Ն�����S\'`�(\0\0\0\0\0\0\0\0\0\0\0\0\0\�柧5Q��\�6q�:l]tIn=u����\�u3P�{�\�/_�jF�\�\�\�4n1VOq,D��\�\�x�j\rɻun\�\���˶�Ʋ��b\�s�L:\�ϫu8\'�\�޺(}\r�7�\0\0\0\0\0\0\0\0\0\0\0\0\0\01�G\�;*\�\0_�v�N�|\�Ϸ��\�\�\'f\�\�\�\"�%�\�?E\�\�ԛwRY��k?�(r\�4�N�4´Jl}>~ٺ\�l�}�\�\�\\h�u=�x槯\�U��W~{��[,`\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\�\�\0Q4�\��\�\�]�M�t\�\�v\\\�~moR�f��\���\�SLK�\�\nͣ-�\"e\�\�\�&u�W�%�To��\�ug�1�\��ۤ\�p\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\��g\�j��ٸD\�\�\�\�1�rks�\�}ݞ|獼\�γ�)۶ӈ�����u\�\��=u\�uwY�\�e\�qӸ\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0:7\�s\�\�Θe\�};�\�f�fβ\��*>w1$\�w���:\�.�&kwJ\�\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0礷��\�\�\�I3����\�\�\�:�\�?\�\�\�vY\�O\�ҵ�3^�\�\"\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0x\�m�\0�|�.[C\�)lݺ�U�\�\�xp\�\�\��\�\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\07\�_OS\���\�\�:\�w6�_5;o\n\�\�\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\05V���BO|p��}gw\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0d���w\�K�\�\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\�\�\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0\0?�\�\02\0\0\0\0\0\0 !@P\"123#$%04`5���\�\0\0�\0�7eD\�3\�\�\Z�$�BO����&jyn\�+�lMa\�}��\�/G@�z\�IU\�Ss�>�|\� �k&f����\�;\��\\���S�U�\�4���\�vQZ=E\�\'\�\�]\�7%HvS\�\�$x\�q\�\�(Q�@\�g$�i\�S|l6=\�\�/v\�\�P\�\�ڂ\����\�b��\�s�@�\�&�r��\�Ka\��^\�Z͟R\�i<=\\\�-vM�\�\��1$!�Iw\�\�3]�`N��\�\�\�/S/\�\���S\�\�\�9T\�X\�LO\�&����\�f\�ӗ\�jK�F\�\�\�1NU#�76|<�投��ϭ$w��*\�\�nG() \�wɒ[Ƥ�a�:\��Z\�\�?漳\Z许N��A\�]�����M�BY�\�̲px\�R\�\���g�{\�Z@\�\�_�\�\�$G\0\�ױl�t6Ic��\�7=�\�\'\�\�\�T��\nu^#\re\�~<�{\�@�,�<1r����\�\�q[�d�\�߶�i\�\�(F	6*\�Hd�ܯ68�#&z�y�-=d�l1�Db8�\�\�>U>-G�\\\�.�)�˨�\�K�\�\�}�\'\���\�\�P\���\0��\��\�\�pa\�O,)rO��Į\�`;�\�r\�҇�|\����\�\�\�O�\�\�=�f\�9C�IԿ\�0\�6ͳoT� �H_�\"N��tn �����\�U�ِ\�\�\��+\�\�~`�\0	\\�\�I��\n#�Z\�\�ՖEnDG?4A\��gp+\\\nƓq\�a�\�x\�\\I,s\�8\�u\���\0�@(#�����_�\�o\���y�������k��\�\�#�\��	�\��Гa2GUTM�y-�\0�\�]m��T�1p\�6\�\�SW\�\�WA|\�\�h��_�+f�`t�{�J\�=��9\����V3G�\0\���Z�\�ܦ?ǎ��\"\�<\\s��\��ǂ\�_J\�V�\�p͍�q\��d\�\ZakC\�4bsk\�]`<\�\�\�\�ؗ�\�2,r�l�,��L�55�=\�\�i�jj<~\�NR|5g#�\�\�*\�\�\��\�D�\��eԡޓh\�yX\�G�9\����[\�\�\�6TEI\�<\nėY\�\�\�w$؈\�{\"L9��r\':\�Fd�:\�B\�{\�;ѾY5`�Ҝ\�\�\��\�-�k\��w\�\�1~qo�a���\�\�\�&b�!*`\�xqf<M���\�\"R�,S%\�E\\F\\b;�\�.\�\�	䖹\�Nq�a\�{�(\�h\��\�}�S~Xˊۛ��DW<a����\�g�X�\�<8��\��EK.5.za\�L�\0\�{:ߐ�\�z�\�^Wi�)\�\r���˨,�\�U\�r(\�wf\�#��)���\�\�\�5Ko���:8\�q,6\�aE%n66)�6�8\ri	#\�L\�\�!\�`�m�,��<\�2ռ㰙�/\�A\�W\�4ʕ�b\�9�\�\���\\nŒ�1q%�\0����\'!\�\�p�AU9\�ccq\�p9V\�d�-\�]7J��uTDv{�i�\�\�\�\�n`\�cv��\��\�$~\�\�8M9O<la��UZ��7��1�SV�\0eG	\0\�dӞ�2� D\�\�&\�\�DTv>\�2��	>g�UW\"L\�\�<\�/�>r4i9G�P\�\�\�ޖī�4\�\�\�u=��o`5m�g+��[\�\�\Z|2��$�\�Q\���\���m]/�\�4��1��~U\�@Tȓ�`	\Z�O-\�f��\�(qa�\�F\�Oz\�&)*�hOe[\�L[�W>�{j\�:\�:\�2Ҹ�()��\�U\�}:\\XlB��\�c��`�X�)\�2l=����\�$$v̔\�)��3~$K�D	��\�#��/\�nA���\�8\�L\\\�O���n��/�%\�a�\"�p�� �����,�\�3G$\�G����/����H\�b\�z�\'��ETXR=CN��\'\�\�?\��2\�l�2��8\�v<��\�\��$\�~>\�J\n˨\�{$3\��v\�ΟYwx\�}\�}\�e�!\n ��\�\��2�I���(\�\�29\�\�8|\���nY8h!�\�Z\�&3\�\�\�g��l%y\�j�\�\�7�4\�:k0��y\�1��tVC�6\�2u;/\�\�\�s�U�\�\�,\�އP񈼧\�I�\�f\�\�!��\�/� �{%5�)G�2��\�|���\�..���:�bc\Z�\"ZÕ����aGe\�\��,\�-#V^\�M�f���%6HD�\�;om&dhc#R�8椖��\0\�gd\�\�\�d��[ج\�\�\�|{\��>ʋ�\�\�\�4\��{(X1gG*\n��U��\�k\��\�*f,I,9\�Ia�,\�\�82��IK�U�e\�O8\�d��1	sSW?)W\�\�A\\��v\�3<\�\�\�s��v�,\�[�\�6\�\�;\�\�j��\nvVǠ\�\�#���\�]&qRҳ]\�V5�\�}{\�\�e\��\�m3+\�ARD\�h�O��Fô��y\�8�K\�\Z&\�\�<\�\r`˪p�&\�\�/�\�\�\�n1�:\�%4oC~k�ni�\�h�>@Ĉ\�+���\�<\�u!Q]\�\�}|�\"�)\�Z\����<a��\�yQ]\�?\'\�Y\�.Zյ1��*���2��D���t��e\�TW��i\�\��#g��\�\�\�(kF\�*\�d��tԨ\��\��\�\n�>\�\\\�J\�\����S\�\Z<\�\'.V\�Z\�6\\m�4\�K�Go\�+\�\�0�յ\�8\"\�J�h\�\�Ya�\"?4\����8]GP¢/���_�J\��\0A�\\|adj��\���K\�-dz�\r��\�쪂�Hi�\��~m=a\�\�}N��\�=�v��\�K�I\� \�V):ѵ���\�	S�&3\�x��&<\�<\�l�e��f�y���\�v+�Lj�A\r�ԱY<FK\0r\�\�O]�#\�\�\�J\�JI�)d\"\�KozI\�_4	>�QZ%|e^WfC�o0����{PD\�F��\�ƫ�V��DW\r�qZ$\�9|l\�u\r��\ZT^��ۘ\�M�+\�\�F�`�J��\�c\�\�\�9G�\�\�x�{[��L�\�E\�{.\�bV�Q2c�!�E�r\�ÑKx��\�~W�\�*�*�B��>\�-�`4��e\���\�\�AG\�fF`c��P}+\�\n��x�\�\�e\�7�?\"\�v\�&�\��/�4�ɓ�\�?\�\�V\�QH�o\�Π��\�rEaƐ�[$\�,�g\�r՗/\�\�6Q��\��\�e\�>QEPqS�@\�6yx\�ɒ\�P�\�&\�\0\�\��M�`3�℘\�Il\�PF\�\r�C/óΣhD���(��2S?I:�4\�ӏ\�\�\�w�\�\�)Z\�\�\�.8t�UU\�Tv\�a\�f���>��%~\Z^\�W�O\�\��\�J���j	Ʈu\�t\�0\�+k\�b|b:I���\�B�f�k\�dR\�\�y\����\�t\�l��$/���b~M�\�\'�E\�Y? H.\�\�c�dd؁�\�p�caJ��Efc\�ɏ\�~�q/W\��\0\�E�E\�5W�T\n��\�X\�Eo<*��.b;>��_G\�Ub|/d\�\�\�-�	æӂ���Sa	�\�Zֽ\\�̹\�-�\�>(�\�/w<��\�a��\'\�2\�8]Bk�(��m��{�~h���\0��\��r�y�tTT:Ⲹ\��\�\�R�	��[w\�V��Ò^��j�>�lV�G��\�|�\�m]z\" �\'d\�}�\�0\�DM�%tx���c\�=\�K\�H�}�w��Kob\n��=�w\�x\�7i�u\�:��c\�k\�\�#�M9��k\�a9D_\�/\�/\�ٟ{\��$/\�\�H��\����[��\�^[�\0)\��\0���\�\��_���k\Z�m0)\�\�q+W\\�\��\0��\�\�\�\�.���%~c~^\�m�\�\�N[\��\0\�Ds\�\Z7\�\�U\�\0�f��_\� X$�V]���\�\���S&4���\�O\�\�Mԯ\�\�i�^��@��\'�\�\�2\��͓)\�o/.G��q~��\�T|J�>\���/j�c�vW��\\2q\��3\�$��\�a�Jϱk(~98�W��9�\��K?[eп4l��\���If] U\�c\�#aG!eW��.�\�\�\�P\��oW\'�\�H \�J�;*\���a|�\\\�r�\0G.�\�?\�\'\�$?[e\�;����\�Q/\�\�\�\�W7q8;\�ⲭx�?Ө\�t��lB1���\�c3�{^+�z��l��������j.��\�\�j\��\�\�\�8�v\�\�<\�ԧ�D�f��\�\�MI\�Z�)��Yx�¯\�\�\�e\�pd�j%�\�z\�w\�\�\�X�\0��V��]�U�6�a�i95TDd��a�bU\�mI/\�\�D�љ\��ɬ\"y�{h\����F_Ç\'\�ݸ��R綽M\�ڔ]\�\n\��\\u�mvRT����\�D]\�\�)sq�܎�r�|#��m-\�\�	\�=�:\'�w\�^l^jdr�++a�\n�+�$�I-��\�uA^ê\"�\�Q]�]P\�\�e\�\�\�B#\�ғ����&\���\�Y��]\�w�\�\�̫kf�7�\Z93�ϳ{_L\�\�\\j�m?\�V}�YA\�D7\�ڶ�\��\��e�\�H�6�\�\�X�\0�\�S\�\�ٵ៳/\'WE�9_ 4گ+�c^2\�\"4�����\�lT��k�������\�R\��\0\�9\�\���K!!��^�O\�\�X��p%\�Ke\���y�W���)\"�f�{�\rOI�E	dʲw\�\�m�+z\�\�\�\��	��\'��p\�뒺�Ni�T����|�_U��m$\�YyZ6Q]l�sTV�\�$���HB\�\�MAQ\�~3O\�Hsd\'#:���M|��\�#<�âȍf��=r��e�\0�r\�v\�	�\�jK\�I{m-Q\�\�\�6��\�\��h͵%?�NxZ�~�u$^r\�e㭓NW\\��\��\�\�8\�e\�\"�O�Rٮ�\�~X��c�\�\�ꪤ��J\�\"\"#\�ز\�\�!�\�\�\�i�\�\��\��GI\�1~7��Vp	@��\�w\Z\�\'��\\�+�̐\�7w,r\�Ħ�R\�|\�d�;e-\�U\�bDz[�t�\�\�^\�奺3�Je���Y�(��s\�I/Tj\�!�Y!��5�?z}�q捇=�z|\�\�n;b�\�x�.�kn��4�\��D��\�+V#*3�\��\";kr\��Lr\�\�,\Z�خ\�\"�TT�ǋ�mz�\�\�v�G0�R*-=\�\�60�ͽS\��m\�\�t\��\�/\n�)��\�\�枂j:r,H1�n\�\�o�ڲ�s\\\�Wf?MJ\�x�\�\��\��iN���\�\�v�`Lf9r*�\'��5\�/:�e8滵e{\�\�׳^\�\�D\�PR�\�$��\�	@�g\�\r9\�w�\�#��N\"e��\�wj�\�ldA�\�(�\0~1CCN�ڲiC~3\�A��<}S<�[��\�\�p��#P��\0�:غ\�\�QW?��\0\�\�ד�;{A�\�\�5�Z���\0*;r���r�Vԓ�K;M�1#�\�<\�0Ѿ\�-`V\��\0���݄Yq܋#\"�Qߌ\�\�c.&��i��D\��6��K\�.PL\�&xY\�J\�\�_��WU�Λ\�f��[	\"�#�\0H����k\�m+�%@�\�(�\�V�\\w\"H\�7Y\�\"�\0\�j�\�YI\�y��\0�l��\0\��\�\0#\0\0\0\0\0\0\0\0\0\0 P\00@`AQ���\�\0?�e�\�\�%\�VQ\�aǃdO��\�\�+��\�\�D&�D)F�攐\0s�\�\�\�\�F\�*6!X��q��\�\�_�\�\0#\0\0\0\0\0\0\0\0\0\0\0 @0`!1P���\�\0?�ς{�\�=\�4;b�3\�c���\�͌6`���c`6\�\�:C�\r�\�I��{N\�\Z\�Ǡ�G�(=�\�Z\�56��\�C`�c�\"�%{\�S�\�(S\�\�\�C\���\�\0H\0		\0\0\0\0!1Q \"2Aaq#PR�3@Bb����0r\�\�$CS`s���4c�\�񀐓�\�\0\0?�\0\�CD�\�C�v�eh�g�\�\�\�ǜ\�\�\��Zf�\0L-s�H�\�^�Gk`7\�ScE�+}f�؄Ȱ��8L\�\�a�/�f���,�\�_6oc�VGW\�g\�\�6\��CyE���9O3]�&\�k\�\�G\�p=�\��\�2TH\�߀\�+[ޯ6^*�\�\�\"�*\�F0\�J%\'-\�\�X\�/yά�\0	�)\�\�\n\�\nd_\�\rW\�\�Qu�k?�kF\�$\0�\\�uM�J��\nQ.�\�;\�� \�Zoz#�\�38޳���$��U�\�E\��z\�z�ھ;�$���q:��wtVEV�5�4�M�\0�i�8Bu�\��z�9\�i\�VA�Ҧ1Pcz\�ks숀h�X�\�k�k\\j��\�(��u\'e\�\�?���=��\�y\�ư��6XV\�f*�Eq�\0q�_�dB�0�ٞf��!%i��\n\�qR}\�\�\rC�;�m\�x\�\�\�q���ߪs\�\�\�Mv�\�&_\�Z}\�NJ\�7:\�TA\�\�7Z�\�{\"�7\�r(cƢ�\�U\���+a��\��3tv\\\�\��WƊdƄ�\�w\�2\Z7$\0)��\Z��1*�\�w���}�\Z/q�\�=\�	VS�X�\�\�\�dfa��a\nT\�\�xWR`�\0xWE��\\t��0x�\��/\�t�\0@�.�\�\�\"얱V[��s\�\�\��\�ſ_�cR�m���\�m(>�ے���jƈ99]K�\�\�\�\�t��\"1\�\�?ea���A6��٪�\'�\0}݌Gy\�U�W�FH���\'��\�\�jM�\ne�nW����\�\ZKs`=��>F�\\�&6Sx�\�\0\�	��Y\�t6{�\�\�\�W\�\n\�M\�Z�\�a0\�2�pZ�K��\�/X�w5��\�\��\�\�L\�/6\�r��aI\�@&\�T�\0h?��3�~c���\0\��U�Z*\�\Z���m�\�K\��]��ƫ��qW�\�J�\0�\�5��J����ȫ\�\�Z\�\�\�A3�������+�U\�r�\���\�\���\�=\�6��\�cB?\��\rQ�\�_�����*��\�\�\�\�u�~aOi�\�v;\�S7���uO\��\�c\�x50\�²j�<T��\�]�7C%���#\�i\�O%f7:r8\"�~o\��\�ʶ3+\�;&K\�\�Ԟ\0�l~b�\�I��%8�	O\�$pV�\�\��j:\�\�\�w(:\�5(\�\�\�+V��)\rF\����e�\�F\�\�%b%\��\�\�\�T�\�Z>}�Igz�·B<ڪ\�vER\�\�U���W҉\�Vj\�Uī��ދC�s\ZdC���+\�^\�|U\�k\�\�-h\�w�V]uVǊ�\\��ޜF&\�[�߈OcƇ\�ymA\�А\rRi\�\�&\�\�\�X�s�\���˚�iꅬ}\�\�{\�\���\�\�ʮ5nS�3sk��6\�\�\�\�Ĵ\�Ϲ����U݂�\�p���)\�j\�+X-W�\�k\n\�\�{��hSm�U��A8�\�\�%u\��W\�1M\���b�$Ce�%:3�nnB�U7���	Rq6�j\�>%\\ƭ�-hc޵�5M�pQ~\�SEtt�\�Z�-`�S�\�Z\��\�_ܬ�M�+O3)\�y^Vգ\�X^\����{��\�y���V�u�um�\�{L�M�6\�{r=�\�\�0\�\�\�5H)\'c��\�\�4f\�AOdA2D�+\�]\�%}\�M�\�\�nT+�\�\�L\�jsCf\�fX\�\�ܭľ\'\�H��jv���7\\\�\�bCu�8L\�4j;�\��\�\�Erj�\�븦ٟH*�\n<6���޺�=�\�\�\��\�V\�BV�\�\Z�(�\�\�*�\�V�\�\�<\��)�\Z\�7 \�*�\Z\\rY�\��]\���(��[:��\�w`�\n\�t/+1_�\�\�8\�\���di\�n\\S��=גj\�\�	�&{\�\�˼\�+�\�ȩ\�\�\�\�7W�0P�l\�$\�q�ں(�Xaƹ�\�\0��fM],Q\�;�TFAaq�U�S�\�pR�ưp�st\�/�)�F\�0��:S���󿇧\�twl�\�S�\�u��W��4&W\n\�	�q\�\�!�Sct֥�\�SX-TZ\�\�AA�h�t\�\Z\�\�\�*b���/v���\�R\�\"@�犾\��P�\�\'�k��\�s�uЈ\�m\\tm3\�[h\�\�u\�5\�\���4(���7�tH\�/{�&�\nCG�A��\�>���Y��\�\�W��Xz9J\�	㢤�\�\�\�\\U�\"\r\�*$.\�<x�\Z\�6+�\�7sC57b�\�w!��\Z#,[��\�dUqW��t�\'�X�\�\'\�T\�F\�p��\�\�ؿ��\�\�zH\�\Z\�\�Q�A�6~\�y�4$Z�ӣm�5��\�ذ\�\�J\���a\�y3~\�J��]\��?�\nP\�u\�2�W��c��\�ٵǊ*�=v�y\�)I\�\�ߊ�\���M]tF�&\�\�)@�\�\�u\�R�����BmW�B\�\��3E\�A�ī�\�35pѽI�րa\�`w\�Jp\"koa\�zGG}\�B&\�K�߮�ڥ��xn�O\�:\�/d�B�\�Lrt\'^1i\�U\�\�\"�֘L�\�1\\ƙ�\�P\�\�\� \�n524n\�d[�_�\n�f\�:s;�W\�\�:���Ⱦ���M-9\�D�\��Φ��nq�\nȑ�vܬ�W�\�7\r�©!�2�\�-Q\�;\�\0����w�\�\�O�I�\�dZ/m\�:��gpЛ̴e����pn\�\�U�j\�\�q�A�:k��D�Xn��\�\�\��M�0\�F,6��\0�-x!\�\�\rM�S�-��5!TX\���rs�\�q��\�v�.��\�/Ú{\�&qK/�\�)|\�;��E�@\�q)\�y��fj�tf\r\�GA����\�[3���@\0e\�m��\�?Y��&v�͜*�=�\�\Z�Y<`\�7�m7pr-��Wf\095[��P\����\�f\��X�pa\�\�\�Tq�\�9�D+�.2��m0\�\�B\r�-��>�O��U\n�߾\�b\�\ZR*F��窍�\�\�\�����1�j$x�O5\�8\�к�#�/y�\�W\�\��Ӹ��q�r\�-V���42\�TO\��B\nu9���H�\�\�2ME�\�\���	�\�^l7���\"/��,\r\nRR`�<]\�\�r�\��\�2�+\�\�\�\�3U�\0��y#�\�\�uw\�4�\�|\�\�D��\�6V������\"�B8\�w���V:�Ȃm*&�E�˼EA�\�MC�M\� �e��\�;:�Uz�G��6\�uvHy�E<I\�\�*��*\�y�s|t-�\Z\�\�gU\�a�M\��E�g\���<8��\�@7G��:�|J\�Z5\������k^E\�\�\�y�K�\���\�\�a]�\�w|��\�e�\�wdP�\�S�K�<өQfl\�;ܼ�\�n\��ӡ\"��P��\���\��/q\�fi\��\�\�\�&�\�-4\�\�\�L߉\�&Æ$\�\�i�i׷�\�\�I\��=\�U\�\�\�\�\�\\*\�\�N\�X\�>?w.j\�j#\�9&\�f\r�\�R�8p�lgx�\Z�\��c R�-�\0?E/�\�\�&A9\��zL�\�\Z6_�u�\�\0ĦC4I24!\����\�;iL\\V	\�≴�\�s�A�\�`\�N\�K�~�q\�\�Q\Z�r�W\rWj<F�qE� a��qA�\�r\�+���-d\�8b��.\�u�\� ։�Q�\�m{\�#*��7h4�\�\��;�����E�\"\'�1��\�\��\0!�e\�\�T,��SA��W)JJ\�Q�L|���=\�W(��D/k[1:�B��\�P�E\�e\����\�\�̔!\�lܻ\�N.�嚼I[�\�\��MC�\�qS:clA�\�A\�zX�\��A{:�Gxo\�*C,�\�]\�{Ѫ,S\�\�¢j�\\V!]z-x�qE\�Ma\�T�\�A\r\�X��\�k�SG\���g�Al�Ϋ�W�ƮU8\�n�SV�)\�\Z�\\\�F� -;t-Ú��aGl\�;±\��\�\�ȵ\�S\�\r		InRī�yٺuDx\�Ws@}�JH�\� ��\0�eI�\�j\�\'{\�\�\�FH�\�{-2�2�\�\�\0�:O�_�/Mt\�O�Qp\�]�\�d1\�\"H�4�WU,�\�\"�?`*�\�	^\n\�\"�q\�\�kA�ᴹ\�2\0+\�\�C�\�\��a��\�\�s\"	9�DV��i\�q�\�Ef\��\�\�\��TX�\�}���T(�\�-+�޵\�S\��\�l1��O��3�b\�\'ĈdƋ\�:[Ϋsrj�\�\�*\�3U�\�d�@#�PEB���\�;\�;��\�`Fi�\� �\�G\�ΰ:�z\��;\n$�/Q!D\�a���ىw��\0z\�Ơ\�xZ��\�cH�8\�P	\�\Z��_uC\�f\�\��\�4M9\�3s�\�k}X���/�\�ì��\�aå4]U\�\�n\"\�׌:1Sm�&���\��\�H>�\n�\�\�O���yB#���ph�k�\�u\\��\�F\�\�\�L\�\�5!�P��>\���CvNDw�5EP����]�\Z�\�6\�\�Ǭn����T^2��/\�[\�E6\�!��|\�\r\��w0f[�y\�\�i^t�\0aZ��~&J`ܟG�\�\�.2\�Fvb�P��\�*�\�F�+��f�\�~\�D\�H�\�q��\�.\Z\�L�\�v,@�Mv\�G�}\�\��-\�->�AQ\�Q\�E<n`�\�,�1i���އaF\���LxN�kf/\�d&m<\�(pY��.\�lv�h&�GJÏY\�\n\�NdC(4�N��\�T\�dQQ]��Rk௮A^\�<EP����4|O�\�SP��[\�\�\�\� �o�\�\�\�}\�q�\�u!\�V��\�g\�}\�p�Q`?T`\�\�\�r �Sb7�\�a�M⧔\n\�\Z5���oM�\�-͈~���j�\�\�\nw4\���V\\�S�\�T/��RO�%\�\�tp\�����5��\�9��_B\�\�\���\�R߳\��\0|k�\�%\�\�\�\�즰{�\Z�Q2ho��\0K\�\��&\�W\�\�N��NG@�	�r|#��Na\Z9|\�dwUG��}\�(\�\��]��T�*�Lʙ�樱;\�%?�u��N\�\Zٹ\�>\�\�m\�5\�p\�\\�\0����f/y\�\'�E��M�:�z\��;!𢉱\�E>M\�¥h\'��&ǉ\�17l�\�bc֌z�\�Ij�\�^\�\�D8H�EO���yD1x\�\�\�-y[��\�ɗs�\�#ϛZ�*�\�v[�tH�n55�s�~\�׼�W\�A�&\�a\�\�y\�\�:�ٰ~��\r\�\�x�5Y\�3oc����i��A�B�e�\0*��\�\ZEu\�i�\�\�^�\�(Q5]��\�\�~[�Y˼/\Z=L79R\��\rMk\Z\Z\�\�Q!�\�i�\0�B= u\���\0�;r��Z}\�;-\��LɬS)\r\�\�\�C:�_u\nm%�߳i\�ǲ\���\�+G9W\�\�\�\�-\�\�\nG\Z��J2~\�\�T\�1�\�l}\�s�dF��b\n\�u�wfթw]q���\�s�c\��	t�5\�ŝ�3�j�o�\�\�8\�\Z\�\�Př�\�I��\�\�\�&n��4\0�)nHkF\�\�bEu�\Z\�*�ޤl4�ߕv\"�\�2=�\�U�w�\�\�\�!Ru�\�v\��晴\�\�Ԣ�<`\�Sx��0���\�2�ְ�a1�`m�;�Jj\�Ij�|�gM\�\�b��!4�F\�pSOw��\n�mD\�\��8̝\�H��Q\��� \0��iP#{{�\0�-x!\�\�\rrڄqj�\�i\\\�xY��\�r��\�\��#+K^7!�63���\�,h\�\0���hɸ�\n�e{�\�m\"�%��� \0��m��H;>h\�Ǌ\�\�<\�j\�3\'[�pVj\�\�n˾�q\�Z\�\�Z	q�)�\�z�\�\�\�=\�u��z�\�X9gX\r\'rlzx��XYs힎;y;xZ�Ў\�A�����nx\�j�vc1�nD+�F}\�+\�S\�˨�֜\�\�\��]&�}\�\�\�k�2\�\�wYH\���vۡ\�hs�+��7ю�\�:\�HFN\n\�np\�nJY)��N�\�hާ�1�\��8\"\�Yۚ�8\"�\0Y\�\�ۥ�\0�\�AF=F?\�X�ߖi�a\�d�%#�rn5�5��e�Anx\�b\�O\�d\�\�\�\�\�\0Zn ��\�\�\�¹\�\�3a�\�d�j\0b�	\�G3X�Y\�Л\0�G\��̈\�\�8H��ٚ;\�]\��\�➭\�<\rw\�\�B=k����&\�\�B/\�wx�\0�f\�c���\�oc�\�qZψ�\�_\�3)\�\"�\�6&\�{��Vq�\��Q.8�\��1��ڛ��ذ\�uZ�i�7񯧎?Yx�\��n�e�>\�\�n5t/=\\L8\�0\��M�6\�\�4��\0�M:�?�>��\�6�w\�7�\0�f\�ς�@n�	 ���\�\�\�/a˅l�k;\��\�n��\0�\�.�\�>Q\'�\�n(�b&\��\�oOu\��\�呇Vè3?�\�X\�\�\�?��\�\0-\0\0\0\0\0!1AQaq� ����\�P\�@\�\�0`���\�\0\0?!�\0\��\�=\�4)P3�|\�Ӳ^��sBR\��\�-&\�E0\��oJ\�X�MH4�C\r6�fDE\�_\�T\n4&1�\�\�K\\���L_�.�2�j\��\�\�\�7v���G\�\�\'��_\�ͣ��U�\'PU\�\\�\�Q�\\�����K*Dn5\"\��\��\0i\0n\�Z\�k�8�\�`\�\�\��u��:г�]\�L�hu�ѐly�+�`ж;�\��̨d\�!Q\r0�\�RX�8\�l\�\�\�\�H�\��A\�\���fd�U���p\�E���\�\�r\Z?�Z��\Z\�[\�\�I\�UҐKf66=*I\�\�~�\�6fn|\�<չ\�\�\�6O\�u\�O#\�:\�\�Qn�\��P��a��\�\�@���>\�\�-D\�g\�8^��\�\�(Y��Ӷ�Z�ϸgk\�\���\�\�\��撊\�\�\�\�@v�Li�Ԟ��]\�!���O\�;\��\�A\0͡?\"�j�45�\'QH\0	�K�s�k@[\�M�:�|W7^\�\��\�/�-\��CP\\e\�t�Qy*o���e\�N\�\�s�\�,;\�\�\�^X��\"�ȉ\�z�>\�\�L\�(H�� g����.\�jQ7�WkL�hk�\�\��\0�\�\�\�\�Zr/f��xZlQMͣ\�EdrK��:����\�\�d\��7��J��\��\0\�\�<}�3f�NՐ�ږ\�w��\r\�(��\0�\�ڳ\'\�\�W�`hI\�\��ZBVF��\�K?�\��9�\�\�\�9XV^�V�=\� ��\0d[	ݧ\�\���g8D\�\�\r�\�\�z��H�<\�A\�t\��x�X\��v\�޽\�\�\��4ך3�\0\�\�i�t\�\Z�E�goQ\�	�\0�b~\�b�\�u/�3��\���T\�\�͚n�	\�4\�t\�pb\�Qj�EH��\0\�ų��}��C�H1P�\0D\�\�\�\�\�\nB]\�V�Y�Ti\�g�\�2E\�\�?t%�m9\�\�_�oj\��){\�<�\�}��b\�\�\�\"�\�\�G��HJ~�\�$R\�L{i\\��}d�T#�\�\�\�C��3�\�\�{\�Y	Y\��>\�}]�τ\��I�*baɡ\�\0Y��\�{\�6w�2}\0\�0\�\' \�)\�8\�C4\�\��1�\�v[�\0�aM*\\\�8��\�V��\�@�\�\���\�\�4\\\�b�Y� �\�5�\�(\�u��R#3\�5\�\��\ZM�0�\�\��\�FM\�:Ѕ\�c�\�E!��ʀ?�S\�4\�z=:\�/�#\0C�\�\�\�\�\�\�	�\�\�\�	[3>��97�X��d�\�h,a\�\�X\�V�g\�Y�x�`ػ\\�j�\�Y�(%\�\��v�\�kf3�D�\�6\�\�O\�Au\�\�Y�P:\�ZsHpK��%��B\Z�\�r3Y�g3\�6�}\�PP��o:�>NE3\�\�,L\�\���uyK�ЋF{�\�\�҄rO��E�\�E*\Z�+>\�qօgL ڏo\��mi@\�,ds/\��ʒUe��	�q�\�7�GL\Z��䭟kYF\�Y\�\�\�M��6nD�\Z\��ǵz\�Q۝m�)3�Z��\�v\�p\�:(9(d��):>[�\�M2�\�\���1�t��\�3|I�R�7\�T�\'�\Zq�]za_ؔ\�\�:N���\�nx߄i6��Y\�\�\"áF�N�\�\0o�(d��\�@\�dҴJe�M�\'lR��<\�\�\����+糯g\���\�\"\�g��\�g\��Q�C����\�G�V֐�^>D��\�x�c���k��ͭGY\�ux�HI++���~�ۙ�q�͎\�k\�\��)?I\Z+��z.\ZoS(pZ��3��݊\�>�_a�Z\�\n�䒺\�%	�֣*�� �\�\�\�We-��	\0�#�~�O\�M�C\0��+\�#\n�\��3~\��v)�\0jՄ\\O��\�.��F���+���U	p\�U��3)�ϙ�y�%CH>�O\�L̴4t\�{�\nJ7p��\��5\� \�\�P����\�1D�(��\�U��@��$�?\�\Z�AB�\��2U.�\Z��j��\�C\�WJ4e\���+2wm�Q.ǀ16K\�\�Qx�\Z�\�\�$�_�c*�\�\�,f\���\nF��\'8�a�\�C&�U&�\���vp������8��H�0��[с�f\�\�A逤�<�����-&@iA\�C��\\�Z�w;��u���\�Z\�T�x\�:(d&\�\�f�����z\�3����Gt�\��\�\�{\�E\rAp\�6�\�\0d��fɺ�\�W�~�,�`�?Z\�$jF^�\�Y�y_T����p���t~\�ɦ\�I\�Z	`�)���\�[ 3K\�\'�y�\���\����\�G\�\�\��\�ܟI\rʽ\�M�˹t\�y\�\���q3��!\�J`���Do^�\�c\�\�&(A;e��\�\�\�\�\�CJ��F�|�k\0gQ>p\'*<�}<`\��r0X?4�\�]�\r�f\'w\��`i\�\�.j\�S$:Ԇ\�a\�\�c�(�\�\�Ow7͌���	\�\�\��ـ�&tp �y_�\��ֶ\�\��\�S�X2�$`<\�\�!��\�HV�.s{�d\�C3(\�C\�ZM�B>ȭ<\�\�J�i����\�\Z�!N$�i\��za�N[�L�7���Jы\�V^\�ڭ)�u\�lM2\��KЍ�_\�\�\�?�������\�:.��	�%[�����`0\�P,�o\�\�z AW�+\�\�s\�T\�V\�}=))UWW6��	\�B\�0$\� fV\�\n\�i�\�f \��\�L[����G/᠐p\�࿺u\���9�I�I	`\�\�@\�\�܇*�\�n|xf��\�G\"��\\-X\�h�hȮ�j�\�^�yx�V�\�{\�\�z\"b~vmI4 Z��Jڠ��\�\�˝\0\0@x%AF�\�9\�\�Jߩ�J�&c\��Fj%\�Oe�\�p\�\�\�?!�����G&�\Z\�ѹ/\�j�9\r\0\0B}֤g\��\�����@�vr��\�ڥ�h\�s(�%#��Nsm\�)&�~F^\�N\�/\�^t�ݏ0v�*�\�\��F)0|\�U�\�q\�v\�P��>)�\0�WL9\�\��OM\�\�G��v�\�0\�\�n?�\��i[:iT���+-X#���\0P�\�hu����n=�Nٔ3~�E��a\���\�`Kf\�ښ|�!��\�C�jnoP>Z\�\�*D\�Y�U\�8�\�L=\��\�.\�\�Ê\0\0����Ed\"�bjD\�\\�Wql�m��̓L�\�*\�\�qt\��V\�8Y\�\���3̦�\�vΖ�	�\�+�\�\�\�o*���M��<�4.р@/��\�\�w}�\0J\�g\�N�\����`-�VA�k3\�Q�t28w�\�--;ӝ�`�Z@�\�A�O�Cy�\�{�*v0\�{t���Zf=aj�XQ\�\�Ф��\Z�4�\�\�\n\�q.;T\�\�_��MB�\�\�Ɍ/��\�\��\�\�m\�\�r\�H�\�\�B���\���\��R;���\�6�\�Jr*D勇7\�\�1If�m\�\�Z����-%g��w\������\��\���cIQ\��I�\�$�\�\��Fm��Δs�\�-AMܛ\�%}�U���ޭ\nJ\�T\�\�ދq�V��Xt�zc�:\�8@�7\�bP\�ɠ���\\��w]��ʈ\�\�y��cܓ\�\�T%H�Y���V�p\\#5\ZD+�\�S�2q��G%7�\�Φ6\�`M\�\�y{Xha���\�+�\�\0�\�=ۚ\0\�x�M#5�\��\0�恠\��f���\�f\�E\�ǫ@�\�\�\��Rl�\rf�\0RR˟�~\�z\�\�gC��2G��v\�V\�\�Q\�M�%\�\�\Z\�\�Uםzщ\rB9f;S\�9�6�3��)\Z�ݭ\�q�\�f\\\�a�F9�nZ̡V3\�P��ϛ1Q\0w�[\�\�\�SP֤,KO3�\�\�\�	��MpiQ\�vw5�\��u�&\�\�\�K\�v\r�1\\�\�\�[l\�\�Jor\"\�\n�`��Hn5d5S��n��\�2\�6jh�dᗯ�le�#�\�\�ʲ\�\r\�ͻ�\�1�dYm<�\0J�\�\�\��Qkk\�ޛ\�Z�;�	�\�\�\�\�0B0�sy\�=\�X�\"��Ytns�\�����\�\�\�K�\08B:F�T�5f�1odA��)A����\�z�Cq|t0\0\�TnW���\��e\�H\�\\[\�(\�f�\�\�*\�S�ecY&;\�\���)=0�ݵic�q�ކm���\�ܩ�?Uj\�\�\'�MGwڧ\�\r=\�j\�/G�!@B$Bz�xL\�S�`�ȩ�/�-���ab\�ϒ\�\�\�閻\�SѼ��jH�\��5�;\�\�,!�r}��\�\Z\�\�Gz,�E���\�z8J\�\�\�nU���[�\�%\n�֊��i}\�\�\r\�\�\�8K�ʄ\�\�s���ӳ��f�?\�)�d\�G-Ol�Cܒ�纤r(�3C�\�B1\��� \�`���d��\0��=\�aBa\�\��@�6+t�iH[\r\�SBP�p�&[YkբC�wf\�gz���(UZj�Y�y�ntu�XQ%\�رJ\�\�\�>9\��\�ਆ�DC\\\�ݣ\�>j25�V\�AqZ\0\�WL\�8K\�v	�\��N	�z�lBi\�6Ň�U�H\�\��2�b�\�\�\�\�j&爱�x\�.%\�n\�܉O�\"�ܽ\�7�\r���(x;\�\�Z�\n�/TӮ�/ éc\�*\0dX\�z\�㴕̈́\�\\\�\�>i2Y�*���J���ѥf���8-\�(ޘ<\�^H\�*\�M�\�i�\��\�.\'\�\�p�n�O�\�\�i\���\���.\0�r+�< \�\�A\�*By<��J|\�f[�]\�;��Or�[e\�O\�\�D$���\" ���,��\�\�\�\�k)��\�{�\0>nW\�\Z[�#D\�q.�\�=\�\�RAA\�N\�Bl)H��\�]Y{E@qz�\�����\�k�W\�	}\'>�s\�\�\�H�\�7�\��W\��\0<Zluu\��~`dN<�\"6�\��\�\n�LY	\�HfC��~3�2.b#��+ث\�\�/\�\�3ѩj\�\�g\�\�n:�b��I`U�Yb��7;�4!pwߣO@�s\�w-����e�\��\�\�Pޱ�[�_�\�\�svL�\�\�.���V��\�\��K(2\�I���\�\�@ڄu>1!\�3V\�`:3֢z�W��\�>$r)-e�\�\\wt<\�X\r�\� ڗ]>\�Sf\�m��cf\�9<��\0��\�\�\�{`�C�\�(\�\�\�\�Lz\�\�R\�\�zY4ԡ$\�G&�\�f-�(\�E\\�ص	\r\�֋S���&M�C\�<g��\�T͟85�\�k�g\�Լ�\�?TJ\�j)bH\�)ek[4\��\�\��\�\�\Z�\�^\�\�\�\�\�s�w���\�2\�=\�\�zm�\�+/C\�~Xj�U�F\�/5\�碦HR�⦮c��\�DOA\�\�\�Tlɨ\�HKl�򨄾֕�\��\0MAMv�\�\�h;�\Z�\�\���l�eϚS\�ԅ��\�p\�\��ի)���U��q\�c\�pW��\�l\�Y�χ!��g̥)ݭЋ૘�*?���j�r^\�\�#\�O˨a�\�\�>\�$�{QJL�F6>�\�]A?Z�h]�lUЫ\0Gi��\�Â>�l|�xH\�/Y��Y\��[\�{D�ǯ�;U9\��c!l\�3G\�ҷ\�J�m�Ã^ƾ�\0�y\�v�\��C298�Z���G]˄\��K|TW��}�\�j\�X��?�P\0 ��\�ln\�S?p<?\�\�^\�\��`.\\�k9�-\�,�3�y�w�,�GL\'�\��d0�4\n\�\n\�g��\0\�ڮ9N?j�&�\����A	\�U(D\�S��\�S\�q\�\�*n�\�LBL�BM�up�\�[\�&\�3�Tȃ\Z�\0J��\ro\�\��c\��N9\�K\�\�߼m\�@\�\�\�\�\�h�;~\�\�ӏ,&R\�w->�3��0W�\�#�\�iNzZ��\�T�yӗ\�l\�\�\�l$�I|)\"\�ѿ\�/��K�WB򆢉V�mūL\�\0�\n\�2C\�+�\�Y�@	��J$ ��j:P�\�6��\ZpС���8K\�-BX��?\�tWn\�\�\�<�\�\�ؚ�x~�\�[�����X:\��\�9�ŨlC�?�*EBf8Ho�?cD\�\�\��\0\��^�A9K��̹�S�\�V��\�n?U5+�pէ\�6��\�\�Jm��\�2ף�\�r��u\�\�\�q�\��%�}�\ZN�̇,�JBY\��T\�\�R�	Y�\\\�\"Rƚ �ҏ\�z�\�sފ]��\0�E�|)\�\�\�ySH�\�����\�\"{�\�\�\�4��L2��x�t��\Z%�\��Lj\r�r���\�}��\���\�!L��\�\�`�\09#\�R�q\�uڑ��\�D\�4��\�6]\\\��d\�\�^G\�\�nx%\0=��\�Q\�\0��p>e\�\�=\"9�@��z��\�\�\�\0\�\�[���C\�}�昕R�֓W=���(�\0�4*\��_�r\�h\�8\�XH�\��N(H��3\��\�-\�\�}M\"\"h\�/�\�\�P\�$�\"S#:�\�ZO}�\�W��\�\�G���y5\��\���0M\���c:\�{�}\�`�\�E*\�\�}z}Ƨx\�E�\r��E�J��\"�\'7\��Н*J\�\�w5A,(\0��Mj�Q�Q>�#�g:\�\�Ce��\�V-)\��\��<�ԧ\�\�\��:U�j�@V\�*\�\��\�\�Zu��~\�Z�jQ�B\�`*J2�^��\�\�<ߩ�,(\0��dM��ե(M\�\�OuG�\'�n�^�*%Z\��\�!����O#�6��%i��x\�\��Z�\�V�UuI\'6\��8�E@	Z8�j\\\�\�\�7���\Z��\�\�\�񏽮5�\r\�\�1�)@�8uJ�o욓�|\�\�\�o��\�W�cq֥�׹r\�N\�\�TH)p�\����Ѫ����q��\�n\�\Z\�z\�~�A\�Bl�/��@i�\Z\"ʪB�\�\�\�q�\�#�\��f\�s��\�X	��\�\�[<s\�\�\�\�z\�;w\�QmY6���\Z.a��;Q�ݡ \\&U4[\�b\�X~���Qu{��|}��K\rn�\�\�\�9\�gǿZ\'���F\�m+v>�\�\�Y\�\�����0n�Q�\�:�\�\�:�IW�\�.\\\�t\\�]Qʗ\rY�w\\u��C�\�\�\�\�?�8�(O��څ~\�s�w�;\�E�\"���pC\�V���\�v8?\�g\�ީ�O��Xy�ͩd���ԠKH�\�\��\n�v�\�!\�\�\��\0��@n�:SA�t\�^\�o�\�y~�\�,\�\�~\��\0�\�\��\�\�\�%:|\�\���\�mA@�$K\n,�U��\01�g�\�jA}KU�\0ři�*\�\�y\�\�@�hr+>�\��\0\�\�d\�N�es\�^Cߧ�<(�A�\0\��\�\0\0\0\0\0\0\�\�<\�\�,\�\��\�<�G\�\�<\�\�,\�\�<\�\�<\�\�<\�\�<\�\�<\�\�<\�\�<\�\�<\�\�<\�\�<\�\�<\�\�<\�\�<\�\�<\�\�<\�\�<\�\�<\�\�<\�\�<\�\�<\�\�<\�\�<\�\�<\�0\�\�\�0\�\r0Ì\�,c�L0\�\r0\02�(�\0M\��\0@�3\� \0\0\�\n�<\�\�pA,\�q\�\0!\�\�\�8\�<#G<\�\�<\�\�<\�\�<\�\�<\�\�<\�\�<\�\�,\�\0\�O<\�\�<\�\�<\�\�<\�\�<\�H�<�\�<�\�<\�\�\�<\�O<\�\�<\�L8\�\�8\�J\�O8\�\�0S8\� S�0\�4Î0\�\n0\�D8�\�8C\�4�\�,0\�s\�b�$cK,\�\�<\�\�(r\�,\��<�O\0\0�0�3#\�<\�\�<\�\�<\�\�<\�\�<\�O4\�$SG��\�\�\�<\�\�<\�\�<\�\�s\�<\�\�\0�F\0�\�<\�\�0BHS\�\���\�\�N<\�\�4�\�\�\���\�\��b\�0\�4\�0�\03��� \�͂\�\� ��\0�;\��\�@\�\�<\�\�<\��,\�C\�+��[,\�S�{��\�\�\�<\�\�<\�\�<\�<2Dm\�\�\����R-�-l\0A�\�<\�\�<\�\�<\�\��\�\�X*E�)�l>\'1\�<\�\�<\�\�<\�O4\�\�8\0I\�I	ȗd@�\r\�-!�\�\�<\�<\� \�\�01O4i$QQ%�Ȩ!Dr�\�A0\�N0\��<\�\�<�OH-	;9Ta��\�\�{\�\�\�<\�\�\�\�<\�\�4#\�G�e^��MO���AzI<q\�<\�\�<\0K<\"B,ӎ��\�N֯M5n~3\�MC8\0@\0@@S\��\�(ӵ�R\�lQF�ABZ,\��<��\�\�<\�\�<\�\�89uz��Y\���M0\�<\�<\�\�8\�<\�\�,\�奙\�<\�\�\�{\�\�\�\�<\�\�<\�\�<Ì8\�\�0\�<\�\�\�K8ù\n\�<rM0\�N4\�0C�$1N4�����m<\�:;\��0B\03�(�B<\�\�8�\�:ݷ���k\�1��\�,\�<\�\�,s<�\��+�\�����\�8\�\�4\�\�(\�\�<\�\�<\�\�<\�\�<\�\�<%m�s\�<\�\�<\�\�<\�\�<\�\�8\�L8Í8\�\r4\���_\0\�0\�8\�<\�0s\�@3\�M\�/�\� �\�\0\�B L0p�,\�N8\�M<\�Eq	\�\r\�\�4\��(s\�4��<\�\�<\�O<\�\�<\�\�<\�\�<�\�<\�O8\�\�<\�\�<\�\�<\�\�<\�\�<\�\�<\�\�<\�\�s\�<\�\�,\�\�<\�\�<\�\�<\�\�<\�\�<\�\�<\�\�<\�\�<\�\�<\�\�<\�\�<\�\�<\�\�<\�\�<\�\�<\�\�<\�\�<\�\�<\�\�<\�\�<\�\�<\�\�<\�\�<\�\�<\�O8\�N,�\�<��,�\�<\�\�,\�\�s\�,\�\�<\�\�<\�\�<\�\�<�\�<\�\� \�\�<\�\�<\�\�<\�\�<\�\�<�\�\0#\0\0\0\0\0\0\0\0\0\0 !1@APQ0���\��\�\0?�J�+@J�*���c�Z5�v�s-���[[o/|<\�\���\����\��\�\�\�.0\��lM�����ޠT��Q\�\���\�(�Wn E�\�CC*WuP~u�VV݂\�\�\�\\m	q\�Е��Z*Vy��\�\Z�oP�/C\�H\��\�Å\�0�\�\�B\�g��=�\�2�:\�h�X^\�\�<��&��y��8Iu.y�K�\�J����U�\�#Q�/�\Zо�p��\���\�\0!\0\0\0\0\0\0\0\0 !1@AQP0���\�\0?�\0�˾poBԺ�m\�-F.\�:|q.�\�%\�iDdR�>\�\�0���Q�r�אv\�1T\�\�)�|\�&\�\�^\�\�]/�Ĩ�\'\��\�\Z\�v�0���\�\�\�\�z\�\�}�\�X\Z�bW\�\�\\\rN]e\�@\�[�o�\�x\�k8\�<@��\�\�.\�ì=\�a[b�\�9G�\�ቧ�F�#L�\�\�\�71m�\���U�E\�Ch��_u��2�ZoRґ��w\�\�A�7������\�\�+\�\�\�\�\�~=o_\�_�\�\0*\0\0\0\0\0!1�AQaq� ���\�\�\�0\�@P�\�\0\0?\�\�\��\0s�\�\�|9\�=!+�+�¸s�\0\�~=c���?�U�\02�\��\0^\��x�\0\�\��>�\��\�{\�r\�\�\�\�\��\0��\0\�s\�\�=\�s\�\�=\�s\�\�=\�s\�\�=\�s\�\�=\�s\�\�=\�s\�\�=\�s\�\�=\�s\�\�=\�s\�\�=\�s\�\�=\�s\�\�=\�s\�\�=\�s\�\�=\�s\�\�=\�s\�\�=\�s\�\�=\�s\�\�=\�s\�\�=\�s\�\�7�\�\�\�y�\�o7�\�\�\�y�\�o7�\�\�\�y�\�o7�\�\�\�y�\�o7�\�\�\�y�\�o7�\�\�\�y�\�o7�\�\�\�y�\�o7�\�\�\�y�\�o7�\�\�\�y�\�o7�\�\�\�y�\�o7�\�\�\�y�\�o7�\�\�\�~\�\�\�y�\r\�\�h(���\�Ɀ\�\�U��\0��t\�5^�\�L)C�&�\�o7�\�\�\�y�\�o7�\�\�\�y�\�o7�\�\�o7�\�\�5�6�\�B\�f.ˠ=�\�\���\��a�y�\\\\\�u\�h��o7�\�\��7�\�\�o7�\�\�\�y�\�o7��\0\��\���ţ�\�/\�L�Z�kGV���<�X^R���n\�|\�\�\�\�a�@\�\�\�s�\0�\�.+n&���p��j�~�\�M\��\�U\�zGZ�s\�~G)�\�Q�\0�\�\�\\=OS�_[\�H-v%�ۧ�Y�uy\�\�a\�&\�W\�y�ud\�\�R\�\�K��N`\�x4q��QVz\�\��#�g�>��\�\�놿2)\�E�\Z\�\�\�Z)Q\�`t4 \�@d\�x\�}\ZW]\�\�\0���j{\�:�Kk\�b�0>@�9f�|�NQ�����/_�\n\�|9���\�\��\�G,{j\r�àV%B`\���30�9\�/>��\0��\�#˂�\�w\����NbT\Z,����?\�8r�����S�\�\�\���\�uW��x[��\�\�\�\�\0\0\0(4�T�j\�S\�\��}\�ն�\�Ws�\�_�ǟ˟��>��\�\�(Wic�G`׀�\�V�rl_I\�fQƯC\�\��\��\���\�\\q\�\Zɾ\�a��ے�#\�o\�2_Ʈ|:\�~Ϥ�Uxj\�\�F�\�\�\�z�\Z�D\n��\�\�33%�G淉}���2\�\�輋\�\�x\�\�\�x\�\\=p�\\k�J\�=p�\�=4Թ��H\�17\�!\�{ͦҋM�:�\�t ]�Nx\rbws?|[�}�\�\�K\��LO\\*z�*z���\n\�}c\�49��hڽxk\�\�9�w�A�\�;\�\nEU(�g�\�\�m	)�\\�\�\�`Di�Q)��G�ޙ\�z\�\�OS\�S\�\�\�\�\�ƼM�\�i�\�m6�M�\�i�\�m6�M�\�h\��\�t]�MP�)O$\�@/��z���\�ÙE�\�~��U��}�E9r����\�@�ty\�\rnJ�.\�\"#N�^T\�\0\�\�2uL\�6�M�\�i�\�m6�M�\�h�FRތ�x\�\�\�\�~7�YW�Ӌ\�ܽF\�<u�DJ[WC�\�0\�\Zjr\�+~�+6�]M�i@�\�\�ct\�0\�\�d��M�\�i�\�m6�M�\�i�\�m6�M�\�i����sir\�\�i�\�m.m6�M�ˏ\��%�_nQ��\�=�\�h|$q��\�c$XH?��6���\��L^ޫG\�(�v�\�\�\�L��M�\�����yȜ�������\�m6�M��f\�sZ�h;��KQ��+�\�ωW�&�Z\�󚠵\�@\�\�\�S\0-\�6�䬟z}T�N0���\�\�\r8�\�;\�\�m6�M�\�i�\�m6�M�ͦ\�i�\�m�\0\�h?��\0H�6��\�\�\�p\�Q\�p��\��̼m����е�K{\�HCA��H��I��\�\�3�\�\�?�\0se\��\�Vc<y��B9��4\�L �c�>U\����2\�޻��\� �\�\��#\�@X:����N\�����\�?�\r\�\�y�\�o7�\�\�\�y�\�o7�\�\�\�i�\0*\�\\-�I\�\�\�pz#\�\�\�ĭ��]iOC�H9c�\���\0ƈW5L�\�\���Rb\Z\�h���#\�W_\�\�\���\�(\rYZ\�V\�;w֢R�^r�\��\�\�襞\�D\�Û�|��Ӡ�\�\�7�\�\�\�y�\r\�\�y�\�o7�\�\�\�y�\�o7�\�\�\�y�\�o7�\�\�\�y�\�o\�\�\�xuJ\�j���WZ��k��%$I�\�\�\�\�\�&�\0\�ב��S\'�]M�h>KD-���Z83i�\�\�\0�\��\0<=���Ҳ}\�\�\r\�o\�3�`\�eFV^�I徹\�o7�\�\�\�y�\�o7�\�\�\�y�\�o3+�q�*T�\\+�J����^\�ѿ\r\�gG�f�lkS\��E�i�\\�~�P�q�\��\�5�I\��\0R�~ҼGk��V\�ߩ��i�r���\�G����o\0\�\�q\�H+��%�\��\�����]W\�+\�\�i^�\�\n=`���<\�\�?��?_�Z��\�fޠH�\��\0aG\'	}\�\'�Y֓a�{r\�\�U/n?��� \�џ�\�A\�-;�\�\�\�\0Oڝ .\���W\\k�p\�\Z�*WT�R�J��\�T�	:��\0�<;U�D\�\�R�Q\�\�R�\�\��\�La9���\�c����\�Sړ��Z�O\�\�\�Sԩ\�WiS\�\�*T\�\Z�*��\�}(��D\��~\�R�F\�:Bе�{ǚz5X�\�\�I��n���\�\�bz?�\�*T��\n�9J\�\\*2�J�3\�\�\�8\�\�\�\�\��\0^8z�\�\�\�PD��\n�oHZ\�=5���^�\�oܫ\"誟\r\�Ҍ���\�V���>\0\0TW)\�z���\�z���\�z���\�z���\�>�4;\n��,�QK�uD��\���\�D\�?\r,]-�\�\nީu_�H^C�.�W\���ŝxs\�\�\�R�+�|7�\�{\�W�<	\'EyS�p�\�u<\�\�*ì\�ĭYO<��b-\�\\\��#W�!{��A꿭Y��R\�Ɗ\�p��@4�\0�p�¸T����\��~\�\"�\Z��\�Ξ4\�zL�s\�x�\�B�\"!_��I�ӧ\��޷*\�K�M׹��ԩR�5+�+�q��|+�0\���7�G\�\�=J��\r=�)Z�{�\�\�ӡ�\�U\�u�\�\�\�\�溯_�*z��J�*\"���K\�\Z�\�\�[���\0(  �Dn\�J���\�<�\�\�\r=\��Ԇ깣\�g�Sԩ\�z�-#\�\�\"�m�*\�\�\�\�\�hE^�����lr�ۯ\�OSԾXS:\�_|;\�\�\�\�N¸W\n\�_\Z�/Ŀo\�\r�ߎ\��\�~%�\�\���\�\�\�H)�5���i0�\0���|�\�~\"�\�m\�y\�\n՘�r�~*P�4]ٛAZ�!\�a\�\�\�[���\�\n\�9\��\�\�\�ƏOܬ}\�\�j�����\�?R�\�׿#�j�&\�Ў���u��s\�\r���u_\�%L0=\�\��W\n\�J\��/R9(�Nn\�?\�,i�\�\�}B�\�(RT\�\r\�+f\�}�>����	�%��\�_�~%��K\�/Ŀ\�/Ŀ�K\�/Ŀi�\�m6�M�\�i�\�m6�M�\�i�pOf�}\�b�\�\�\r�UQ�\�ߴj%�\�[�FP�z��8d��\�\�r\�Q��ȷ�o��\����Ķ2\��j	�w[��Ҫ��\��\r\r��\�.\��������\�\�͊���\�2�\�q����p�\���s\�w$�\�\�~繨[\�\�%\�d),�s\�%���\�s�cv�@F\Z�赮\�\�v�\"kQ\�\�\�\�x^v�\�:�G\r�\�i�\�m6�M�\�i�\�m6�M�\�nLLL|6�����\0i���\0�<�i\'��pEOR\�l\�b\�\�f\�G���E}\�O6�ֽǸ�w�7���ܼV�ψ\�\�6\�-\��ō�b\�\�\��\0R�G=O�� ��﹗Ox�\�\�ΌX\�K��x���\0xD\r��\0�S\�#��\�1>\�\��\�IWF\�L̾E�\�\�\�->]yw\�\�\0��W闖�F�\�r�M�\�\�]�i\�\�/ݎ8c�L����\01/\�\��\�\�1�&&?\�\����\0y�\�o7�\�\�\�y�\�o7�\�\�\�y��ѣ\�#\�\�dkE����߹t?ݦ\�yQ\�x�\�ʷ�96?�\��\0�=f:\�u�\�=\�\�JJ\�e\�悁t럥�D�u�Q�b�y\'yk_L\�뗩p\0\�2>#R\�\�*\�;/\�)�\�\�\�9\�\��\��?�2�ʘcE\�[�N_\�\�\�\�\�Y�\�I�K�R\�F\�\�\�\�)p󂇮s�\�\�vl\\\��\0\����f\�z\�;vy�\�o7�\�\���\�\�\�y�\�o7�\�\�\�y�\�o7�\�\�\�y�\�o7�\�\�\�x\�\��/��NC�tyr�W�q;|\�\�\�1\Z*\�n^�k_�\�\0:��\�*)}\� 7�@1���\�l�\0(\���>s	��?P�?�=cG��=_bQ�\r��\�ʡ\���\��\�#v͗\�\�}\� n�\'\�(ܭH?�\r�=o\��f\\��� \�;��X1\�\�`��\�\�\Z0t;��㵬�\�9yG�\�\03Z�\�DY6\�a�����\�[\�;\�\�9\�⟸\�U\�\�\'\�?iơ\�\��!\�B\�|\�Զ4Zy\��\�C\�\�bqfq>YbD��\�O_mN\�j3y�\�o7�\�\�\�y�\�o7�\�\�\�y�|=μ=\�\�s\�\�3\�\�(��iy��r���\�\�XEsZyB\�k�g�P���\�:��2\�+SA\�;|H�\�i\0����\�\�ۊ55Z�_\�i\�\�8YCU\�\�\�\"&�Vz3x �\�\�\�\���@\�\����@W?�\�\�\�Z��j\r�\�\�\�2�}m��\�J\"�ea�\0!	`\�rz�Z)\Z��nZj\��f\�Q\�D�:\�\�/1\�\�{f���\�`�5\�\�\�\�8u\�\�[\�\�=|}NQ\�\����mo�i\�3��xf�\�\�<\���T`\��L�C��\�p\�\�\�t+��\� \����\�^��F���\�^�Ӗ\�f�/XE�G\�k\�0�ǞD\���Knv\��1�Zh\��s7�ҹ��`kc�y\�\�~\�`u�\�\��\�&J<��H�	\�V�z3\rTgbǰ�\�_l�JL�䴥�K%C����\�~�K`��/{\�\�e]z�@rKK�\�����\�\�,�\����qq�0\�o.w!\�5�\�Ǘ˟ß_�\������W~A�}�6:�w\n֬�\�\�r}Xl���\�\�P͕k@\�9���\�%z\�\�ٸ[�E\�\"��i�ٕ\�	O�M\�u\�|z@\�5�\�\�{5H.˓��s;\�]!\�\�D\�\�\�l��\�\�}�|����^\�>���\�+W@�.ʆ���\�\�\�ո8\�p;�5\�\�\�;wZ�\�\0K����y\�(\�ą\�0\��\�a�3\�L\"a\�d�Qz�^\�CƂrM��uY\�\�(ǅ��p~[�y\�\\*\�m�C�\�\�\�L\� 0��\�\�x4����f`\�y��\�\��\�\�|\�\�.�ݍXj\�\���Jh\�oN\\5\rBJ\�Q\�s�&\�߈R*��\�[(jZйL� \�y�䯋\�����Dсq�z\�F�$��\�\�\�Cj\�y9A�\��\Z���|�3\�Q�%�*�����\�VR�9�\�\�k�\����\�\"�R]~.JݬaH\�+\�St��B��g�x�i\���5�N�\�\�\�yA/�\�\��\� lNP��ú_\��\0g\��O\�\�_\�p��ZV�\�髭b\�\�L�G@�`\�W^WL�?\�\�\�Aќf+W�\�?�lR\�\r`Z�\n\�ؿ����(w\�}]aC\�Eʜ�\�~*i\�\�\�C\��\�Bh\��\�*7듴=��a:&T��\�.m�v�BN,#��\Z\�,2���״</Q\Z�6���\Z�ĸ\�;]�\��l�l\��\�\r�\�\�Zr7�\0/\'�\�\�T��\�\�8\�OM\�R\�1E\'yv�9�} M��\�懃��A�\�5AOhq:\�9{���5S\r@\�h�\�!k�1R���=&\��M��)e�\�\��8 \"&�\rB����\�\�l,G�\�_\�\�\�\��.\\�r�_\r�B\�t\Z�ų�;v\�w��%R\�\�K�|�W�@}�\�\�[\�\�z\�g l9=xxT\�\�Ժ2~1(�Jjˮ|&c\�X*�q���\�\�:\�fX\�t�P�`\�\�\� W\�-@�ȼ.\�ʻp[0\�j�ۍ��h@\�\��Be���\�\0QT�d�\�N\�\�?[��\�@j\�eN�Qݬ�J�b8^\�k��3 \"RӠ\�|�r»�0\�ң��Y]��\�\�)\�\�}@\�i\�G\�扢6U3�E8(Ph R��}�r�j�J5��M�!u\�A\�\�b�\�\����9OS\�\��U�;�+IK�ڿQ�@�ˋd�M\���v\�\�[\�s\�;˛qۅ\���{m\0\�U\��\Z:脮���{�$���E!\�\�\���\�\�m�\nD\�\� \�Q\�\�\�jCZ\"u\�\�\�p\�9 \�/1\��\0�&�$\���\�-:\ZO#D\�=�,c�]�\0뼸�\�\'C8���-t� ��\�2S�\�#Ӂ\�ѓ�B���!b=)�~\"\Z��\�V�\���J)��\�\0mWh9�\�\�\�\\S\���\��\�D\�\��b���F�c]L�UP\��\�q\�r\�K\�ˆ��5\n\�H\�\�u�\�\��\��AK.gr\�\�^\�r\�\�\�+��*\�\�6�M�\�ˣ��\�h!\�h/ċƷ�\�\�-\�JK��\�\�\�V^\�_\�\�m.m6�6�M�\�i�\��\����\�\�0\�4x�_jL\0DZ���\�\n��_�{�\�e\�\�ސ(\"\'N����\�>H듿zDE}�S#\�P\'�Rɨ\\�#\�y3�3\��@L6&�hZ\�^�y�޵\�~�t�xW��(=ڻ�A~�=K���\�P�\�G�\�z<��,jH��P�^E\�\�\�#�\0\0Ut�\�AB��1�\�\����W�\��am\�˥x#U��.�)ݵ��ia=�L�\�\n\�()! T\�\�R=\�\���z\�I��\��DEZ��uYE�3TZ\�\�0�=_\�\�s\�\�*Թ�\�s\r\�\'�\��\�Xҭ}�B\�Z�|)�\�	si�\�\\\�m.m6�M�\�y�\�o7�\�\�\�y�\�o7�K\�kQ��~:.Y8XE\��\�\�%\�\�\�\�\��,�EVޮ��¡\�DR�*7\��\�FFB\���)�3\Z>gaf�0\\93\�ؑU��WM\��s�\��3v\�\�Ü�3�W�\�tCd�Y^��\�њ9W\re��o\��\���)�}D\�\�\�Q��\�U\�^\�dQ\�$|*���@/�\�\�\�\�p��\�r\�V\��\�g+9��\�]ǅ�9ʺ�Ѡb��\�\�\�\��\�\�4y\'^<\�Q`?\"���y�\�o7�\�\�\�y�\�o7�\�\�\�y�\�o7�\�\�\�y���mh;�\�%\��\�!\�\0x\�E�\�\�:�\0�L\��u@�j%	\�-?\�]8fr�\�?\��\0x�t��\�\ZS\�X+g�]�5e܁9�\�AoG\�\�k\�\�\�݋�?��HNCZX��\�\��!�hW\��	�j@\��\\ It\'���\Z-\\S\�\�˜=�\0\�\�n�\0��9\�ߨ=lz0\�]�\�\�\n��A��ԤԒM冏�\�\rx<�\�S��;\�	2��Ľi_�@�㡦\�\�����\�0\�\�\��˓#��\�\�)�X\��xb�E#\�\��DM�L�(>�~N��\�o7�\�\�\�y�\�o7�ʕ¥J\�R�J�\��-<N�\�0\�GO�\�C\0�33(c\�{\�\�\�\Zatg\�=Q__\�Q	���n7G\�?L\��\�^G1��Ca�\�	ޘA6}�\�,�\�IV�\�\����ى\�\�\�s�u����ش�:�\�2vIC׏I���}P_�\�\�\n1��\ne|�~�d\������+�X��\�趈\n��`����#KCW�\���~\��\0r�\�\�eg��L����S@s�:�M)\�f\��\nCQ�N#\\*�\�Mf�̳\�<�\�\�Ȯ�~\�\�\�̦��\����\Z����\�ƛv؂#\�q+�*T�R�¦~5\�\"����\n\�WP1����\�\�h\�.\�^�>�p�\0\�\�3S4cX\�\r_G<%,R��\�C؊\\A2\�i\Z!,ơt�B�\":�\�\�\\�3\�P�\��uE����9��\�\"(��R\�~\�V9�\���yS$\�\� \�\�=}\�Hm�/o��ˤ㙀���a@��f�r\��Fr�)P[���\n�N�4X�D�\�\�\�\�\�\�\�8��e*I�;a\�rx\�\�B\\�\�\�\�gC�p��\�k\�P7���ae\�T\�\�\�\� `8�%8\�^_̮5*f\�\�0}pz\�nD��F�\���B�h�j�\�\�1FC�\�uV���\�&\�DiOS�S�Ät�r\�\�\�QG�iR�M\"�~?l\��IP����_\\�\�|�,\�\Z+\r�y�B��Fs\�wxݯ�1��E\\ƞ	��\�t�6�޶�J�+84ݜ\�N�\�\�l:r��\�\�@\��\Z�\��WuW\�(�\�\�\�#a\�hcU\�9��˅re�9ak\�;��,�D\�K�u�/�\�\��ots����\�kj%J4G���UA�Sɣ�\�\�R�J�*T5\��h\�\�Z�\�\�:y�U�P6#U.\0,u�\����&<���\�a��\���\�J�u~\�\r8,��WܽX.�bjh~έ򨪂\�\�＿�\�~4�����?\�b�A\�G�tNg-��`A�N\�:V�\�\�j]4�T\��\��.w�g�\�`��\��M�\�o���\�$z�W�J5i\�YP.z\�\�\�k\�\�q\�?\�\n���\Z�\�4ހ\�Κy\�\�f��\�U\�_1\�^4\�w!\����y}\�Xօ�����hYY;?\�f\\\05Oe���!\� ��T\�3%xQ녞\�\�111 ��;�\�8ɿ�\�=�\�&\�L�\�L?+t\�\�Wnu*W\n�7\�R��jT�R�4$>��l\�3F�/\�\�\�`��D\�O��\�\�\�\n�\�\�\�\�\'�\�\�LN�\�\'�-t\�*�u+�0\0rU�x�_�nT\�\�0���\�h\�E��\�\�6�b�E�����\�k�\"���.\�>����x_k+\�R�M���U\\�ؕ*T�R��\���p\�~��p�\�\�*2F�e\�\�k�\���\�\�o+��\�+\�\�;\�T�tvy\��P@s\�b@t�\�W\�Wx\�\�caH�m̰k�\�i4â\'\r�\�\�\�\�p\\�\���\�vJ�y�\�u$wW\��BSE���k�yR�J�*T�\\*T�R�J�*T�R�t\�\�B\�\�>j�j\��\���\r8\�br`���\��\0�ؗ�?_\�\�/\��QW���\�.f%@\�4jD�\�i=\�\����(֕o\�\�\�yF\�e��\��\�|Ů�\\#\�bW\��\�1b��Ħ�B\�\�\�1\�1,m	w�옕.��\�3\�\�י\�!�{�\�w�\nӦ;\�\�\�K\�և\�<��\�Q�U�uPE�E�\�QiMؿ���\�\�hLAQ\�\��\0\\\�\�M��\�\�\�*\�2A7\��徆�N$\r�\�+0\�\�}���\�\���\��\Z�J�*T�R�J�*T�R�J�*T�R�B\�\�\�\�\�\�^-;\��|�\�^\�I\�\�\�J*ן\�\�\�]��BRs\�\�x\�ނbT\�\�(a\�O\�X�\�\��\"�O\n\��\��1gÛ&S�\�\�TnX\�c݆�͘\r\n��\�\�+\'\"x\�J�*b\�i<f�\0p��K!\�\��ZL;z-��+?��\�\0\�%\�˝zG\�\�\�\�r�1\�Yldrc\��Ӝ\�e¡\�\r׹��,\�\�\�yr\�]>h\r>\�}�ȓ\��b�\�^?\�8Ҍ�\���\\(�����N�W�B�J�*T�R�J�*W\�11\�\�g\�\�Ӌ�7�9qߒrNx~\Z&\�\�Ap	܀h�����D�\Z�������Vʛ��XE\��0n�\�NX�\�\�CFs\'�!!\�O!\Z\���p\�\�\�\�\�\�n\\0֧���\�P\�\�s��\�\�3t9\��G\Z\�0H����5#�5\�11111.�:�\�^!=\'䘺��\�\�O��\�qV��H$+��^A�\0\�q1\��+���ӨCI\�\�\�G\�\�4N\�Ky\�\�y\0\'\�\�=SQ`�5\\7\�bbbbbbbb9�E\�Q\n�̼\�B\�U\�/\��\0%�\�Ff�\��\�\�\�\�\�\�İkA��\�a\�1���\�|�\�~ǃXuv\��&&&&&&&& \r���UѬ�\�A\�5�O�b�~\�B�\�-��o\���\�\�~����\�\�Lp߁��\�T�_�乌�k��\�r�Uujg�Ij�:���ڀC�q\�f\���&�1\�1\��t�\����+$v`�]1���%\�\���\�19LJ=um�\�\�r\�\�?s\�Q\���@앚ߒ�\�N\'�#��\01111\Z0+U�h&�f<\�L5��a\�9�x�,&�\r�\�\�\�֮�\�wP=\�:��#�\�\0\0\�LLp\�\�\�\�\�\�\�\�K�`�\��\�4�\�KF�U��c\�v\�\�~u�,�Pz�o�\0�0n�x��uR�\�Z���\�\�\�r\�#\�^\��>����\�wY�>\�N\�^�7(^��\�b\\Ĺr\�*՛��g�Q�\�����\�\�\�M\r�:l \�e˗1.)`e\�`\�\�\�\�R�Hj\�)ݕ�P\�\�ߛ+\�bn�up=��#Ʋ\�}4k��\�\�\�z\�\�\'����r\�>��1\�\�\�\�0O�=�%\�K��܈y�\r\���\�^\�\��S<��>\�|�\��j\�X�`�X\�\��p:?\��A�H�W&\�镶@�\�\�1z\�T�\0\0x\'�l\�8\�\�9�s���\�ɦ.�7:��\�E{��ks���\0�h[\�\�.�>���E\�\�~�\�\�\rtQ�\�\�h�\�J�6s��~\�Ώ{R}����\�����\�\�\�\���;m���\0\04>.\\\�=K�\�Թ-\�\�穼��\r�\�=B\�=\��9pPZ(\�ƅk����\�[�)WÜ\�\����^\�O\�.\\�\�[\'��\�(¾�\�K�Jw)\�\��1�\n�\�\�kc>\�Ť\\�d\�{�8j\�\�\�\�P:[\�\�\�PykX@\�\��\�\�)L4�l�ȶDs�];��,j\�\����NT�E<��:�\���3�\�\�\�\����΃0\�@|Ծ	���cz\�}o\�o/eǭ\Zwx�ݬ/�\�\0��\"h�z\�\�\��4jS\�\�\�\�o7�\�\�\�y�\r\��7�\�\��w\��\�\�o\�~˛̴LZht�k�|l\�\�~�\�f=DGIgd�\�|[,\'*y�K�t�Վ��2�h-\�?\�B\�/԰?�IR�n�\�5\�S\�?\0\��@�\�\�\� Aiׇ\�\�Qu`ޠ�*fY)GH\�?̲����\�\0�z2�e\�\0�\�.-���\�O\���7C\��w\�ǤT��MG��/�a\�X�(*\�\�ߎ�\0\�\�\�\�_\r�\�dh2�\�{!^\�_��y�\�\�\�.\\Dz��\�\0	�\�BǺ\�\�9\�~FI��o\�Q�Pҽ�G}�~l��2�`�\���t��|���	\�b5B�\��ZZgyʪ�\��ϲ��e\��.]T2\�]\�w<\�\0\��\� Z�8?<.<c\��<�^��N�zv�\�2�MIhx���\�\�\��\0__/_\\NOV\�Dفu�U�٢vxP	�f�zYg,�G$�F:𺠬յ�\�T?BG?\�\0�U9 X\nw�\0ێ|�L�C\�vQb\�\'�\��<�\�Я�c�O\�o9\�)\�4Ͱ!\�s� ⭬ho�Ei~g\��\�\�^\�P-䶗^`\�8-M�sØ�j\�\�)\���I\\ۑ\�d\�P\�SN�\�c0a3�M�t*\�`)X�y3\�3\�\�gi���4q\�R\�@\�\�m�ҐL����333333.ffff\\\�\�\�\�\�\�\�|��-϶�p<��d?N�p\�\�>S�\��\�Zw\�3���\\�h},{�R\'�!x�{�m\�\�\�1Q\��Зr1��Ӂ\�/~�j�.���E\0J2h��̀���\�k/y \��e\�\�\�O���۵\��\n�!�\�P{��\�~\�9\���u��\�%�iQ\�Va�\�?A|�V��\� �\��\�\�\\DV[��\�啷<\�t\�>�\�\�etn�!\��\����\�c�333333333337��������㙙��������������Ջ�O1\�G�G�ޮ�\�\�l����頺+̆�tF�\�d*�G\�8\n62�T��s\�\�L\�<9d�G�Ub���\�\ZD��\�9-\��]\�\�o��4�\�8�\�:!hokk+\�m\�_\�j\�H�\�=sK\�\�.\���8S�՘}��\�G9Du��\�Aky���m\�\��\"v��\0�\���_jPU�MvR\�\�\\�ୠ7/\�w\�\�5c����`�<\�\�fffg�ffffffffffffffx\�gᙼ\�\�\�\�\��P[ury9\�u{\0�\'&3+#@i\�\�\�\�ʒ��P��R\"\��Dz\�Zi\�!�˼\�\�\\c�5��įl��\�\�I���\�ܔߘz�\�:4\�w\�J\"�R3]�:+�\�6=\�\\LX\�\�\�\�d�/�����ĎA8������\�)\��X{cJ�9Kۓ\�td\�IA\�{ʹ\\�\�TG�3w�G*ୂ�\�\�\�\�Ts�(Eh� �)\�y<\\f�3�o_�<2\�\�9��^	��\� �\�\�j��f5�\�N\��\�\�K\�:\�؇#�\�\�W�y��\�9�\�fg�xg�fx\�37��\�+�&�uK�Qș��6	*�Wo7=T\�\��j#��1���ԁ\�U\�\�\�|\�9\�u:D(DN\�<u\�y.�>�x4�\��1C���_�\�J�5Vj��\�|)��v]\�u�yqc�W������խ)b�.kUﯨd\0\0;\Z�/�a�\�(\�Ք6O,\�5�_	�[Ur�\�W8y�:5���\0���hT�L�噙\"�\�]:\'m^\�ńy\�@r��Ţ�K�4\�\�g\��u\�2\'2\�4teW,p\�g�f�\0\�\��o7\�\�fo\�\�o7\�\�\�߆f\�y�\�\0\��~کbD)�\�í\�\�\�\�r��\�\�\�\�@:~g?\��DPp:?\�\�C�WryYɾuNK�\�W@j�8\�\�!G�}CC�U;\�\�6�	+FY˂\�N���>�i�p<b\\l\�jZ��T\�= �\�\�3\��p��\�	�W�0$໿y\�u̪if�\�9}w\�\�\�Ux؃\�:-�\�C� \0��V�3\�y��f�33337�\�\r\�\�32�J�ʥJ�߆f�k\�S<=\�\�\�\�\�\�-���\�l\�����>�qƽZ5�|�̩m>b:�)\�j~%��\":��r�b\�ֽݪ\�Gt{\�MIߢtL&O� T\�\�M,;�{CE/��\�\�c q�,[�|\�\\)��\�-\�r��Q\�\�=�\�\�\�\�\��a�B�&\09q�S�\r�o+�\�W\�ʏƥJ�x\��\0�\�o*o\�߃D\�jr\�;��~\�x\�&�\�\�\Zk���~\�&\�\��\�\�>��b��\�\'-���Z\�\�^����\�p\�\�/Yl�\�V;M�_I�\�X\���\�s�!�\�L\���ȧ�\�5[h5\\J�_�\�M{\Z\�\�yqz�X�U\'�\'`s�\0�?\�ߍ|\��Ԯ*W\n�ʕ*T�+��*T�R�E\�aq\�ϕ\�\�Ǚ-6���\r�\�(qj�\�\�c\�1@\�\�:�O��3\Z,xeDm�үq\�{�Ħ��6�\�W\��̇Ũ�\�5;]v�*W�\�\�xBkwn@\�<\�f�F�\�×~%KX洁z���w,��;�\�1\�R�p�ƥJ�*W¥|\�W\n�WƸW�\�S�`�y����\�d�ˎ\�\�ͣM_�<�0\�=!\�+�\�s;�Gֶ#&<r��\��uhDB:f�{�\�WmN\�\�\��rypDDO\��t�A�	~�0j��<1qc�y�n��\�.�Jr�5\�Z\�{V�WΥJ�+\�R�\�\�o7�\�\�o7\�\�o7�\�\�o\�y�߆\�~\�\�3�K��:В���z9���[\�.�\�~ܹ4��\�2a!/�D\�\�1:��_\0���2z@}<\�_�?\�H3\\�B����\��\�GW�\�|\�R�m�����`Pd�\�qm���\�y�\�o\�y�\�y�߆\�y�\r\�\�~\�\�\�y^ey������\�bbW�R�\�\�1+̯2�\�\�y�\�bbW�S�\�\�+\�į1+4\"XDu^s�Ǚ\�~�4�	\�!\�zG/gxj��)�\0y%L-\�\�#��o&AÎξcm�۬v�\�\�\�\�\���׫\�<MB�\�W�\�\�(mKoKu~j��%y�\�bW�^ey�\�W�^f%y��\�W�^f%y�\�bW�^f&&&%y�\�W�^ey�\�W���\�bbc�&&8bbbc�8c�&8{㉈\�e�Q%XQvW���fz��r\��\�6|�9\��*ן)\�h\�52\�˫5\�\�wׅ䕮�\�x5IU\�\\\�\�F\�\�\�p\�=\�LLLLLLp\�\�\�\�LLp\�\�\�\�11\�\�LLLLLp\�\�\�\�~\�9d5I\�9�\'[��W\�h��ȰiĶ��Y�\�\�\�11Ak�m?%\�r\�s�\�@08��\�sW�@\Z�ֵuם|�7��\�c�&8o¼\�\���\��1\��቉�\�\�\�\�\�bbbbc�8י�b/�GD\�w�,~��bsE#\�ᩭ�9˲biiU�\�]\�F @U\�͌\�@^?j\�j\��\�Q�3p\�V_5\�¿Eq1\������c�LLT\�\�\�o117\�^f&&�1\�11\�7�\�����\�߆8bbc���\�\�-\�\�\�,\\�\n�a��,j�\�\Z\'�K�w�4֭Z	\�X\�|K[\�49΃�<��&&\�7\�\�p\�\�\�\r\�&&8\�1\�~\�LK���������11111.\\���s\�˗1.b\\\�\�\�\�ĭ�\�\���ǂ\"dIU\�\�\0�8Q͓\�:���C\�\�\�\n\04\n�����11\Z��.\\\�\�\�\�Ĺr\�&&%\�LLLLK�LLK�\�1=˗/��r\�8\�˗.\\�sܹr\�˗.\\�r\�˞\�ˈJ\�a�t��\0ȹ��˭9\�pǡ\�a\�o֩5u�-U\���r\�˗\�\�.\\�p�=˗.\\�r\�˗.\\�r\�˗.\\�;�}M�\�/\�\�\�\r\��\0\r�z\�߆\��İnqNr\�\�\���);0��\�\�\0\�\�\�݌\�\��\0\�\r�7\�\��w\��_\��\\\��\�%�	\�\�\�\Z���H8�\'��k�\0\��_�\05�&�\�m��\0+�\0��\0\�\\�r\�˗.\\�r\�˗.\\�r\�˗.\\�r\�˗.\\�r\�˗.\\�r\�˗.\\�r\�˗.\\�r\�˗.\\�r\�˗.\\�r\�˗33.{���/�ffffffg�s32\�e\�\�ff\\\�\�\�\�\�˗333.\\�����s3<.\\\�̹r\�\�˗333=\�s32\�𹙙�\�fffffffffffffg�fffffffffffffffffffffffffffffffffffffffffffffffffffffffxffffffffg\�\�x\�o3\�~�ᙙ�\�\�o\�33y���\�\�\�\��Y�\�߆�37\�\�\�r\�ᙿ\�y�\�\�o+�~\�\�\�ᙙ׎�7�\�\�\�\r\�\�<7�\�\�\�\��337�\�\�\�37\�\�\�\�x\�\�\�<s�\0���ßs\���\�s�8\�!����8u�\�\�\�r�\�ǧt�\'9\�s\�p8r�!��\�9\��\�',1,'Aguilera'),(4,'0801199912344','Mendel','Brez','Aguilar','M',88795986,0,22101972,'1998-02-12','Tegucigalpa','Res. Plaza',NULL,1,'Perez'),(5,'0801199925684','Lisandro','Emanuel','Maradiaga','M',33333333,0,89784514,'1998-02-02','Tegucigalpa','La cañada',NULL,1,'Pereira'),(6,'0801199993312','Enrique','Emanue','Ortez','M',22222222,0,33333333,'1999-05-30','Tegucigalpa','La Kennedy',NULL,1,'Camavinga'),(7,'0801119996564','Maverick','Manuel','Fonseca','M',22222222,0,33333333,'1998-02-02','Tegus','Los alpes',NULL,1,NULL),(8,'0801199991232','Alberto','Jose','Perez','M',22222222,0,33333333,'2000-07-02','Danli','El paraiso',NULL,1,'Bisho');
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
