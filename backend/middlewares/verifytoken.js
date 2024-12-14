
const jwt = require('jsonwebtoken'); // Use jwt to decode the token

// Middleware to verify JWT and get userId from token
const verifyToken = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', ''); // Get token from Authorization header

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, 'your_secret_key'); // Verify token with your secret key
    req.user = decoded.user; // Attach the user info to the request object
    next(); // Pass control to the next middleware or route handler
  } catch (error) {
    return res.status(400).json({ message: 'Invalid token.' });
  }
};

module.exports = verifyToken;
