const express = require('express');
const router = express.Router();
const decreaseController = require('../controllers/decreaseController');
const userExtractor = require('../middlewares/userExtractor');

router.get('/decrease', userExtractor, decreaseController.getDecrease);
router.get('/decrease/:codDecrease', userExtractor, decreaseController.getDecreaseS);
router.post('/decrease', userExtractor, decreaseController.addDecrease);
router.put('/decrease/:codDecrease', userExtractor, decreaseController.updateDecrease);
router.delete('/decrease/:codDecrease', userExtractor, decreaseController.deleteDecrease);

module.exports = router;