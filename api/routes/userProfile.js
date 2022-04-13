const express = require('express');
const router = express.Router();
const userProfileController = require('../controllers/userProfileController');
const userExtractor = require('../middlewares/userExtractor');
const fileUpload = require('../middlewares/profilePicture');
const comparePassword = require('../middlewares/comparePassword');

router.get('/user-profile', userExtractor, userProfileController.getUser);
router.put('/user-profile', userExtractor, userProfileController.updateUserInformation);
router.put('/profile-picture', [userExtractor, fileUpload], userProfileController.updProfilePicture);
router.get('/profile-picture', userExtractor, userProfileController.getProfilePic);
router.put('/change-password', [userExtractor, comparePassword], userProfileController.changePassword);

module.exports = router;