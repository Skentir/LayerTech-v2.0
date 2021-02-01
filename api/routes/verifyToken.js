const jwt = require('jsonwebtoken');
const { secret } = require('../config');

module.exports = function (req, res, next)  {
  const token = req.header('auth-token');
  if (!token) return res.status(401).send('Acces Denied.');

  try {
    const verified = jwt.verify(token, secret);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send('Invalid Token.');
  }
}