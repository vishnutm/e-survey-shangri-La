/**
 * Route to enter Admin routes
 */
const questionController = require('../controllers/question-controller');
const user = require('../controllers/user-controller');
const Auth = require('../middleWare/auth');
const express = require('express')

const router = express.Router()


router.post('/createQuestionOption',Auth.verifyToken,questionController.Create);
router.post('/updateQuestionOption',Auth.verifyToken,questionController.updateQuestion);
router.get('/GetAllQuestions',Auth.verifyToken,questionController.viewQuestions)
router.delete('/removeQuestion',Auth.verifyToken,questionController.removeQuestion)
router.get('/GetQuestionOptions/:id',Auth.verifyToken,questionController.viewSingleQuestions)

module.exports =router