const express = require('express');
const router = express.Router();
const orderDetailController = require('../controllers/orderDetailController');
const userExtractor = require('../middlewares/userExtractor');
const verifyRoleSalesPurchase = require('../middlewares/verifyRoleSalesPurchase');

router.get('/order-detail', [userExtractor, verifyRoleSalesPurchase], orderDetailController.getOrdersDetail);
router.get('/order-detail/:codOrderDetail', [userExtractor, verifyRoleSalesPurchase], orderDetailController.getOrderDetail);
router.post('/order-detail', [userExtractor, [userExtractor, verifyRoleSalesPurchase], verifyRoleSalesPurchase], orderDetailController.addOrderDetail);
router.put('/order-detail/:codOrderDetail', [userExtractor, verifyRoleSalesPurchase], orderDetailController.updateOrderDetail);
router.delete('/order-detail/:codOrderDetail', [userExtractor, verifyRoleSalesPurchase], orderDetailController.deleteOrderDetail);

module.exports = router;