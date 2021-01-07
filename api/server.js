const express = require('express');
const { envPort, sessionKey } = require('./config');

// create express app
const app = express();
const port = envPort || 3000;

// Setup middlewares
app.use(express.json()); // support json encoded bodies
app.use(express.urlencoded({ extended: true })); // support encoded bodies

// serve static files 
app.use(express.static('public')); 

// listen on port
app.listen(port, () => console.log(`Listening to ${port}`));