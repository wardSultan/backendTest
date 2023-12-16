const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const subscriptionSchema = new Schema(
  {
    type_name: {
      type: String,
      default: "",
    },
    type_nameAr: {
      type: String,
      required: true,
    },
    type_nameEn: {
      type: String,
      required: true,
    },
    sub_type_name: {
      type: String,
      default: "",
    },
    sub_type_nameAr: {
      type: String,
      required: true,
    },
    sub_type_nameEn: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Subscriptions = mongoose.model("Subscriptions", subscriptionSchema);

module.exports = Subscriptions;
