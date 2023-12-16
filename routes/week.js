const express = require("express");

const Router = express.Router();

const weekController = require("../controller/week");

Router.post("/", weekController.creatWeek);

Router.get("/", weekController.getAllWeeks);

module.exports = Router;
