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
//router.post('/login',usercontroller.login)
router.post('/sni',usercontroller.gernerateSni)

router.get('/',usercontroller.getAll)
router.post('/logout', Auth.verifyToken,usercontroller.logout);
router.post('/viewSNI',usercontroller.singleSNI);
router.post('/addAnswers', answerController.createAnswers)
router.post('/getCount', answerController.getAnswers)
router.post('/loginUser',usercontroller.loginUser)
router.post('/singleSNI',usercontroller.singleSNI)
router.post('/getEmail',usercontroller.singleEmail)
router.post('/questions',Auth.verifyToken,questionController.viewUserQuestions)
module.exports = router


