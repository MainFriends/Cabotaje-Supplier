const express = require('express');
const router = express.Router();
const feesReceivableController = require('../controllers/feesReceivableController');
const userExtractor = require('../middlewares/userExtractor');
const verifyRoleAccounting = require('../middlewares/verifyRoleAccounting');

router.get('/fees-receivable/:codAccReceivable', [userExtractor, verifyRoleAccounting], feesReceivableController.getFeesReceivable);
router.post('/fees-receivable/:codAccReceivable', [userExtractor, verifyRoleAccounting], feesReceivableController.addFeesReceivable);
router.delete('/fees-receivable/:codFeesReceivable', [userExtractor, verifyRoleAccounting], feesReceivableController.deleteFeesReceivable);

module.exports = router;
