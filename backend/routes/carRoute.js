const express = require("express");
const {
  createCar,
  updateCar,
  deleteCar,
  getCars,
  getCarById,
  createReview,
} = require("../controllers/carController");
const { isAuthenticated, isAdmin } = require("../middleware/isAuthenticated");

const router = express.Router();

router.get("/", getCars);
router.get("/:carId", getCarById);

router.post("/:carId/review", isAuthenticated, createReview);

router.post("/", isAuthenticated, isAdmin, createCar);
router.put("/:carId", isAuthenticated, isAdmin, updateCar);
router.delete("/:carId", isAuthenticated, isAdmin, deleteCar);

module.exports = router;
