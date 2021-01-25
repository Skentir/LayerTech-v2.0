const express = require('express');
const { envPort, mongoURI } = require('./config');
const mongoose = require('mongoose');
const cors = require('cors') // will allow us to make ajax requests from frontend to backend
const morgan = require('morgan') //http requests automatic logger
const users = require('./routes/users');
const chickenRoutes = require('./routes/chickens')

// create express app
const app = express();
const port = envPort || 3000;

// setup mongoose
const options = { 
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false 
};

// Setup middlewares
app.use(express.json()); // support json encoded bodies
app.use(express.urlencoded({ extended: true })); // support encoded bodies
app.use(cors()); // allow access to API from difference sources
app.use(morgan('tiny')) // logs HTTP requests

// serve static files 
app.use(express.static('public'));

mongoose.connect(mongoURI, options)
.then(() => {
    console.log(`Database connected successfully ${mongoURI}`)
}).catch(err => {
    console.log(`Unable to connect with the database ${err}`)
});;

// temporary 
app.use('/users', users);

// add routes
app.use('/api/chickens', chickenRoutes)


// listen on port
app.listen(port, () => console.log(`Listening to ${port}`));