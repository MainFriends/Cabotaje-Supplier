const express = require('express');
const router = express.Router();
const salesDiscountsController = require('../controllers/salesDiscountController');
const userExtractor = require('../middlewares/userExtractor');

router.get('/sales-discounts', userExtractor, salesDiscountsController.getSalesDiscounts);
router.get('/sales-discounts/:codDiscount', userExtractor, salesDiscountsController.getSalesDiscount);

module.exports = router;