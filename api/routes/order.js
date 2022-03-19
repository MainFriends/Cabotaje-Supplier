const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

router.get('/order', orderController.getOrders);
router.get('/order/:codOrder', orderController.getOrder);
router.post('/order', orderController.addOrder);
router.put('/order/:codOrder', orderController.updateOrder);
router.delete('/order/:codOrder', orderController.deleteOrder);


module.exports = router;