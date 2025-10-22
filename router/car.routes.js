const express = require("express");
const router = express.Router();
const {
  createCar,
  getAllCars,
  getCarById,
  updateCar,
  deleteCar,
  getPopularCars,
  getLatestCars,
} = require("../controller/car.controller");
const authMiddleware = require("../middleware/autharation.middleware");
const adminMiddleware = require("../middleware/admin-superadmin.middleware");
const uploadFile = require("../utils/upload");

router.get("/", getAllCars);
router.get("/popular", getPopularCars);
router.get("/latest", getLatestCars);
router.get("/:id", getCarById);

router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  uploadFile.fields([
    { name: "exterior", maxCount: 10 },
    { name: "interior", maxCount: 10 },
  ]),
  createCar
);

router.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  uploadFile.fields([
    { name: "exterior", maxCount: 10 },
    { name: "interior", maxCount: 10 },
  ]),
  updateCar
);

router.delete("/:id", authMiddleware, adminMiddleware, deleteCar);

module.exports = router;
