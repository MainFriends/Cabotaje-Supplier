const express = require('express');
const router = express.Router();
const userExtractor = require('../middlewares/userExtractor');
const graphicsControler = require('../controllers/graphicsController');

router.get('/roles', userExtractor, graphicsControler.getRoles);
router.get('/sales-products', userExtractor, graphicsControler.getSalesProducts);
router.get('/sales-invoices-week', userExtractor, graphicsControler.getSalesWeek);
router.get('/sales-invoices-month', userExtractor, graphicsControler.getSalesMonth);

module.exports = router;