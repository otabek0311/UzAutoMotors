const mongoose = require("mongoose");

const carSchema = new mongoose.Schema(
  {
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brand",
      required: true,
    },
    model: {
      type: String,
      required: true,
      trim: true,
    },
    year: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    fuelType: {
      type: String,
      enum: ["benzin", "dizel", "elektr", "gibrid"],
      required: true,
    },
    transmission: {
      type: String,
      enum: ["mexanika", "avtomat"],
      required: true,
    },
    engineCapacity: {
      type: String,
      trim: true,
    },
    mileage: {
      type: Number,
      default: 0,
    },
    images: {
      exterior: [
        {
          type: String,
        },
      ],
      interior: [
        {
          type: String,
        },
      ],
    },
    features: [
      {
        type: String,
      },
    ],
    description: {
      type: String,
      trim: true,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    viewCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Car", carSchema);
