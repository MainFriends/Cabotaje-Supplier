const express = require('express');
const router = express.Router();
const saleInvoiceController = require('../controllers/saleInvoiceController');
const userExtractor = require('../middlewares/userExtractor');

router.get('/sale-invoice', userExtractor, saleInvoiceController.getInvoices);
router.get('/sale-invoice/:codInvoice', userExtractor, saleInvoiceController.getInvoice);
router.post('/sale-invoice', userExtractor, saleInvoiceController.addInvoice);

module.exports = router;