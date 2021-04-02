const {
    registerController,
    loginController,
    getUserController
} = require('../controllers/authController')
const loginValidator = require('../middleware/loginValidator')
const registerValidation = require('../middleware/registerValidation')
const requireLogin = require('../middleware/requireLogin')
const {
    login_validator
} = require('../middleware/loginValidator')
const {
    register_validator
} = require('../middleware/registerValidation')
const { admin_authentication } = require('../middleware/authentication')

const router = require('express').Router()




router.post('/register', registerValidation, register_validator, registerController)


router.post('/login', loginValidator, login_validator, loginController)

router.get('/user',requireLogin, admin_authentication , getUserController)

router.get('/hello', requireLogin, (req, res) => {

    res.send('hello')
})


module.exports = router