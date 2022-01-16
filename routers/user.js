const controller = require('../controllers/user-controller');
const express = require('express')

const router = express.Router()


//CRUD 
console.log('CRUD')
router.post('/register',controller.create);
router.post('/login',controller.login)

router.get('/',controller.getAll)



module.exports = router


