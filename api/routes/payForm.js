const express = require('express');
const router = express.Router();
const payFormController = require('../controllers/payFormController');
const userExtractor = require('../middlewares/userExtractor');
const verifyRoleAccounting = require('../middlewares/verifyRoleAccounting');

router.get('/pay-form', [userExtractor, verifyRoleAccounting], payFormController.getPayForms);
router.get('/pay-form/:codPayForm', [userExtractor, verifyRoleAccounting], payFormController.getPayForm);
router.post('/pay-form', [userExtractor, verifyRoleAccounting], payFormController.addPayForm);
router.put('/pay-form/:codPayForm', [userExtractor, verifyRoleAccounting], payFormController.updatePayForm);
router.delete('/pay-form/:codPayForm', [userExtractor, verifyRoleAccounting], payFormController.deletePayForm);

module.exports = router;