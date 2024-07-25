const jwt = require("jsonwebtoken");
const { secret } = require("../config");

module.exports = function (req, res, next) {
  if (req.method !== "POST" || (req.method === "POST" && req.url === "/login")) {
    next();
    return;
  }

  try {
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).send("No token provided");
    }

    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        return res.status(500).send("Failed to authenticate token");
      }

      //   res.status(200).send(`User ${decoded.id} authenticated`);
      next();
    });
  } catch (error) {
    console.log(error);
    return res.status(401).json({ error });
  }
};
