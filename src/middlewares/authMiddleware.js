const jsonwebtoken = require("jsonwebtoken");
const { NotAuthorizedError } = require("../validation");

const authMiddleware = (req, res, next) => {
  const [, token] = req.headers["authorization"].split(" ");

  console.log(token);

  if (!token) {
    next(NotAuthorizedError("Please, provide a token"));
  }

  try {
    const user = jsonwebtoken.decode(token, process.env.JWT_SECRET);
    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    next(NotAuthorizedError("Invalid  token"));
  }
};

module.exports = {
  authMiddleware,
};
