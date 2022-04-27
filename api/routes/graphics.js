const express = require('express');
const router = express.Router();
const userExtractor = require('../middlewares/userExtractor');
const graphicsControler = require('../controllers/graphicsController');

router.get('/roles-graphics', userExtractor, graphicsControler.getRoles);
router.get('/sales-products', userExtractor, graphicsControler.getSalesProducts);
router.get('/sales-invoices-week', userExtractor, graphicsControler.getSalesWeek);
router.get('/sales-invoices-month', userExtractor, graphicsControler.getSalesMonth);
router.get('/type-pay', userExtractor, graphicsControler.getGraphicsType );
router.get('/sales-category', userExtractor, graphicsControler.getGraphicsCategory);
router.get('/purchase-invoice-week', userExtractor, graphicsControler.getPurchaseWeek);
router.get('/purchase-invoice-month', userExtractor, graphicsControler.getPurchaseMonth);
router.get('/sales-employee', userExtractor, graphicsControler.getSalesEmployee);
router.get('/purchase-supplier', userExtractor, graphicsControler.getPurchaseSupplier);
router.get('/tot-sales-day', userExtractor, graphicsControler.getSalesDay);
router.get('/purchase-per-week', userExtractor, graphicsControler.getPurchaseToDay);
router.get('/orders-process', userExtractor, graphicsControler.getOrdesPro);
router.get('/sales-day', userExtractor, graphicsControler.getDaySales);
router.get('/cant-client', userExtractor, graphicsControler.getCantClient);
router.get('/drecrease-graphics', userExtractor, graphicsControler.getDrecrease);

module.exports = router;