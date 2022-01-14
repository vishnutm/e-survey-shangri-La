const controller = require('../controllers/user-controller');
const express = require('express')

const router = express.Router()


//CRUD 

router.get('/',controller.getAll)




module.exports = router