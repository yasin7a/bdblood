const express = require("express");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const cors = require("cors");
// internal imports
const usersRouter = require("./router/usersRouter");
const loginRouter = require("./router/loginRouter");
const donarRoute = require("./router/donarRoute");
const regVerifyRoute = require("./router/regVerifyRoute");
const logVerifyRoute = require("./router/logVerifyRoute");
const resendOTPRoute = require("./router/resendOTPRoute");
const {
  notFoundHandler,
  errorHandler,
} = require("./middleware/common/errorHandler");
const server = express();

// app config
dotenv.config();
const PORT = process.env.PORT || 8000;
// database connection
mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("database successfully connected !!!..."))
  .catch((err) => console.error(err));

// request parser
server.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

server.use(express.json());
server.use(express.urlencoded({ extended: false }));

// parse cookies
server.use(cookieParser(process.env.COOKIE_SECRET));

// routing setup

server.use("/api/register", usersRouter);
server.use("/api/login", loginRouter);
server.use("/api/donors", donarRoute);
server.use("/api/reg-verify", regVerifyRoute);
server.use("/api/log-verify", logVerifyRoute);
server.use("/api/resendOTPmail", resendOTPRoute);

// 404 not found handler
server.use(notFoundHandler);

// common error handler
server.use(errorHandler);

server.listen(PORT, (err) => {
  if (err) throw err;
  console.log("server is listening on port", PORT, "...");
});
