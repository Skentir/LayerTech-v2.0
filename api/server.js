const express = require('express');
const { envPort, dbURL } = require('./config');
const mongoose = require('mongoose');

// create express app
const app = express();
const port = envPort || 3000;

// setup mongoose
const options = { 
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false 
};

mongoose.connect(dbURL, options);

// Setup middlewares
app.use(express.json()); // support json encoded bodies
app.use(express.urlencoded({ extended: true })); // support encoded bodies
app.use(cors()); // allow access to API from difference sources

// serve static files 
app.use(express.static('public'));

app.get('/login', (req, res) => {
  console.log("API: /login");
})

// listen on port
app.listen(port, () => console.log(`Listening to ${port}`));