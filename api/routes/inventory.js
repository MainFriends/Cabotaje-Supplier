const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');
const userExtractor = require('../middlewares/userExtractor');
const verifyRoleProduction = require('../middlewares/verifyRoleProduction');

router.get('/inventory', [userExtractor, verifyRoleProduction], inventoryController.getInventory);
router.get('/inventory/:codInventory', [userExtractor, verifyRoleProduction], inventoryController.getInventoryS);
router.post('/inventory', [userExtractor, verifyRoleProduction], inventoryController.addInventory);
router.put('/inventory/:codInventory', [userExtractor, verifyRoleProduction], inventoryController.updateInventory);
router.delete('/inventory/:codInventory', [userExtractor, verifyRoleProduction], inventoryController.deleteInventory);

module.exports = router;