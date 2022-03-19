const express = require('express');
const router = express.Router();
const orderDetailController = require('../controllers/orderDetailController');

router.get('/order-detail', orderDetailController.getOrdersDetail);
router.get('/order-detail/:codOrderDetail', orderDetailController.getOrderDetail);
router.post('/order-detail', orderDetailController.addOrderDetail);
router.put('/order-detail/:codOrderDetail', orderDetailController.updateOrderDetail);
router.delete('/order-detail/:codOrderDetail', orderDetailController.deleteOrderDetail);

module.exports = router;