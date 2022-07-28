const express = require('express');
const router = express.Router();
const productEntriesController = require('../controllers/productEntriesController');
const userExtractor = require('../middlewares/userExtractor');
const verifyRoleProduction = require('../middlewares/verifyRoleProduction');

router.get('/product-entries', [userExtractor, verifyRoleProduction], productEntriesController.getProductEntriesAll);
router.get('/product-entries/:codProductEntrie', [userExtractor, verifyRoleProduction], productEntriesController.getProductEntries);
router.post('/product-entries', [userExtractor, verifyRoleProduction], productEntriesController.addProductEntries);
router.put('/product-entries/:codProductEntrie', [userExtractor, verifyRoleProduction], productEntriesController.updateProductEntries);
router.delete('/product-entries/:codProductEntrie', [userExtractor, verifyRoleProduction], productEntriesController.deleteProductEntries);

module.exports = router;