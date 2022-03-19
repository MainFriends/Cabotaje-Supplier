/* IMPORTAR PAQUETES */
const express = require('express');
const bodyParser = require('body-parser');
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
const decrease = require('./routes/decrease')
const returnProduct = require('./routes/returnProduct.js')

/* CREAR SERVIDOR */
const app = express();

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
app.use('/api', decrease)
app.use('/api', returnProduct)

/* ASIGNAR PUERTO Y LEVANTAR SERVIDOR */
const port = process.env.PORT;
app.listen(port, () => {
    console.log(`El servidor se esta ejecutando en el puerto ${port}`)
});