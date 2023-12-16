const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const WeekSchema = new Schema(
  {
    name: { type: String, required: true },
    days: [
      {
        name: {
          type: String,
          required: true,
        },
        category: [
          {
            type: String,
            enum: ["NEW", "NEW_WORKOUT", "REST_DAY"],
            required: true,
          },
        ],
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Weeks = mongoose.model("Weeks", WeekSchema);

module.exports = Weeks;
