const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SubscriberSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ["MALE", "FEMALE"],
    },
    age: {
      type: Number,
      required: true,
    },
    height: {
      type: Number,
      required: true,
    },
    weight: {
      type: Number,
      required: true,
    },
    birthdate: {
      type: Date,
      required: true,
    },
    picture_ID: {
      type: Number, //It must be id (primary key) by another entity
      required: true,
    },
    Goal_ID: {
      goals: [
        {
          type: Number, //It must be id (primary key) by another entity
          required: true,
        },
      ],
    },
    Type_ID: {
      type: Number, //It must be id (primary key) by another entity
      required: true,
    },
    preference_Option_ID: {
      type: Number, //It must be id (primary key) by another entity
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Subscriber = mongoose.model("Subscriberes", SubscriberSchema);

module.exports = Subscriber;
