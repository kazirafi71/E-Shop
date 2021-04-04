const Product = require('../models/ProductModel')
const cloudinary = require('../middleware/cloudinary')
module.exports.add_product_controller = async (req, res, next) => {

    try {
        let {
            product_name,
            price,
            quantity,
            description,
            product_category
        } = req.body

        if (!product_name ||
            !price ||
            !quantity ||
            !description || !product_category) {
            return res.status(401).json({
                error: "Please provide all info"
            })
        }
        const product__info = {
            product_name,
            price,
            quantity,
            description,
            product_category
        }
        const pro = await cloudinary.uploader.upload(req.file.path)

        console.log(pro)

        let product = new Product({

            product_img: pro.secure_url,
            product_name,
            price,
            quantity,
            description,
            product_category

        })
        product.save()
            .then(result => {
                return res.status(201).json({
                    result
                })
            })
            .catch(err => {
                console.log(err)
                return res.status(401).json({
                    error: "Server error",
                    err
                })
            })

    } catch (err) {
        console.log(err)
        return res.status(401).json({
            error: "Server error",
            err
        })
    }



    // console.log(product_name,
    //     price,
    //     quantity,
    //     description,
    //     product_category)






    // if (req.file || req.files) {
    //     const url = req.protocol + '://' + req.get('host')
    //     product__info.product_img = url + '/uploads/' + req.file.filename
    // }





    // let pic = []
    // for (let i = 0; i < req.files.length; i++) {
    //     pic.push(req.files[i].filename)
    //     console.log(req.files[i].filename)
    // }
    // console.log(pic)

    // if (req.file || req.files) {
    //     product__info.product_img = req.file.filename
    // }
    //console.log(req.file.filename)





}

module.exports.get_product_controller = (req, res, next) => {
    Product.find()
        .then(result => {
            return res.status(201).json({
                result
            })
        })
        .catch(err => {
            console.log(err)
            return res.status(404).json({
                error: 'Internal Server Error'
            })
        })
}

module.exports.delete_product_controller = (req, res, next) => {
    const {
        postId
    } = req.params


    Product.findOneAndDelete({
            _id: postId
        })
        .then(result => {
            return res.status(201).json({
                text: 'Product deleted',
                result
            })
        })
        .catch(err => {
            console.log(err)
            return res.status(404).json({
                error: 'Internal Server Error'
            })
        })
}


module.exports.update_product_controller = (req, res, next) => {
    const {
        postId
    } = req.params
    console.log(postId)
    let {
        product_name,
        price,
        quantity,
        description,
        product_category
    } = req.body

    // const product__info = {
    //     product_name,
    //     price,
    //     quantity,
    //     description,
    //     product_category
    // }

    console.log(product_name)

    if (req.file || req.files) {
        const url = req.protocol + '://' + req.get('host')
        product_img = url + '/uploads/' + req.file.filename
    }

    //console.log(product_img)
    //console.log(req.file)

    Product.findOneAndUpdate({
            _id: postId
        }, {
            $set: {
                product_name,
                price,
                quantity,
                description,
                product_category,
                product_img

            }
        }, {
            new: true
        })
        .then(result => {
            return res.status(201).json({
                text: 'Product Updated',
                result
            })
        })
        .catch(err => {
            console.log(err)
            return res.status(404).json({
                error: 'Internal Server Error'
            })
        })


}


module.exports.getone_product_controller = (req, res, next) => {
    const {
        postId
    } = req.params

    //console.log(postId)


    Product.findById({
            _id: postId
        })
        .then(result => {
            console.log(result)
            return res.status(201).json({
                result
            })
        })
        .catch(err => {
            console.log(err)
            return res.status(404).json({
                error: 'Internal Server Error'
            })
        })
}