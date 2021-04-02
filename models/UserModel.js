const mongoose=require('mongoose')


const userSchema=mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        
    },
    lastName: {
        type: String,
        required: true,
        
    },
    userName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        
    },
    password: {
        type: String,
        required: true,
        
    },
    role:{
        type: String,
        enum:["User","Admin"],
        default: "User"

    },
    profilePic: {type: String},
    phoneNumber: {type: Number}
    
},{ timestamps: true })

const User=mongoose.model('User', userSchema)
module.exports=User