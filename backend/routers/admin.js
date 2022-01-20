const questionController = require('../controllers/question-controller');
const user = require('../controllers/user-controller')
const express = require('express')

const router = express.Router()


router.post('/questions',questionController.Create);
router.post('/updateQuestion',questionController.updateQuestion);
router.get('/viewQuestions',questionController.viewQuestions)
router.delete('/removeQuestion',questionController.removeQuestion)
router.post('/viewSingleQuestions',questionController.viewSingleQuestions)
router.post('/adminLogin',user.loginAdmin)
router.post('/adminRegister', user.createAdmin)
module.exports =router