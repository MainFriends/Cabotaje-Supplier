const express = require('express');
const router = express.Router();
const saleDetailController = require('../controllers/saleDetailController');
const userExtractor = require('../middlewares/userExtractor');
const verifyRoleSalesInvoice = require('../middlewares/verifyRoleSalesInvoice');

router.get('/sale-detail/:codInvoice', [userExtractor, verifyRoleSalesInvoice], saleDetailController.getDetail);
router.post('/sale-detail', [userExtractor, verifyRoleSalesInvoice], saleDetailController.addDetail);

module.exports = router;