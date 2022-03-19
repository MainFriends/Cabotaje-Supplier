const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');

router.get('/inventory', inventoryController.getInventory);
router.get('/inventory/:codInventory', inventoryController.getInventoryS);
router.post('/inventory', inventoryController.addInventory);
router.put('/inventory/:codInventory', inventoryController.updateInventory);
router.delete('/inventory/:codInventory', inventoryController.deleteInventory);

module.exports = router;