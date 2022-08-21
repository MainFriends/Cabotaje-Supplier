const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const userExtractor = require('../middlewares/userExtractor');
const verifyRolePersons = require('../middlewares/verifyRolePersons');

router.get('/user', [userExtractor, verifyRolePersons], userController.getUsers);
router.get('/user/:codUser', [userExtractor, verifyRolePersons], userController.getUser);
router.post('/user', [userExtractor, verifyRolePersons], userController.addUser);
router.put('/user/:codUser', [userExtractor, verifyRolePersons], userController.updateUser);
router.delete('/user/:codUser', [userExtractor, verifyRolePersons], userController.deleteUser);
router.get('/pass-dat-exp', [userExtractor, verifyRolePersons], userController.getDate);
router.get('/find-user', [userExtractor, verifyRolePersons], userController.getFindUser);
router.get('/login-security', userExtractor, userController.loginSecurity);

module.exports = router;