const express = require('express');
const router = express.Router();
const rolesAndPermissionsController = require('../controllers/rolesAndPermissionsController');
const userExtractor = require('../middlewares/userExtractor');

router.get('/roles', userExtractor, rolesAndPermissionsController.getRoles);
router.post('/roles', userExtractor, rolesAndPermissionsController.addRole);

module.exports = router;