const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const { User } = require('../models');

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done) => {
    
    // Match email's user
    const user = await User.findOne({ email });
    if(!user) return done(null, false, { message: 'Not User Found.' });

    // Match password's user
    const match = await user.machPassword(password);
    if(!match) return done(null, false, { message: 'Incorrect Password.' });

    // Return CallBack
    return done(null, user);
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(user => done(null, user))
        .catch(err => done(err));
});