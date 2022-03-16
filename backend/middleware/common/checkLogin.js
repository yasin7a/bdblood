const jwt = require("jsonwebtoken");

const checkLogin = (req, res, next) => {
  let cookieToken =
    Object.keys(req.signedCookies).length > 0 ? req.signedCookies : null;
  const authHeader = req.headers.authorization;
  const authToken = authHeader.split(" ")[1];

  if (cookieToken && authToken) {
    try {
      const { userId } = jwt.verify(authToken, process.env.JWT_SECRET);

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
