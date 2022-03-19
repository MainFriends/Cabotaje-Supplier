const express = require('express');
const router = express.Router();
const accReceivableController = require('../controllers/accReceivableController');
const userExtractor = require('../middlewares/userExtractor');

router.get('/accounts-receivable', userExtractor, accReceivableController.getAccReceivables);
router.get('/accounts-receivable/:codAccReceivable', userExtractor, accReceivableController.getAccReceivable);
router.post('/accounts-receivable', userExtractor, accReceivableController.addAccReceivable);

module.exports = router;