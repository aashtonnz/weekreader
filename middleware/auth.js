const tokenService = require("../services/token");
const { errorMsg } = require("../utils");

module.exports = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) {
    return res.status(401).json(errorMsg("No token, authorization denied"));
  }
  try {
    const userId = tokenService.decode(token);
    req.user = { id: userId };
    next();
  } catch (error) {
    res.status(401).json(errorMsg("Invalid token"));
  }
};
