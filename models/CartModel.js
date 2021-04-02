const mongoose = require('mongoose')

const cartSchema = mongoose.Schema({
    cartItem:[ 
        {
            product:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
        },
        quantity:{
            type: Number,
            require: true
        }
    }
    ]
    
,

userInfo:{
    type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
},

    
}, {
    timestamps: true
})

const CartModel = mongoose.model('Cart', cartSchema)

module.exports = CartModel