const express = require('express');
const router = express.Router();
const accPayController = require('../controllers/accPayController');
const userExtractor = require('../middlewares/userExtractor');
const verifyRoleAccounting = require('../middlewares/verifyRoleAccounting');

router.get('/accounts-pay', [userExtractor, verifyRoleAccounting], accPayController.getAccPays);
router.get('/accounts-pay/:codAccPay', [userExtractor, verifyRoleAccounting], accPayController.getAccPay);
router.post('/accounts-pay', [userExtractor, verifyRoleAccounting], accPayController.addAccPay);
router.put('/accounts-pay/:codAccPay', [userExtractor, verifyRoleAccounting], accPayController.updateAccPay);
router.delete('/accounts-pay/:codAccPay',[userExtractor, verifyRoleAccounting], accPayController.deleteAccPay);

module.exports = router;