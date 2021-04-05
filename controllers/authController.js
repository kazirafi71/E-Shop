const User = require('../models/UserModel')
var bcrypt = require('bcryptjs');
const {
    SECRET_KEY
} = require('../config/keys')
var jwt = require('jsonwebtoken');

module.exports.
registerController = async (req, res, next) => {
    let {
        firstName,
        lastName,
        email,
        password,

    } = req.body

    try {

        let user = await User.findOne({
            email
        })
        if (user) {
            return res.status(401).json({
                errors: {exist_user:"User already exists"}
            })
        }

        let hash = await bcrypt.hash(password, 10)

        let userInfo = new User({
            firstName,
            lastName,
            userName: Math.random(),
            email,
            password: hash
        })

        userInfo.save()
            .then(result => {
                return res.status(201).json({
                    user: result,
                    text: "User created Successfully"
                })
            })
            .catch(err => {
                console.log(err)
            })


    } catch (error) {
        console.log(error)
        return res.status(401).json({
            errors: {
                password: "Server error"
            }
        })
    }

}

module.exports.loginController = async (req, res, next) => {

    let {
        email,
        password
    } = req.body

    try {

        let user = await User.findOne({
            email
        })

        if (!user) {
            return res.status(401).json({
                errors: {exist_user:"User not exists"}
            })
        }

        bcrypt.compare(password, user.password, function (err, result) {
            if (!result) {
                return res.status(401).json({
                    errors: {
                        password: "Password not matched"
                    }
                })
            }

            var token = jwt.sign({
                _id: user._id
            }, SECRET_KEY);
            let {
                _id,
                email,
                role,
                firstName,
                lastName,
            } = user
            return res.status(201).json({
                user: {
                    _id,
                    email,
                    role,
                    firstName,
                    lastName,
                },
                token,
                text: "Login Successfully"
            })
        })

    } catch (error) {
        console.log(error)
        return res.status(401).json({
            error: {
                password: "Server error"
            }
        })
        next(error)
    }
}

module.exports.getUserController=(req,res,next)=>{

    User.find()
    .select('_id firstName lastName email userName role')
    .then(result=>{
        return res.status(201).json({
            users: result
        })

    })
    .catch(err=>{
        console.log(err)
        return res.status(401).json({
            error: 'Internal Server Error'
        })
    })

}

module.exports.getOneUserController=async (req,res,next)=>{
    try {
        const {userId}=req.params

        const user=await User.findOne({_id: userId})

        return res.status(201).json({
             user
        })
        
    } catch (err) {
        console.log(err)
        return res.status(401).json({
            error: 'Internal Server Error'
        })
    }
}


module.exports.deleteOneUserController=async (req,res,next)=>{
    try {
        const {userId}=req.params

        const user=await User.findOneAndDelete({_id: userId})

        return res.status(201).json({
             user
        })
        
    } catch (err) {
        console.log(err)
        return res.status(401).json({
            error: 'Internal Server Error'
        })
    }
}


module.exports.updateOneUserController=async (req,res,next)=>{
    try {
        const {userId}=req.params
        let {
            firstName,
            lastName,
            email,
            role,
    
        } = req.body

        const user=await User.findOneAndUpdate({_id: userId},{
            $set:{
            firstName,
            lastName,
            email,
            role: role || 'User',

            }
        },{
            new: true
        })

        return res.status(201).json({
             user
        })
        
    } catch (err) {
        console.log(err)
        return res.status(401).json({
            error: 'Internal Server Error'
        })
    }
}