// Authentication for users (general and admin)

function auth(req, res, next) {
  console.log('Authenticating...');
  next();
}

module.exports = auth;