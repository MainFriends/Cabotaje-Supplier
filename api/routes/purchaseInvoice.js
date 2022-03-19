const express = require('express');
const router = express.Router();
const purchaseInvoiceController = require('../controllers/purchaseInvoiceController');

router.get('/purchase-invoice', purchaseInvoiceController.getPurchases);
router.get('/purchase-invoice/:codInvoice', purchaseInvoiceController.getPurchase);
router.post('/purchase-invoice', purchaseInvoiceController.addPurchase);
router.put('/purchase-invoice/:codInvoice', purchaseInvoiceController.updatePurchase);
router.delete('/purchase-invoice/:codInvoice', purchaseInvoiceController.deletePurchase);

module.exports = router;

