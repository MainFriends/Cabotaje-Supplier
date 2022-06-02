const express = require('express');
const router = express.Router();
const bitacoraController = require('../controllers/bitacoraController');
const userExtractor = require('../middlewares/userExtractor');
const verifyRoleProduction = require('../middlewares/verifyRoleProduction');

router.get('/bitacora', [userExtractor, verifyRoleProduction], bitacoraController.getBitacora);

module.exports = router;