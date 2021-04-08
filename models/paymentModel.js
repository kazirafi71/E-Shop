const mongoose =require('mongoose')

const paymentSchema= mongoose.Schema({
    price: {
        type: Number
    },
    product_info:[
       
    ],
    email:{
        type: String
    },
    date:{
        type: Date,
        default: Date.now
    }

    
},{
    timestamps: true
})

const Payment=mongoose.model('payment',paymentSchema)

module.exports=Payment