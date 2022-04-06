const express = require('express');
const router = express.Router();
const returnProductController = require('../controllers/returnProductController');
const userExtractor = require('../middlewares/userExtractor');
const verifyRoleProduction = require('../middlewares/verifyRoleProduction');

router.get('/returnProduct', [userExtractor, verifyRoleProduction], returnProductController.getReturnProduct);
router.get('/returnProduct/:codReturnProduct', [userExtractor, verifyRoleProduction], returnProductController.getReturnProductS);
router.post('/returnProduct', [userExtractor, verifyRoleProduction], returnProductController.addReturnProduct);
router.put('/returnProduct/:codReturnProduct', [userExtractor, verifyRoleProduction], returnProductController.updateReturnProduct);
router.delete('/returnProduct/:codReturnProduct', [userExtractor, verifyRoleProduction], returnProductController.deleteReturnProduct);

module.exports = router;