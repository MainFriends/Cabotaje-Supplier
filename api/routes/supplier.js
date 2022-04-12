const express = require('express');
const router = express.Router();
const supplierController= require('../controllers/supplierController');
const userExtractor = require('../middlewares/userExtractor');
const verifyRolePersons = require('../middlewares/verifyRolePersons');

//crear route user
router.get('/supplier', [userExtractor, verifyRolePersons], supplierController.getSuppliers);
router.get('/supplier/:codSupplier', [userExtractor, verifyRolePersons], supplierController.getSupplier);
router.post('/supplier', [userExtractor, verifyRolePersons], supplierController.addSupplier);
router.put('/supplier/:codSupplier', [userExtractor, verifyRolePersons], supplierController.updateSupplier);
router.delete('/supplier/:codSupplier', [userExtractor, verifyRolePersons], supplierController.deleteSupplier);

module.exports= router;