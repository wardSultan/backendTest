const express = require("express");

const Router = express.Router();

const subscriptionController = require("../controller/subscription");

//CREAT NEW  SUBSCRIPTION
Router.post("/", subscriptionController.creatSubscription);

Router.post(
  "/get-all-subscriptions",
  subscriptionController.getAllSubscriptions
);

module.exports = Router;
