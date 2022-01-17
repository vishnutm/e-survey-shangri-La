const usercontroller = require('../controllers/user-controller');
const questionController = require('../controllers/question-controller')
const express = require('express')

const router = express.Router()


//CRUD 
console.log('CRUD')
router.post('/register',usercontroller.create);
router.post('/login',usercontroller.login)
router.post('/sni',usercontroller.gernerateSni)

router.get('/',usercontroller.getAll)
router.post('/user/logout', usercontroller.logout);


module.exports = router


