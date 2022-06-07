const express = require('express');
const router = express.Router();
const rolesAndPermissionsController = require('../controllers/rolesAndPermissionsController');
const userExtractor = require('../middlewares/userExtractor');

router.get('/roles', userExtractor, rolesAndPermissionsController.getRoles);
router.post('/roles', userExtractor, rolesAndPermissionsController.addRole);
router.delete('/roles/:codRole', userExtractor, rolesAndPermissionsController.delRole);
router.get('/permissions/:codRole', userExtractor, rolesAndPermissionsController.getPermissions);
router.get('/user-permissions', userExtractor, rolesAndPermissionsController.getUserPermissions);
router.post('/permissions/:codRole', userExtractor, rolesAndPermissionsController.addPermissions);
router.delete('/permissions/:codPermission', userExtractor, rolesAndPermissionsController.delPermissions);
router.get('/modules', userExtractor, rolesAndPermissionsController.getModules);
router.get('/tables/:codModule', userExtractor, rolesAndPermissionsController.getTables);

module.exports = router;