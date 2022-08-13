const express = require('express');
const router = express.Router();
const BackupController = require('../controllers/BackupController');
const userExtractor = require('../middlewares/userExtractor');
const verifyRoleProduction = require('../middlewares/verifyRoleProduction');

router.get('/backup', [userExtractor, verifyRoleProduction], BackupController.runBackup);
router.get('/restore', [userExtractor, verifyRoleProduction], BackupController.runRestore);

module.exports = router;