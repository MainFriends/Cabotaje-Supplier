const express = require('express');
const router = express.Router();
const typeOutController = require('../controllers/typeOutController');
const userExtractor = require('../middlewares/userExtractor');
const verifyRoleProduction = require('../middlewares/verifyRoleProduction');

router.get('/typeOut', [userExtractor, verifyRoleProduction], typeOutController.getTypOut);
router.get('/typeOut/:codTypOut', [userExtractor, verifyRoleProduction], typeOutController.getTypOutS);
router.post('/typeOut', [userExtractor, verifyRoleProduction], typeOutController.addTypOut);
router.put('/typeOut/:codTypOut', [userExtractor, verifyRoleProduction], typeOutController.updateTypOut);
router.delete('/typeOut/:codTypOut', [userExtractor, verifyRoleProduction], typeOutController.deleteTypOut);

module.exports = router;