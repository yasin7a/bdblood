const jwt = require("jsonwebtoken");

const checkLogin = (req, res, next) => {
  let cookies =
    Object.keys(req.signedCookies).length > 0 ? req.signedCookies : null;
  const authHeader = req.headers.authorization;
  const token = authHeader.split(" ")[1];

  if (cookies && token) {
    try {
      const { userId } = jwt.verify(token, process.env.JWT_SECRET);

      req.user = userId;
      next();
    } catch (err) {
      res.status(401).send("Unauthorized");
    }
  } else {
    res.status(401).send("Unauthorized");
  }
};

module.exports = {
  checkLogin,
};
