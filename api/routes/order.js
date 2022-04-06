const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const userExtractor = require('../middlewares/userExtractor');
const verifyRoleSalesPurchase = require('../middlewares/verifyRoleSalesPurchase');

router.get('/order', [userExtractor, verifyRoleSalesPurchase], orderController.getOrders);
router.get('/order/:codOrder', [userExtractor, verifyRoleSalesPurchase], orderController.getOrder);
router.post('/order', [userExtractor, verifyRoleSalesPurchase], orderController.addOrder);
router.put('/order/:codOrder', [userExtractor, verifyRoleSalesPurchase], orderController.updateOrder);
router.delete('/order/:codOrder', [userExtractor, verifyRoleSalesPurchase], orderController.deleteOrder);


module.exports = router;