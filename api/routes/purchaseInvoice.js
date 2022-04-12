const express = require('express');
const router = express.Router();
const purchaseInvoiceController = require('../controllers/purchaseInvoiceController');
const userExtractor = require('../middlewares/userExtractor');
const verifyRoleSalesPurchase = require('../middlewares/verifyRoleSalesPurchase');

router.get('/purchase-invoice', [userExtractor, verifyRoleSalesPurchase], purchaseInvoiceController.getPurchases);
router.get('/purchase-invoice/:codInvoice', [userExtractor, verifyRoleSalesPurchase], purchaseInvoiceController.getPurchase);
router.post('/purchase-invoice', [userExtractor, verifyRoleSalesPurchase], purchaseInvoiceController.addPurchase);
router.put('/purchase-invoice/:codInvoice', [userExtractor, verifyRoleSalesPurchase], purchaseInvoiceController.updatePurchase);
router.delete('/purchase-invoice/:codInvoice', [userExtractor, verifyRoleSalesPurchase], purchaseInvoiceController.deletePurchase);

module.exports = router;

