const jwt = require("jsonwebtoken");

const jwtSecret = process.env.JWT_SECRET;

const decode = (token) => {
  const { payload } = jwt.verify(token, jwtSecret);
  return payload;
};

const create = async (payload, expiresIn = null) => {
  const token = await new Promise((res, rej) =>
    jwt.sign(
      { payload },
      jwtSecret,
      { expiresIn: Number(expiresIn) || "365d" },
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

module.exports = {
  create,
  decode,
};
