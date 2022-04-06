const express = require('express');
const router = express.Router();
const inventoryDetailController = require('../controllers/inventoryDetailController');
const userExtractor = require('../middlewares/userExtractor');
const verifyRoleProduction = require('../middlewares/verifyRoleProduction');

router.get('/inventoryDetail', [userExtractor, verifyRoleProduction], inventoryDetailController.getInventoryDetail);
router.get('/inventoryDetail/:codInventoryDetail', [userExtractor, verifyRoleProduction], inventoryDetailController.getInventoryDetailS);
router.post('/inventoryDetail', [userExtractor, verifyRoleProduction], inventoryDetailController.addInventoryDetail);
router.put('/inventoryDetail/:codInventoryDetail', [userExtractor, verifyRoleProduction], inventoryDetailController.updateInventoryDetail);
router.delete('/inventoryDetail/:codInventoryDetail', [userExtractor, verifyRoleProduction], inventoryDetailController.deleteInventoryDetail);

module.exports = router;