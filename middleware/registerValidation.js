const { body, validationResult } = require('express-validator');


module.exports=[
    body('firstName')
    .notEmpty()
    .withMessage('Please provide your firstName '),
    body('lastName')
    .notEmpty()
    .withMessage('Please provide your lastName '),
    body('email')
    .notEmpty()
    .withMessage('Please provide your Email')
    .isEmail()
    .withMessage('Invalid email'),
    body('password')
    .notEmpty()
    .withMessage('Please provide your password ')
    .isLength({min:6})
    .withMessage('Password must be greater than 6 charterers')
    ,
    body('confirmPassword')
    .notEmpty()
    .withMessage('Please provide your confirmPassword ')
    .custom((confirmPassword,{ req })=>{
        if(confirmPassword !== req.body.password){
            throw new Error('Password confirmation does not match password');
        }
        return true
    })

]


module.exports.register_validator=(req,res,next)=>{
    const errors = validationResult(req).formatWith(errors=>errors.msg)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.mapped() });
        
      }
      next();
}