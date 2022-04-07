const express = require('express');
const router = express.Router();
const userProfileController = require('../controllers/userProfileController');
const userExtractor = require('../middlewares/userExtractor');

router.get('/user-profile', userExtractor, userProfileController.getUser);
router.put('/user-profile', userExtractor, userProfileController.updateUserInformation);

module.exports = router;