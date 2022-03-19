const express = require('express');
const router = express.Router();
const accPayController = require('../controllers/accPayController');
const userExtractor = require('../middlewares/userExtractor');

router.get('/accounts-pay', userExtractor, accPayController.getAccPays);
router.get('/accounts-pay/:codAccPay', userExtractor, accPayController.getAccPay);
router.post('/accounts-pay', userExtractor, accPayController.addAccPay);
router.put('/accounts-pay/:codAccPay', userExtractor, accPayController.updateAccPay);

module.exports = router;