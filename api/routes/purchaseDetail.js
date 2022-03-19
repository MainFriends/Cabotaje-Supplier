const express = require('express');
const router = express.Router();
const purchaseDetailController = require('../controllers/purchaseDetailController');

router.get('/purchase-detail/:codDetail', purchaseDetailController.getDetail);
router.post('/purchase-detail', purchaseDetailController.addDetail);
router.put('/purchase-detail/:codDetail', purchaseDetailController.updateDetail);
router.delete('/purchase-detail/:codDetail', purchaseDetailController.deleteDetail);

module.exports = router;