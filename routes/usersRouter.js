var express = require('express');
var router = express.Router();
const userController = require('../controller/usersController')

/* GET users listing. */
router.post('/register', userController.register);

router.post('/login',userController.login);

router.get('/',userController.getUsers);

module.exports = router;
