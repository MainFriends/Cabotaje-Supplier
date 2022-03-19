const express = require('express');
const router = express.Router();
const returnProductController = require('../controllers/returnProductController');

router.get('/returnProduct', returnProductController.getReturnProduct);
router.get('/returnProduct/:codReturnProduct', returnProductController.getReturnProductS);
router.post('/returnProduct', returnProductController.addReturnProduct);
router.put('/returnProduct/:codReturnProduct', returnProductController.updateReturnProduct);
router.delete('/returnProduct/:codReturnProduct', returnProductController.deleteReturnProduct);

module.exports = router;