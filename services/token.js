const jwt = require("jsonwebtoken");
const config = require("config");

const jwtSecret = process.env.JWT_SECRET;
const jwtTimeoutMs = config.get("jwtTimeoutMs");

const user = (token) => {
  const { user } = jwt.verify(token, jwtSecret);
  return user;
};

const create = async (userId) => {
  const payload = { user: { id: userId } };
  const token = await new Promise((res, rej) =>
    jwt.sign(
      payload,
      jwtSecret,
      { expiresIn: jwtTimeoutMs },
      (error, token) => {
        if (error) {
          rej(error);
        }
        res(token);
      }
    )
  );
  return token;
};

const get = (req) => req.header("x-auth-token");

module.exports = {
  user,
  create,
  get,
};
