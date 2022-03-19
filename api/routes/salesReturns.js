const express = require('express');
const router = express.Router();
const salesReturnsController = require('../controllers/salesReturnsController');
const userExtractor = require('../middlewares/userExtractor');

router.post('/sales-returns', userExtractor, salesReturnsController.addSalesReturn);
router.put('/sales-returns/:codReturn', userExtractor, salesReturnsController.updateSalesReturn);
router.get('/sales-returns', userExtractor, salesReturnsController.getSalesReturns);
router.get('/sales-returns/:codReturn', userExtractor, salesReturnsController.getSalesReturn);
router.delete('/sales-returns/:codReturn', userExtractor, salesReturnsController.deleteSalesReturn);

module.exports = router;