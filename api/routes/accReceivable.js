const express = require('express');
const router = express.Router();
const accReceivableController = require('../controllers/accReceivableController');
const userExtractor = require('../middlewares/userExtractor');
const verifyRoleAccounting = require('../middlewares/verifyRoleAccounting');

router.get('/accounts-receivable', [userExtractor, verifyRoleAccounting], accReceivableController.getAccReceivables);
router.get('/accounts-receivable/:codAccReceivable',[userExtractor, verifyRoleAccounting], accReceivableController.getAccReceivable);
router.post('/accounts-receivable',[userExtractor, verifyRoleAccounting], accReceivableController.addAccReceivable);


module.exports = router;