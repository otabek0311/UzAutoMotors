const jwt = require("jsonwebtoken");
const CustomErrorHandler = require("../error/custom-error-handler");

module.exports = function (req, res, next) {
  try {
    const authHeader = req.headers?.authorization;
    const access_token = authHeader?.split(" ")[1] || req.cookies?.AccessToken;
    
    if (!access_token) {
      throw CustomErrorHandler.UnAuthorized("Token topilmadi!");
    }

    jwt.verify(access_token, process.env.ACCESS_SECRET_KEY, (err, decoded) => {
      if (err) {
        throw CustomErrorHandler.Forbidden("Yaroqsiz token!");
      }
      req.user = decoded;
      next();
    });
  } catch (error) {
    next(error);
  }
};