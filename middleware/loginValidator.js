const { body, validationResult } = require('express-validator');


module.exports=[
    body('email')
    .notEmpty()
    .withMessage('Please provide your Email')
    .isEmail()
    .withMessage('Invalid email'),
    body('password')
    .notEmpty()
    .withMessage('Please provide your password ')
]


module.exports.login_validator=(req,res,next)=>{
    const errors = validationResult(req).formatWith(errors=>errors.msg)
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.mapped() });
      }
    next()
}