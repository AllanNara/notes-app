const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const { User } = require('../models');

passport.use(new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
}, async (username, password, done) => {
    
    // Match username's user
    const user = await User.findOne({ username });
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