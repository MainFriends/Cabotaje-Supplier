const express = require('express');
const router = express.Router();
const companyInformationController = require('../controllers/companyInformationController');
const userExtractor = require('../middlewares/userExtractor');
const verifyRoleAccounting = require('../middlewares/verifyRoleAccounting');

router.get('/company-information', [userExtractor, verifyRoleAccounting], companyInformationController.getCompanyData);
router.put('/company-information', [userExtractor, verifyRoleAccounting], companyInformationController.updateCompanyData);

module.exports = router;