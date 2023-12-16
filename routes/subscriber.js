const express = require("express");

const Router = express.Router();

const subscriberController = require("../controller/subscriber");

// CREAT NEW  SUBSCRIBER
Router.post("/", subscriberController.creatSubscriber);

module.exports = Router;
