const express = require('express');
const router = express.Router();
const productOutputsController = require('../controllers/productOutputsController');
const userExtractor = require('../middlewares/userExtractor');
const verifyRoleProduction = require('../middlewares/verifyRoleProduction');

router.get('/product-outputs', [userExtractor, verifyRoleProduction], productOutputsController.getProductOutputsAll);
router.get('/product-outputs/:codProductOutput', [userExtractor, verifyRoleProduction], productOutputsController.getProductOutputs);
router.post('/product-outputs', [userExtractor, verifyRoleProduction], productOutputsController.addProductOutputs);
router.put('/product-outputs/:codProductOutput', [userExtractor, verifyRoleProduction], productOutputsController.updateProductOutputs);
router.delete('/product-outputs/:codProductOutput', [userExtractor, verifyRoleProduction], productOutputsController.deleteProductOutputs);

module.exports = router;