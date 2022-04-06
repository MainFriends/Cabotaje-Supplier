const express = require('express');
const router = express.Router();
const salesReturnsController = require('../controllers/salesReturnsController');
const userExtractor = require('../middlewares/userExtractor');
const verifyRoleAccounting = require('../middlewares/verifyRoleAccounting');

router.post('/sales-returns', [userExtractor, verifyRoleAccounting], salesReturnsController.addSalesReturn);
router.put('/sales-returns/:codReturn', [userExtractor, verifyRoleAccounting], salesReturnsController.updateSalesReturn);
router.get('/sales-returns', [userExtractor, verifyRoleAccounting], salesReturnsController.getSalesReturns);
router.get('/sales-returns/:codReturn', [userExtractor, verifyRoleAccounting], salesReturnsController.getSalesReturn);
router.delete('/sales-returns/:codReturn', [userExtractor, verifyRoleAccounting], salesReturnsController.deleteSalesReturn);

module.exports = router;