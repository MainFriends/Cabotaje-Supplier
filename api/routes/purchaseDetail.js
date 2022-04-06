const express = require('express');
const router = express.Router();
const purchaseDetailController = require('../controllers/purchaseDetailController');
const userExtractor = require('../middlewares/userExtractor');
const verifyRoleSalesPurchase = require('../middlewares/verifyRoleSalesPurchase');

router.get('/purchase-detail/:codDetail', [userExtractor, verifyRoleSalesPurchase], purchaseDetailController.getDetail);
router.post('/purchase-detail', [userExtractor, verifyRoleSalesPurchase], purchaseDetailController.addDetail);
router.put('/purchase-detail/:codDetail', [userExtractor, verifyRoleSalesPurchase], purchaseDetailController.updateDetail);
router.delete('/purchase-detail/:codDetail', [userExtractor, verifyRoleSalesPurchase], purchaseDetailController.deleteDetail);

module.exports = router;