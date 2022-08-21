const express = require('express');
const router = express.Router();
const securityQuestionsController = require('../controllers/securityQuestionsController');
const userExtractor = require('../middlewares/userExtractor');

router.get('/security-questions', userExtractor, securityQuestionsController.getQuestions);
router.post('/security-answers', userExtractor, securityQuestionsController.addAnswer);
router.get('/security-user-questions', userExtractor, securityQuestionsController.getUserQuestions);
router.post('/security-compare-questions', userExtractor, securityQuestionsController.compareQuestions);

module.exports= router;