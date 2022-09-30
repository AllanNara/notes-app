const path = require('path');
const express = require('express');
const morgan = require('morgan')
const { create } = require('express-handlebars');
const methodOverride = require('method-override')
const flash = require("connect-flash");
const session = require('express-session');

const indexRoutes = require('./routes/index.routes');
const notesRoutes = require('./routes/notes.routes');


// Initializations
const app = express();

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
    secret: process.env.SESSION_SECRET || 'secret',
    resave: true,
    saveUninitialized: true,
};

// Settings
app.set('port', process.env.PORT || 3000);
app.set('views', viewPath);
app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(methodOverride('_method'))
app.use(session(sessionOption))
app.use(flash())

// Global variables
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    next()
})

// Routes
app.use(indexRoutes)
app.use(notesRoutes)

// Static files
app.use(express.static(publicPath))


module.exports = app
