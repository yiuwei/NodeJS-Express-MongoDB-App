/**
 * Express application
 */

// Import express module and routes
const express = require('express');
const path = require('path');
const restapi = require('./routes/api/restfulApi');
const index = require('./routes/index');
const route = require('./routes/route');
const mongoose = require('mongoose'); 
const bodyparse = require('body-parser');
const cookieparse = require('cookie-parser');
const session = require('express-session'); 
const app = express();
require('dotenv').config();

// Connect Express project to MongoDB
mongoose.Promise = global.Promise;
mongoose.connect(`mongodb+srv://[username:password@]host[/[defaultauthdb][?options]]`)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.log(`${err}, please try again`);
  })

// Middleware to parse cookies and initatize sessions
app.use(cookieparse('express-project'));
app.use(session({
    secret: "express-project", 
    resave: "true",
    saveUninitialized: "true"
  }));
app.use(bodyparse.urlencoded({extended: true}));
app.use(bodyparse.json());

// Create a view engine with pug template
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use('/static', express.static(path.join(__dirname, 'public')));

// Use path defined by router
app.use('/', index);
app.use('/profile', route);
app.use('/api/profile', restapi);

// Catch incoming error
app.use((req, res, next) => {
  res.send('Please try again');
});

module.exports = app;