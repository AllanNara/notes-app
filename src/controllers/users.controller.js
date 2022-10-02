const { User } = require('../models')
const passport = require('passport');

const renderRegisterForm = (req, res) => {
    res.render('users/register');
};

const registerUser = async (req, res) => {
    const { username, confirm_username, password, confirm_password } = req.body;
    const errors = []
    
    if(password !== confirm_password) errors.push({ text: "Password do not match."});
    if(username !== confirm_username) errors.push({ text: "Username do not match."});
    if(password.length < 8) errors.push({ text: "Password must be at least 8 characters."});

    const userFind = await User.findOne({ username })
    if(userFind) errors.push({ text: "The username is alredy in use."});

    if(errors.length > 0) {
        res.render('users/register', {
            errors,
            username,
            password,
            confirm_username,
            confirm_password
        });
    } else {
        const newUser = new User({ username, password });
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