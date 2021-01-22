const express = require('express');
const { envPort, mongoURI } = require('./config');
const mongoose = require('mongoose');
const users = require('./routes/users');

// create express app
const app = express();
const port = envPort || 3000;

// setup mongoose
const options = { 
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false 
};

// Setup middlewares
app.use(express.json()); // support json encoded bodies
app.use(express.urlencoded({ extended: true })); // support encoded bodies
app.use(cors()); // allow access to API from difference sources

// serve static files 
app.use(express.static('public'));

mongoose.connect(mongoURI, options)
.then(() => {
    console.log(`Database connected successfully ${mongoURI}`)
}).catch(err => {
    console.log(`Unable to connect with the database ${err}`)
});;

// temporary 
app.get('/users', users);

// listen on port
app.listen(port, () => console.log(`Listening to ${port}`));