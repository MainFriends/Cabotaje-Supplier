const express = require('express');
const router = express.Router();
const userProfileController = require('../controllers/userProfileController');
const userExtractor = require('../middlewares/userExtractor');
const fileUpload = require('../middlewares/profilePicture');

router.get('/user-profile', userExtractor, userProfileController.getUser);
router.put('/user-profile', userExtractor, userProfileController.updateUserInformation);
router.put('/profile-picture', [userExtractor, fileUpload], userProfileController.updProfilePicture);
router.get('/profile-picture', userExtractor, userProfileController.getProfilePic);

module.exports = router;