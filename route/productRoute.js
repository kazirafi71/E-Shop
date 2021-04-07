const {
    add_product_controller,
    get_product_controller,
    delete_product_controller,
    update_product_controller,
    getone_product_controller,
    search__controller
} = require('../controllers/productController')
const {
    admin_authentication
} = require('../middleware/authentication')
const requireLogin = require('../middleware/requireLogin')
const router = require('express').Router()
const upload = require('../middleware/multer')


router.post('/add-product', requireLogin, admin_authentication, upload.single('img'), add_product_controller)

router.get('/get-product', get_product_controller)

router.delete('/delete-product/:postId', requireLogin, admin_authentication, delete_product_controller)

router.put('/update-product/:postId', requireLogin, admin_authentication, upload.single('img'), update_product_controller)


router.post('/search-product', search__controller)


module.exports = router