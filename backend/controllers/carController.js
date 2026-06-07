const Car = require("../models/carModel");
const Review = require("../models/reviewModel");

const createCar = async (req, res) => {
  try {
    const {
      name,
      brand,
      price,
      onRoadPrice,
      category,
      fuelType,
      transmission,
      seatingCapacity,
      mileage,
      safetyRating,
      image,
      gallery,
      engine,
      horsepower,
      torque,
      topSpeed,
      airbags,
      adas,
      pros,
      cons,
      maintenanceCostPerYear,
      description,
    } = req.body;

    if (!name || !brand || !price || !onRoadPrice || !category || !fuelType || !transmission || !seatingCapacity || !mileage || !image) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields",
      });
    }

    const newCar = await Car.create({
      name,
      brand,
      price,
      onRoadPrice,
      category,
      fuelType,
      transmission,
      seatingCapacity,
      mileage,
      safetyRating,
      image,
      gallery: gallery || [],
      engine,
      horsepower,
      torque,
      topSpeed,
      airbags,
      adas: adas || false,
      pros: pros || [],
      cons: cons || [],
      maintenanceCostPerYear,
      description,
      creator: req.user._id,
    });

    return res.status(201).json({
      success: true,
      message: "Car added successfully",
      car: newCar,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateCar = async (req, res) => {
  try {
    const { carId } = req.params;
    const updateData = req.body;

    const updatedCar = await Car.findByIdAndUpdate(carId, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedCar) {
      return res.status(404).json({
        success: false,
        message: "Car not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Car updated successfully",
      car: updatedCar,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteCar = async (req, res) => {
  try {
    const { carId } = req.params;

    const deletedCar = await Car.findByIdAndDelete(carId);

    if (!deletedCar) {
      return res.status(404).json({
        success: false,
        message: "Car not found",
      });
    }

    await Review.deleteMany({ carId });

    return res.status(200).json({
      success: true,
      message: "Car deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getCars = async (req, res) => {
  try {
    const {
      search,
      brand,
      category,
      fuelType,
      transmission,
      minPrice,
      maxPrice,
      minSafety,
      sort,
    } = req.query;

    const query = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { brand: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    if (brand) {
      query.brand = brand;
    }
    if (category) {
      query.category = category;
    }
    if (fuelType) {
      query.fuelType = fuelType;
    }
    if (transmission) {
      query.transmission = transmission;
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }
    if (minSafety) {
      query.safetyRating = { $gte: Number(minSafety) };
    }

    let sortOption = { createdAt: -1 };
    if (sort) {
      if (sort === "priceAsc") {
        sortOption = { price: 1 };
      } else if (sort === "priceDesc") {
        sortOption = { price: -1 };
      } else if (sort === "rating") {
        sortOption = { safetyRating: -1 };
      } else if (sort === "mileage") {
        sortOption = { mileage: -1 };
      }
    }

    const cars = await Car.find(query).sort(sortOption);

    return res.status(200).json({
      success: true,
      cars,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getCarById = async (req, res) => {
  try {
    const { carId } = req.params;

    const car = await Car.findById(carId);
    if (!car) {
      return res.status(404).json({
        success: false,
        message: "Car not found",
      });
    }

    const reviews = await Review.find({ carId }).sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      car,
      reviews,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const createReview = async (req, res) => {
  try {
    const { carId } = req.params;
    const { rating, comment } = req.body;

    if (!rating || !comment) {
      return res.status(400).json({
        success: false,
        message: "Rating and comment are required",
      });
    }

    const car = await Car.findById(carId);
    if (!car) {
      return res.status(404).json({
        success: false,
        message: "Car not found",
      });
    }

    const review = await Review.create({
      userId: req.user._id,
      userName: `${req.user.firstName} ${req.user.lastName}`,
      carId,
      rating: Number(rating),
      comment,
    });

    return res.status(201).json({
      success: true,
      message: "Review added successfully",
      review,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createCar,
  updateCar,
  deleteCar,
  getCars,
  getCarById,
  createReview,
};
