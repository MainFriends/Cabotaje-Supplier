const express = require('express');
const router = express.Router();
const feesPayController = require('../controllers/feesPayController');
const userExtractor = require('../middlewares/userExtractor');
const verifyRoleAccounting = require('../middlewares/verifyRoleAccounting');

router.get('/fees-pay/:codAccPay', [userExtractor, verifyRoleAccounting], feesPayController.getFeesPay);
router.post('/fees-pay', [userExtractor, verifyRoleAccounting], feesPayController.addFeesPay);
router.delete('/fees-pay/:codFeesPay', [userExtractor, verifyRoleAccounting], feesPayController.deleteFeesPay);

module.exports = router;