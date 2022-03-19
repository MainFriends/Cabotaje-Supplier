const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const userExtractor = require('../middlewares/userExtractor');

router.get('/user', userExtractor, userController.getUsers);
router.get('/user/:codUser', userExtractor, userController.getUser);
router.post('/user', userExtractor, userController.addUser);
router.put('/user/:codUser', userExtractor, userController.updateUser);
router.delete('/user/:codUser', userExtractor, userController.deleteUser);

module.exports = router;