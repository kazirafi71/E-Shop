const { add_to_cart_controller,get_cart_controller,remove_cart_controller } = require('../controllers/cartController')
const requireLogin =require('../middleware/requireLogin')
const router=require('express').Router()



router.post('/add-to-cart',requireLogin,add_to_cart_controller)


router.get('/view-cart',requireLogin,get_cart_controller)

router.put('/view-cart/:productId',requireLogin,remove_cart_controller)





module.exports=router