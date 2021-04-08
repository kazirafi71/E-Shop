const { checkOutController,viewOrderController } = require('../controllers/paymentController')
const requireLogin =require('../middleware/requireLogin')

const router=require('express').Router()




router.post('/checkout',checkOutController)

router.get('/view-order',requireLogin,viewOrderController)




module.exports=router