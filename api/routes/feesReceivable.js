const express = require('express');
const router = express.Router();
const feesReceivableController = require('../controllers/feesReceivableController');
const userExtractor = require('../middlewares/userExtractor');

router.get('/fees-receivable/:codAccReceivable', userExtractor, feesReceivableController.getFeesReceivable);
router.post('/fees-receivable', userExtractor, feesReceivableController.addFeesReceivable);
router.delete('/fees-receivable/:codFeesReceivable', userExtractor, feesReceivableController.deleteFeesReceivable);

module.exports = router;
