const express = require('express');
const router = express.Router();
const userExtractor = require('../middlewares/userExtractor');
const graphicsControler = require('../controllers/graphicsController');

router.get('/roles', userExtractor, graphicsControler.getRoles);

module.exports = router;