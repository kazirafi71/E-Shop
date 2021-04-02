const { addCategoryController, getCategoryController } = require('../controllers/categoryController')
const requireLogin = require('../middleware/requireLogin')

const router = require('express').Router()

router.post('/add-category',requireLogin,addCategoryController)

router.get('/get-category',requireLogin,getCategoryController)


module.exports=router