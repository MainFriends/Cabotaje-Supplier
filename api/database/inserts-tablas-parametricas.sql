/* TABLAS PARAMETRICAS */

-- TABLA DE ROLES
INSERT INTO ROLE(NAM_ROLE, DES_ROLE) VALUES ('Administrador', 'Permisos totales.');
INSERT INTO ROLE(NAM_ROLE, DES_ROLE) VALUES ('Control de calidad', 'Encargado de gestionar pedidos, inventario, etc.');
INSERT INTO ROLE(NAM_ROLE, DES_ROLE) VALUES ('Contador', 'Encargado de gestionar el modulo de contabilidad.');
INSERT INTO ROLE(NAM_ROLE, DES_ROLE) VALUES ('Cajero', 'Permiso solo para operar en el modulo de cobro.');

-- TABLA DE PERMISOS
INSERT INTO PERMISSIONS(COD_ROLE, COD_MODULE, INS, DEL, UPD, QUE) VALUES(1, 1, 1, 1, 1);
INSERT INTO PERMISSIONS(COD_ROLE, COD_MODULE, INS, DEL, UPD, QUE) VALUES(2, 1, 1, 1, 1);
INSERT INTO PERMISSIONS(COD_ROLE, COD_MODULE, INS, DEL, UPD, QUE) VALUES(3, 0, 0, 0, 1);
INSERT INTO PERMISSIONS(COD_ROLE, COD_MODULE, INS, DEL, UPD, QUE) VALUES(4, 0, 0, 0, 1);

-- TABLA DE ESTADOS
INSERT INTO STATUS(NAM_STATUS, DES_STATUS) VALUES('Activo', 'Estado activo.');
INSERT INTO STATUS(NAM_STATUS, DES_STATUS) VALUES('Inactivo', 'Estado Inactivo.');
INSERT INTO STATUS(NAM_STATUS, DES_STATUS) VALUES('Revisado', 'El lote ha sido revisado.');
INSERT INTO STATUS(NAM_STATUS, DES_STATUS) VALUES('Sin revisar', 'El lote se encuentra sin revisar.');
INSERT INTO STATUS(NAM_STATUS, DES_STATUS) VALUES('En proceso', 'Pedido procesado pero no recibido.');
INSERT INTO STATUS(NAM_STATUS, DES_STATUS) VALUES('Recibido', 'El pedido ha sido recibido.');

-- TABLA TIPO DE PAGO
INSERT INTO TYPE_TO_PAY(NAM_TYPE_PAY) VALUES('Efectivo');
INSERT INTO TYPE_TO_PAY(NAM_TYPE_PAY) VALUES('Tarjeta');
INSERT INTO TYPE_TO_PAY(NAM_TYPE_PAY) VALUES('Transferencia');

-- TABLA TIPO DE PRODUCTO
INSERT INTO TYPE_PRODUCT(NAM_TYPE_PRODUCT) VALUES('Unidad');
INSERT INTO TYPE_PRODUCT(NAM_TYPE_PRODUCT) VALUES('Peso/Volumen');

-- CATEGORIAS
INSERT INTO CATEGORY(NAM_CATEGORY, DESCRIPTION) VALUES('Carnes', null);
INSERT INTO CATEGORY(NAM_CATEGORY, DESCRIPTION) VALUES('Refrescos', null);
INSERT INTO CATEGORY(NAM_CATEGORY, DESCRIPTION) VALUES('Lacteos', null);
INSERT INTO CATEGORY(NAM_CATEGORY, DESCRIPTION) VALUES('Verduras', null);

-- MODULOS
INSERT INTO MODULES(NAM_MODULE, DESCRIPTION)
VALUES('Ventas', NULL);
INSERT INTO MODULES(NAM_MODULE, DESCRIPTION)
VALUES('Compras', NULL);
INSERT INTO MODULES(NAM_MODULE, DESCRIPTION)
VALUES('Personas', NULL);
INSERT INTO MODULES(NAM_MODULE, DESCRIPTION)
VALUES('Producción', NULL);
INSERT INTO MODULES(NAM_MODULE, DESCRIPTION)
VALUES('Contabilidad', NULL);
INSERT INTO MODULES(NAM_MODULE, DESCRIPTION)
VALUES('Reportes', NULL);