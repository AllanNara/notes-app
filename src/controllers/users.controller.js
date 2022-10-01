const User = require('../models/User')
const passport = require('passport');

const renderRegisterForm = (req, res) => {
    res.render('users/register');
};

const registerUser = async (req, res) => {
    const errors = []
    const { name, email, password, confirm_password } = req.body;
    
    if(password !== confirm_password) errors.push({ text: "Password do not match."});
    if(password.length < 8) errors.push({ text: "Password must be at least 8 characters."});

    const emailUser = await User.findOne({ email })
    if(emailUser) errors.push({ text: "The email is alredy in use."});

    if(errors.length > 0) {
        res.render('users/register', {
            errors,
            name,
            email,
            password,
            confirm_password
        });
    } else {
        const newUser = new User({ name, email, password });
        newUser.password = await newUser.encryptPassword(password);
        await newUser.save();
        req.flash('success_msg', 'You are registered successfully');
        res.redirect('/users/login')
    };
};

const renderLogInForm = (req, res) => {
    res.render('users/login');
};

const logIn = passport.authenticate('local', {
    failureRedirect: '/users/login',
    successRedirect: '/notes',
    failureFlash: true,    
});

const logOut = (req, res) => {
    req.logout(err => {
        if(err) throw new Error(err)
        req.flash('success_msg', "You are logged out now.")
        res.redirect('/')
    });

};

module.exports = {
    renderRegisterForm,
    registerUser,
    renderLogInForm,
    logIn,
    logOut,
}