const TestDriveBooking = require("../models/bookingModel");
const Car = require("../models/carModel");

const createBooking = async (req, res) => {
  try {
    const { carId, showroomName, bookingDate, bookingTime, phone, notes } = req.body;

    if (!carId || !showroomName || !bookingDate || !bookingTime || !phone) {
      return res.status(400).json({
        success: false,
        message: "Please fill in all required booking details",
      });
    }

    const car = await Car.findById(carId);
    if (!car) {
      return res.status(404).json({
        success: false,
        message: "Car not found",
      });
    }

    const booking = await TestDriveBooking.create({
      userId: req.user._id,
      carId,
      showroomName,
      bookingDate: new Date(bookingDate),
      bookingTime,
      phone,
      notes: notes || "",
      status: "Pending",
    });

    return res.status(201).json({
      success: true,
      message: "Test drive appointment booked successfully!",
      booking,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getMyBookings = async (req, res) => {
  try {
    const bookings = await TestDriveBooking.find({ userId: req.user._id })
      .populate("carId")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      bookings,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllBookings = async (req, res) => {
  try {
    const bookings = await TestDriveBooking.find()
      .populate("userId", "firstName lastName email")
      .populate("carId")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      bookings,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateBookingStatus = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({
        success: false,
        message: "Status is required",
      });
    }

    if (!["Pending", "Confirmed", "Completed", "Cancelled"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid booking status value",
      });
    }

    const booking = await TestDriveBooking.findByIdAndUpdate(
      bookingId,
      { status },
      { new: true, runValidators: true }
    );

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: `Booking status updated to ${status} successfully!`,
      booking,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createBooking,
  getMyBookings,
  getAllBookings,
  updateBookingStatus,
};
