const jwt = require("jsonwebtoken");

const checkLogin = (req, res, next) => {
  let cookieToken =
    Object.keys(req.signedCookies).length > 0 ? req.signedCookies : null;
  const authHeader = req.headers.authorization;
  const authToken = authHeader?.split(" ")[1];
  if (cookieToken && authToken) {
    try {
      let token68 = cookieToken[process.env.COOKIE_NAME];
      const { userId: token0 } = jwt.verify(token68, process.env.COOKIE_SECRET);
      const { userId } = jwt.verify(authToken, process.env.JWT_SECRET);

      if (token0 && userId) {
        req.user = userId;
        next();
      }
    } catch (err) {
      console.log("Unauthorized");
      res.status(500).json({
        error: "Authetication failure!",
      });
    }
  } else {
    console.log("Unauthorized");
    res.status(500).json({
      error: "Authetication failure!",
    });
  }
};

module.exports = {
  checkLogin,
};
