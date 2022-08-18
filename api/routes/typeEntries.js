const express = require('express');
const router = express.Router();
const typeEntriesController = require('../controllers/typeEntriesController');
const userExtractor = require('../middlewares/userExtractor');
const verifyRoleProduction = require('../middlewares/verifyRoleProduction');

router.get('/typeEntries', [userExtractor, verifyRoleProduction], typeEntriesController.getTypEntries);
router.get('/typeEntries/:codTypEntries', [userExtractor, verifyRoleProduction], typeEntriesController.getTypEntriesS);
router.post('/typeEntries', [userExtractor, verifyRoleProduction], typeEntriesController.addTypEntries);
router.put('/typeEntries/:codTypEntries', [userExtractor, verifyRoleProduction], typeEntriesController.updateTypEntries);
router.delete('/typeEntries/:codTypEntries', [userExtractor, verifyRoleProduction], typeEntriesController.deleteTypEntries);

module.exports = router;