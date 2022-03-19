const express = require('express');
const router = express.Router();
const notificationsController = require('../controllers/notificationsController');
const userExtractor = require('../middlewares/userExtractor');

router.get('/notifications', userExtractor, notificationsController.getNotifications);
router.get('/notifications/:codNotification', userExtractor, notificationsController.getNotification);
router.post('/notifications', userExtractor, notificationsController.addNotification);

module.exports = router;