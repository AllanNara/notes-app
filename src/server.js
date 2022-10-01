const path = require('path');
const express = require('express');
const morgan = require('morgan')
const session = require('express-session');
const passport = require('passport');
const methodOverride = require('method-override')
const { create } = require('express-handlebars');
const flash = require("connect-flash");

const indexRoutes = require('./routes/index.routes');
const notesRoutes = require('./routes/notes.routes');
const usersRoutes = require('./routes/users.routes');


// Initializations
const app = express();
require('./config/passport')

// Config variables
const viewPath = path.join(__dirname, 'views');
const publicPath = path.join(__dirname, 'public');
const hbs = create({
    layoutsDir: path.join(viewPath, 'layouts'),
    partialsDir: path.join(viewPath, 'partials'),
    extname: '.hbs',
    defaultLayout: 'main',
});
const sessionOption = {
    secret: process.env.SESSION_SECRET || 'mysecret',
    resave: true,
    saveUninitialized: true,
};

// Settings
app.set('port', process.env.PORT || 3000);
app.set('views', viewPath);
app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');

// Middlewares
app.use(morgan('dev'));
app.use(methodOverride('_method'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session(sessionOption));
app.use(passport.initialize())
app.use(passport.session())
app.use(flash());

// Global variables
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error = req.flash('error');
    res.locals.isAuthenticated = req.isAuthenticated();
    next();
})

// Routes
app.use(indexRoutes)
app.use(notesRoutes)
app.use(usersRoutes)

// Static files
app.use(express.static(publicPath))


module.exports = app
