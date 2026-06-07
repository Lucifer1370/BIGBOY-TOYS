const mongoose = require("mongoose");

const carSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    brand: {
      type: String,
      required: true,

      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    onRoadPrice: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ["SUV", "Sedan", "Hatchback", "Luxury", "Sports", "EV"],
    },
    fuelType: {
      type: String,
      required: true,
      enum: ["Petrol", "Diesel", "Electric", "Hybrid"],
    },
    transmission: {
      type: String,
      required: true,
      enum: ["Automatic", "Manual"],
    },
    seatingCapacity: {
      type: Number,
      required: true,
    },
    mileage: {
      type: Number,
      required: true,
    },
    safetyRating: {
      type: Number,
      required: true,
      default: 5,
    },
    image: {
      type: String,
      required: true,
    },
    gallery: {
      type: [String],
      default: [],
    },
    engine: {
      type: String,
      default: "Standard Engine",
    },
    horsepower: {
      type: Number,
      default: 150,
    },
    torque: {
      type: Number,
      default: 250,
    },
    topSpeed: {
      type: Number,
      default: 180,
    },
    airbags: {
      type: Number,
      default: 6,
    },
    adas: {
      type: Boolean,
      default: false,
    },
    pros: {
      type: [String],
      default: [],
    },
    cons: {
      type: [String],
      default: [],
    },
    maintenanceCostPerYear: {
      type: Number,
      default: 15000,
    },
    description: {
      type: String,
      trim: true,
    },
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Car", carSchema);
