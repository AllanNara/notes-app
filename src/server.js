const path = require('path');
const express = require('express');
const morgan = require('morgan')
const { create } = require('express-handlebars');
const methodOverride = require('method-override')
const indexRoutes = require('./routes/index.routes');
const notesRoutes = require('./routes/notes.routes');


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
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(methodOverride('_method'))

// Global variables


// Routes
app.use(indexRoutes)
app.use(notesRoutes)

// Static files
app.use(express.static(publicPath))


module.exports = app
