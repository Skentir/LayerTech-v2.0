const express = require('express');
const { envPort, sessionKey, dbURL } = require('./config');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const suppliers_routes = require('./routes/api/suppliers');

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

// Sessions
/*
app.use(session({
  secret: sessionKey,
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false, maxAge: 1000 * 60 * 60 * 24 * 7 }
}));
*/
// Setup middlewares
app.use(express.json()); // support json encoded bodies
app.use(express.urlencoded({ extended: true })); // support encoded bodies
app.use(cors());
app.use(morgan('tiny'));

// serve static files 
app.use(express.static('public')); 
app.use('/api/suppliers', suppliers_routes);
// listen on port
app.listen(port, () => console.log(`Listening to ${port}`));