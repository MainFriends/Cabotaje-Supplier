/* IMPORTAR PAQUETES */
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

/* IMPORTAR API ROUTES */
//contabilidad
const payForm = require('./routes/payForm');
const accReceivable = require('./routes/accReceivable');
const accPay = require('./routes/accPay');
const feesReceivable = require('./routes/feesReceivable');
const feesPay = require('./routes/feesPay');
const salesDiscounts = require('./routes/salesDiscounts');
const salesReturns = require('./routes/salesReturns');
//ventas
const saleInvoice = require('./routes/saleInvoice');
const saleDetail = require('./routes/saleDetail');
//usuarios
const login = require('./routes/login');
const user = require('./routes/user');
const supplier= require('./routes/supplier');
const client= require('./routes/client')
const notifications = require('./routes/notifications');
//ordenes
const order = require('./routes/order');
const orderDetail = require('./routes/order-detail');
//compras
const purchaseInvoice = require('./routes/purchaseInvoice');
const purchaseDetail = require('./routes/purchaseDetail');
//inventario
const inventory = require('./routes/inventory')
const inventoryDetail = require('./routes/inventoryDetail')
const productOutputs = require('./routes/productOutputs')
const productEntries = require('./routes/productEntries')
const typeEntries = require('./routes/typeEntries')
const typeOut = require('./routes/typeOut')
//graficas
const graphics = require('./routes/graphics.js');
const inventoryTransactions = require('./routes/inventoryTransactions')
const inventoryCategory = require ('./routes/inventoryCategory')
//sesion
const userSession = require('./routes/userSession')
//user-profile
const userProfile = require('./routes/userProfile')
//tablas parametricas
const parametricTables = require('./routes/parametricTables')
//roles y permisos
const bitacora = require('./routes/bitacora')
const rolesAndPermissions = require('./routes/rolesAndPermissions');
// Tipo de entradas y salidas
const TypeEntriesOutputs = require('./routes/TypeEntriesOutputs');
// Información de la empresa
const informationInformation = require('./routes/companyInformation')
const systemSettings = require('./routes/systemSettings')
const BackupAndRestore = require('./routes/BackupAndRestore')

/* CREAR SERVIDOR */
const app = express();

/* CORS */
app.use(cors());

/* BODY-PARSER */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

/* REGISTRAR RUTAS */
//contabilidad
app.use('/api', payForm);
app.use('/api', accReceivable);
app.use('/api', accPay);
app.use('/api', feesReceivable);
app.use('/api', feesPay);
app.use('/api', salesDiscounts);
app.use('/api', salesReturns);
//ventas
app.use('/api', saleInvoice);
app.use('/api', saleDetail);
//usuarios
app.use('/api', user);
app.use('/api', login);
app.use('/api', supplier); 
app.use('/api', client); 
app.use('/api', notifications);
//ordenes
app.use('/api', order);
app.use('/api', orderDetail);
//compras
app.use('/api', purchaseInvoice);
app.use('/api', purchaseDetail)
//inventario
app.use('/api', inventory)
app.use('/api', inventoryDetail)
app.use('/api', productOutputs)
app.use('/api', productEntries)
app.use('/api', typeEntries)
app.use('/api', typeOut)
//graficas
app.use('/api', graphics)

app.use('/api', inventoryTransactions)
app.use('/api', inventoryCategory)
//sesion
app.use('/api', userSession)
//user-profile
app.use('/api', userProfile)
//tablas parametricas
app.use('/api', parametricTables)
// roles y permisos
app.use('/api', rolesAndPermissions)
app.use('/api', bitacora)
app.use('/api', TypeEntriesOutputs)
app.use('/api', informationInformation)
app.use('/api', systemSettings)
app.use('/api', BackupAndRestore)


//Mostrar UI
app.use(express.static(path.join(__dirname, '../dist')));
app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

/* ASIGNAR PUERTO Y LEVANTAR SERVIDOR */
const port = process.env.PORT;
app.listen(port, () => {
    console.log(`El servidor se esta ejecutando en el puerto ${port}`)
});