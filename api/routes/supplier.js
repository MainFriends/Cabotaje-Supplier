const express = require('express');
const router = express.Router();
const supplierController= require('../controllers/supplierController');

//crear route user
router.get('/supplier',supplierController.getSuppliers);
router.get('/supplier/:codSupplier',supplierController.getSupplier);
router.post('/supplier',supplierController.addSupplier);
router.put('/supplier/:codSupplier',supplierController.updateSupplier);
router.delete('/supplier/:codSupplier',supplierController.deleteSupplier);

module.exports= router;