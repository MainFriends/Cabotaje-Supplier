const express = require('express');
const router = express.Router();
const TypeEntriesOutputsController = require('../controllers/TypeEntriesOutputsController');
const userExtractor = require('../middlewares/userExtractor');
const verifyRoleProduction = require('../middlewares/verifyRoleProduction');

router.get('/type-entries', [userExtractor, verifyRoleProduction], TypeEntriesOutputsController.getTypeEntries);
router.get('/type-outputs', [userExtractor, verifyRoleProduction], TypeEntriesOutputsController.getTypeOutputs);

module.exports = router;