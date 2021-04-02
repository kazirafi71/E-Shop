module.exports.user_authentication = (req, res, next) => {
    if ( req.user.role !== 'User') {
        return res.status(401).json({
            error: "User access denied"
        })

    }
    next()
}


module.exports.admin_authentication = (req, res, next) => {
    if (req.user.role !== 'Admin') {
        return res.status(401).json({
            error: "Admin access denied"
        })

    }
    next()
}