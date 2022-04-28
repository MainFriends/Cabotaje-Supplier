const express = require('express');
const router = express.Router();
const inventoryCategoryController = require('../controllers/inventoryCategoryController');
const userExtractor = require('../middlewares/userExtractor');
const verifyRoleProduction = require('../middlewares/verifyRoleProduction');

router.get('/inventoryCategory', [userExtractor, verifyRoleProduction], inventoryCategoryController.getCategory);
router.get('/inventoryCategory/:codCategory', [userExtractor, verifyRoleProduction], inventoryCategoryController.getCategoryS);
router.post('/inventoryCategory', [userExtractor, verifyRoleProduction], inventoryCategoryController.addCategory);
router.put('/inventoryCategory/:codCategory', [userExtractor, verifyRoleProduction], inventoryCategoryController.updateCategory);
router.delete('/inventoryCategory/:codCategory', [userExtractor, verifyRoleProduction], inventoryCategoryController.deleteCategory);

module.exports = router;