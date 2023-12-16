const bcrypt = require("bcrypt");

const User = require("../models/user");

exports.sinup = async (req, res, next) => {
  try {
    const { name, password } = req.body;

    const existingUser = await User.findOne({ name });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: `User with this name : ${name} already exists` });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    return res
      .status(201)
      .json({ data: savedUser, message: "User created successfully" });
  } catch (error) {
    if (error.name === "ValidationError") {
      return res
        .status(400)
        .json({ message: "Validation failed", errors: error.errors });
    }
    next(error);
  }
};
