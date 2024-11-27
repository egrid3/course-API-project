// Authentication for users (general and admin)
export const auth = (req, res, next) => {
  console.log('Authenticating...');
  next();
}

export default auth;