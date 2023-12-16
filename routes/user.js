const express = require("express");

const Router = express.Router();

const userController = require("../controller/user");

Router.post("/sinup", userController.sinup);

module.exports = Router;
