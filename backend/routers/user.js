/**
 * Routes to enter User routes
 */
const usercontroller = require('../controllers/user-controller');
const questionController = require('../controllers/question-controller');
const answerController = require('../controllers/answer-controller');

const express = require('express');
const Auth = require('../middleWare/auth');

const router = express.Router()


//CRUD 
console.log('CRUD')
router.post('/register',usercontroller.create);

router.post('/addSni',usercontroller.gernerateSni)

router.get('/',usercontroller.getAll)
router.post('/logout', Auth.verifyToken,usercontroller.logout);
router.post('/addAnswers', Auth.verifyToken,answerController.createAnswers)
router.post('/getQuestionResponse', Auth.verifyToken,answerController.getAnswers)
router.post('/login',usercontroller.loginUser)
router.post('/uniqueSNI',usercontroller.singleSNI)
router.post('/uniqueEmail',usercontroller.singleEmail)
router.post('/getQuestionOption',Auth.verifyToken,questionController.viewUserQuestions)
module.exports = router


