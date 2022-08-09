const express = require('express');
const router = express.Router();
const systemSettingsController = require('../controllers/systemSettingsController');
const userExtractor = require('../middlewares/userExtractor');
const verifyRoleAccounting = require('../middlewares/verifyRoleAccounting');

router.get('/system-settings', [userExtractor, verifyRoleAccounting], systemSettingsController.getSystemSetting);
router.put('/system-settings', [userExtractor, verifyRoleAccounting], systemSettingsController.updateSystemSetting);

module.exports = router;