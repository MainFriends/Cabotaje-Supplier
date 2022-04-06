const express = require('express');
const router = express.Router();
const decreaseController = require('../controllers/decreaseController');
const userExtractor = require('../middlewares/userExtractor');
const verifyRoleProduction = require('../middlewares/verifyRoleProduction');

router.get('/decrease', [userExtractor, verifyRoleProduction], decreaseController.getDecrease);
router.get('/decrease/:codDecrease', [userExtractor, verifyRoleProduction], decreaseController.getDecreaseS);
router.post('/decrease', [userExtractor, verifyRoleProduction], decreaseController.addDecrease);
router.put('/decrease/:codDecrease', [userExtractor, verifyRoleProduction], decreaseController.updateDecrease);
router.delete('/decrease/:codDecrease', [userExtractor, verifyRoleProduction], decreaseController.deleteDecrease);

module.exports = router;