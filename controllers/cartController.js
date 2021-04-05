const Cart = require('../models/CartModel')

module.exports.add_to_cart_controller = (req, res, next) => {
    const {
        productId,
        quantity
    } = req.body

    console.log(productId, quantity)

    Cart.findOne({
            userInfo: req.user._id
        })
        .then(result => {
            if (result) {
                Cart.findOne({
                        userInfo: req.user._id,
                        "cartItem.product": productId
                    })
                    .then(update__result => {
                        if (!update__result) {
                            Cart.findOneAndUpdate({
                                    userInfo: req.user._id
                                }, {
                                    $push: {
                                        cartItem: {
                                            product: productId,
                                            quantity

                                        }

                                    }
                                }, {
                                    new: true
                                })
                                .then(cart__result => {
                                    return res.status(201).json({
                                        cart__result
                                    })
                                    console.log(cart__result)
                                })
                                .catch(err => console.log(err))
                        } else {

                            console.log(update__result)
                            let item = update__result.cartItem.filter(c => {
                                return c.product == productId
                            })

                            console.log(item[0].quantity)
                            const y = 3

                            Cart.findOneAndUpdate({
                                    userInfo: req.user._id,

                                    "cartItem.product": productId
                                }, {
                                    $set: {
                                        "cartItem.$.quantity": quantity + item[0].quantity

                                    }
                                }, {
                                    new: true
                                })
                                .then(cart__result__2 => {

                                    return res.status(201).json({
                                        cart__result__2
                                    })
                                })
                                .catch(err => console.log(err))
                        }



                    })
                    .catch(err => {
                        console.log(err)
                    })
            } else if (!result) {

                const cart = new Cart({
                    cartItem: {
                        product: productId,
                        quantity
                    },
                    userInfo: req.user._id,
                })

                cart.save()
                    .then(result => {
                        return res.status(201).json({
                            new__cart: result
                        })
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }
        })
        .catch(err => {
            console.log(err)
        })

}


module.exports.get_cart_controller = (req, res, next) => {
    Cart.find({
            userInfo: req.user._id
        })
        .populate("cartItem.product")
        .then(result => {
            return res.status(201).json({
                result
            })
        })
        .catch(err => {
            console.log(err)
            return res.status(401).json({
                error: "Internal server error"
            })

        })
}


module.exports.remove_cart_controller = async (req, res, next) => {
    try {

        const {
            productId
        } = req.params
        console.log(productId)

        Cart.update({}, {
                $pull: {
                    "cartItem": {
                        _id: productId
                    }
                }
            },{
                multi: true
            } )
            .then(info => {
                console.log(info)
                return res.status(201).json({
                    info
                })


                

            })
            .catch(err => {
                console.log(err)
            })






    } catch (err) {
        console.log(err)
        return res.status(401).json({
            error: "Internal server error"
        })
    }
}