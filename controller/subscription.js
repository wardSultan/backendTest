const bcrypt = require("bcrypt");

const Subscription = require("../models/subscription");

const User = require("../models/user");

exports.creatSubscription = async (req, res, next) => {
  try {
    const body = req.body;

    const data = await Subscription.create(body);

    const savedData = await data.save();

    return res
      .status(201)
      .json({ data: savedData, message: "created successfully" });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res.status(422).json({
        message: "Validation failed",
        errors: error.errors,
      });
    }

    next(error);
  }
};

exports.getAllSubscriptions = async (req, res, next) => {
  try {
    const { page = 1, pageSize = 10 } = req.query;

    const pageNumber = parseInt(page);

    const limitNumber = parseInt(pageSize);

    const { name, password } = req.body;

    // Check if user with the provided name exists
    const user = await User.findOne({ name });

    if (!user) {
      return res.status(401).json({ message: "Unauthorized: User not found" });
    }

    // Check if the provided password matches the hashed password in the database
    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res
        .status(401)
        .json({ message: "Unauthorized: Incorrect password" });
    }

    // Validate page and limit values
    if (
      isNaN(pageNumber) ||
      isNaN(limitNumber) ||
      pageNumber <= 0 ||
      limitNumber <= 0
    ) {
      return res.status(400).json({ message: "Invalid pagination parameters" });
    }

    const skip = (pageNumber - 1) * limitNumber;

    const total = await Subscription.find().countDocuments();

    const data = await Subscription.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNumber);

    return res.status(200).json({
      data: data,
      page: pageNumber,
      pageSize: pageSize,
      total: total,
      message: "Success",
    });
  } catch (error) {
    next(error);
  }
};
