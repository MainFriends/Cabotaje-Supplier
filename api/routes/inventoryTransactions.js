const express = require('express');
const router = express.Router();
const inventoryTransactionsController = require('../controllers/inventoryTransactionsController');
const userExtractor = require('../middlewares/userExtractor');
const verifyRoleProduction = require('../middlewares/verifyRoleProduction');

router.get('/inventoryTransactions', [userExtractor, verifyRoleProduction], inventoryTransactionsController.getInventoryTransactions);
router.get('/find-lotes/:codProduct', [userExtractor, verifyRoleProduction], inventoryTransactionsController.getLotes);


module.exports = router;