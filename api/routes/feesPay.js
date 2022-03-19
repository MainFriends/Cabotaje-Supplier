const express = require('express');
const router = express.Router();
const feesPayController = require('../controllers/feesPayController');
const userExtractor = require('../middlewares/userExtractor');

router.get('/fees-pay/:codAccPay', userExtractor, feesPayController.getFeesPay);
router.post('/fees-pay', userExtractor, feesPayController.addFeesPay);
router.delete('/fees-pay/:codFeesPay', userExtractor, feesPayController.deleteFeesPay);

module.exports = router;