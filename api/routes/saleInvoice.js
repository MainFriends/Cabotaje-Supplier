const express = require('express');
const router = express.Router();
const saleInvoiceController = require('../controllers/saleInvoiceController');
const userExtractor = require('../middlewares/userExtractor');
const verifyRoleSalesInvoice = require('../middlewares/verifyRoleSalesInvoice');

router.get('/sale-invoice', [userExtractor, verifyRoleSalesInvoice], saleInvoiceController.getInvoices);
router.get('/sale-invoice/:codInvoice', [userExtractor, verifyRoleSalesInvoice], saleInvoiceController.getInvoice);
router.post('/sale-invoice', [userExtractor, verifyRoleSalesInvoice], saleInvoiceController.addInvoice);

module.exports = router;