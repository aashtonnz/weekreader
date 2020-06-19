const tokenService = require("../services/token");
const { errorMsg } = require("../utils");

module.exports = (req, res, next) => {
  const token = tokenService.get(req);
  if (!token) {
    return res.status(401).json(errorMsg("No token, authorization denied"));
  }
  try {
    req.user = tokenService.user(token);
    next();
  } catch (error) {
    res.status(401).json(errorMsg("Token is not valid"));
  }
};
