/**
 * Route to enter Admin routes
 */
const questionController = require('../controllers/question-controller');
const user = require('../controllers/user-controller');
const Auth = require('../middleWare/auth');
const express = require('express')

const router = express.Router()


router.post('/questions',Auth.verifyToken,questionController.Create);
router.post('/updateQuestion',Auth.verifyToken,questionController.updateQuestion);
router.put('/updateQptions',Auth.verifyToken,questionController.updateOpitions);
router.get('/viewQuestions',Auth.verifyToken,questionController.viewQuestions)
router.delete('/removeQuestion',Auth.verifyToken,questionController.removeQuestion)
router.post('/viewSingleQuestions',Auth.verifyToken,questionController.viewSingleQuestions)

module.exports =router