// Authentication for users (general and admin)
const auth = (req, res, next) => {
  console.log('Authenticating...');
  next();
}

export default auth;