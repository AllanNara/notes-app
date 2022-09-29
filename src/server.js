const path = require('path');
const express = require('express');
const morgan = require('morgan')
const { create } = require('express-handlebars');

const allRoutes = require('./routes/index.routes');


// Initializations
const app = express();
const viewPath = path.join(__dirname, 'views');
const publicPath = path.join(__dirname, 'public');
const hbs = create({
    layoutsDir: path.join(viewPath, 'layouts'),
    partialsDir: path.join(viewPath, 'partials'),
    extname: '.hbs',
    defaultLayout: 'main',
});

// Settings
app.set('port', process.env.PORT || 3000);
app.set('views', viewPath);
app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');

// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'))

// Global variables


// Routes
app.use(allRoutes)

// Static files
app.use(express.static(publicPath))


module.exports = app
