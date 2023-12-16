var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const mongoose = require("mongoose");
var config = require("./config");

//Routers
const subscriptioRouter = require("./routes/subscription");
const userRouter = require("./routes/user");
const subscriberRouter = require("./routes/subscriber");
const weekRouter = require("./routes/week");

var url = config.DBURL;
const connect = mongoose.connect(url);
connect.then(
  (db) => {
    console.log("Conneected Correctly to DB");
  },
  (err) => {
    console.log(err);
  }
);
const bodyParser = require("body-parser");
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/subscription", subscriptioRouter);
app.use("/auth", userRouter);
app.use("/subscriber", subscriberRouter);
app.use("/week", weekRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});
app.listen(3000, () => {
  console.log("working on port", 3000);
});

module.exports = app;
