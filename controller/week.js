const Week = require("../models/week");

exports.creatWeek = async (req, res, next) => {
  try {
    const body = req.body;
    const newWeek = new Week(body);

    const savedWeek = await newWeek.save();

    return res
      .status(201)
      .json({ data: savedWeek, message: "Week created successfully" });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res
        .status(400)
        .json({ message: "Validation failed", errors: error.errors });
    }
    next(error);
  }
};

exports.getAllWeeks = async (req, res, next) => {
  try {
    const { page = 1, pageSize = 10 } = req.query;

    const pageNumber = parseInt(page);

    const limitNumber = parseInt(pageSize);

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

    const total = await Week.find().countDocuments();

    const data = await Week.find()
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
