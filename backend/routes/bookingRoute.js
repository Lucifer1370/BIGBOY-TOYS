const express = require("express");
const {
  createBooking,
  getMyBookings,
  getAllBookings,
  updateBookingStatus,
} = require("../controllers/bookingController");
const { isAuthenticated, isAdmin } = require("../middleware/isAuthenticated");

const router = express.Router();

router.post("/", isAuthenticated, createBooking);
router.get("/my-bookings", isAuthenticated, getMyBookings);

router.get("/all-bookings", isAuthenticated, isAdmin, getAllBookings);
router.put("/status/:bookingId", isAuthenticated, isAdmin, updateBookingStatus);

module.exports = router;
