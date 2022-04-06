const express = require('express');
const router = express.Router();
const salesDiscountsController = require('../controllers/salesDiscountController');
const userExtractor = require('../middlewares/userExtractor');
const verifyRoleAccounting = require('../middlewares/verifyRoleAccounting');

router.get('/sales-discounts', [userExtractor, verifyRoleAccounting], salesDiscountsController.getSalesDiscounts);
router.get('/sales-discounts/:codDiscount', [userExtractor, verifyRoleAccounting], salesDiscountsController.getSalesDiscount);

module.exports = router;