const controller = require('../controllers/user-controller');
const express = require('express')

const router = express.Router()


//CRUD 
console.log('CRUD')
router.post('/register',controller.create);
router.post('/login',controller.login)
router.post('/sni',controller.gernerateSni)
router.get('/',controller.getAll)
router.post('/user/logout', controller.logout);


module.exports = router


