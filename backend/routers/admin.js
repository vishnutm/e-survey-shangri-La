const questionController = require('../controllers/question-controller')
const express = require('express')

const router = express.Router()


router.post('/questions',questionController.Create);
router.post('/updateQuestion',questionController.updateQuestion);
router.get('/viewQuestions',questionController.viewQuestions)
router.delete('/removeQuestion',questionController.removeQuestion)
router.post('/viewSingleQuestions',questionController.viewSingleQuestions)
module.exports =router