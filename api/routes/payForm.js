const express = require('express');
const router = express.Router();
const payFormController = require('../controllers/payFormController');
const userExtractor = require('../middlewares/userExtractor');

router.get('/pay-form', userExtractor, payFormController.getPayForms);
router.get('/pay-form/:codPayForm', userExtractor, payFormController.getPayForm);
router.post('/pay-form', userExtractor, payFormController.addPayForm);
router.put('/pay-form/:codPayForm', userExtractor, payFormController.updatePayForm);
router.delete('/pay-form/:codPayForm', userExtractor, payFormController.deletePayForm);

module.exports = router;