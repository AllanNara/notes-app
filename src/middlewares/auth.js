const isAuthenticated = (req, res, next) => {
    if(!req.isAuthenticated()) {
        req.flash('error', 'Not Authorized.');
        res.redirect('/users/login');
    };
    next()
}

module.exports = {
    isAuthenticated,
}