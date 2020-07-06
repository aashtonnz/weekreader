const jwt = require("jsonwebtoken");
const config = require("config");

const jwtSecret = process.env.JWT_SECRET;
const userTimeoutHours = config.get("userTimeoutHours");
const passwordResetTimeoutMins = config.get("passwordResetTimeoutMins");

const decode = (token) => {
  return jwt.verify(token, jwtSecret);
};

const user = (token) => {
  const { user } = jwt.verify(token, jwtSecret);
  return user;
};

const createUserToken = async (userId) => {
  const payload = { user: { id: userId } };
  const token = await new Promise((res, rej) =>
    jwt.sign(
      payload,
      jwtSecret,
      { expiresIn: userTimeoutHours * 3600 },
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

const createPasswordResetToken = async (email) => {
  const payload = { email };
  const token = await new Promise((res, rej) =>
    jwt.sign(
      payload,
      jwtSecret,
      { expiresIn: passwordResetTimeoutMins * 60 },
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

const getUserToken = (req) => req.header("x-auth-token");

module.exports = {
  user,
  decode,
  createUserToken,
  createPasswordResetToken,
  getUserToken,
};
