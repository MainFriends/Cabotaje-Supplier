const express = require('express');
const router = express.Router();
const userExtractor = require('../middlewares/userExtractor');
const userSession = require('../controllers/userSessionController');

router.get('/jwt', userExtractor, userSession);

module.exports = router;