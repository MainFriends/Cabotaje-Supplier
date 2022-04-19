const express = require('express');
const router = express.Router();
const parametricTablesController = require('../controllers/parametricTablesController');
const userExtractor = require('../middlewares/userExtractor');

router.get('/list-categories', userExtractor, parametricTablesController.getCategories);


module.exports = router;