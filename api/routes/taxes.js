const express = require('express');
const router = express.Router();
const taxesController = require('../controllers/taxesController');
const userExtractor = require('../middlewares/userExtractor');
const verifyRoleProduction = require('../middlewares/verifyRoleProduction');

router.get('/taxes/:codTax', [userExtractor, verifyRoleProduction], taxesController.getTax);
router.get('/taxes',  [userExtractor, verifyRoleProduction], taxesController.getTaxes);
router.post('/taxes', [userExtractor, verifyRoleProduction], taxesController.addTax);
router.delete('/taxes/:codTax', [userExtractor, verifyRoleProduction], taxesController.delTax);
router.put('/taxes/:codTax', [userExtractor, verifyRoleProduction], taxesController.updateTax);
router.get('/all-isv', [userExtractor, verifyRoleProduction], taxesController.getISV);

module.exports= router;