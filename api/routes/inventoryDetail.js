const express = require('express');
const router = express.Router();
const inventoryDetailController = require('../controllers/inventoryDetailController');

router.get('/inventoryDetail', inventoryDetailController.getInventoryDetail);
router.get('/inventoryDetail/:codInventoryDetail', inventoryDetailController.getInventoryDetailS);
router.post('/inventoryDetail', inventoryDetailController.addInventoryDetail);
router.put('/inventoryDetail/:codInventoryDetail', inventoryDetailController.updateInventoryDetail);
router.delete('/inventoryDetail/:codInventoryDetail', inventoryDetailController.deleteInventoryDetail);

module.exports = router;