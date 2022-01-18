const usercontroller = require('../controllers/user-controller');
const questionController = require('../controllers/question-controller');
const answerController = require('../controllers/answer-controller');
const express = require('express')

const router = express.Router()


//CRUD 
console.log('CRUD')
router.post('/register',usercontroller.create);
router.post('/login',usercontroller.login)
router.post('/sni',usercontroller.gernerateSni)

router.get('/',usercontroller.getAll)
router.post('/user/logout', usercontroller.logout);
router.post('/viewSNI',usercontroller.singleSNI);
router.post('/addAnswers',answerController.createAnswers)
router.post('/getCount',answerController.getAnswers)
module.exports = router

