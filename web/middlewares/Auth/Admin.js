import appConfig from '../../config/app.js';

const basicAuthMiddleware = (req, res, next) => {
  console.log('[Admin] Request recieved.');
  const validUsername = appConfig.auth.username;
  const validPassword = appConfig.auth.password;
  // Extract the Authorization header from the request
  const authHeader = req.headers.authorization;
  console.log('[Admin] Auth:', authHeader);

  if (authHeader) {
    // Parse the username and password from the Authorization header
    const [username, password,] = Buffer.from(authHeader.split(' ')[1], 'base64')
      .toString()
      .split(':');

    // Check if the username and password match the valid credentials
    // console.log({ username, password, validUsername, validPassword, });
    if (username === validUsername && password === validPassword) {
      // Authorized
      console.log('[Admin] Authorized.');
      next(); // Call the next middleware or route handler
    } else {
      // Unauthorized
      res.statusCode = 401;
      res.setHeader('WWW-Authenticate', 'Basic realm="Authorization Required"');
      console.log('[Admin] Unauthorized. (602)');
      res.end('Unauthorized');
    }
  } else {
    // No Authorization header found
    res.statusCode = 401;
    res.setHeader('WWW-Authenticate', 'Basic realm="Authorization Required"');
    console.log('[Admin] Unauthorized. (601)');
    res.end('Unauthorized');
  }
};

export default basicAuthMiddleware;
