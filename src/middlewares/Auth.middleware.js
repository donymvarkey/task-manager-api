import jwt from 'jsonwebtoken';
import appConfig from '../config/index.js';
import httpResponse from '../utils/httpResponse.js';

export function allowCrossDomain(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, x-auth-token, X-Requested-With, Content-Type',
  );

  // intercept OPTIONS method
  if ('OPTIONS' === req.method) {
    //res.sendStatus(200);
    next();
  } else {
    next();
  }
}
export function isAuthorized(req, res, next) {
  const verificationHeader = req.headers['authorization'];
  const accessToken = verificationHeader?.split(' ')[1];

  // Check if the Authorization header is missing or empty
  if (!verificationHeader) {
    return httpResponse(req, res, 401, 'Unauthorized User', null);
  }

  // Verify the JWT token
  jwt.verify(accessToken, appConfig.secret, (err, decoded) => {
    if (err) {
      return httpResponse(req, res, 401, 'Invalid or expired token', null);
    }

    // Attach the decoded user information to the request object
    req.user = decoded;

    // Proceed to the next middleware
    next();
  });
}
export function isAdmin(req, res, next) {
  const verificationHeader = req.headers['x-auth-token'];

  try {
    const verify = jwt.verify(verificationHeader, process.env.ATK_SECRET);
    if (verify.role !== 'admin') {
      return res.status(401).json({
        status: false,
        msg: 'Access denied!',
      });
    }

    next();
  } catch (e) {
    next(e);
  }
}
