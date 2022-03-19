const express = require('express');
const router = express.Router();
const saleDetailController = require('../controllers/saleDetailController');
const userExtractor = require('../middlewares/userExtractor');

router.get('/sale-detail/:codInvoice', userExtractor, saleDetailController.getDetail);
router.post('/sale-detail', userExtractor, saleDetailController.addDetail);

module.exports = router;