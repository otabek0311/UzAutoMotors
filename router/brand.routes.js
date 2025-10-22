const express = require("express");
const router = express.Router();
const {
  createBrand,
  getAllBrands,
  getBrandById,
  updateBrand,
  deleteBrand,
} = require("../controller/brand.controller");
const authMiddleware = require("../middleware/autharation.middleware");
const adminMiddleware = require("../middleware/admin-superadmin.middleware");
const uploadFile = require("../utils/upload");

router.get("/", getAllBrands);
router.get("/:id", getBrandById);

router.post("/", authMiddleware, adminMiddleware, uploadFile.single("logo"), createBrand);
router.put("/:id", authMiddleware, adminMiddleware, uploadFile.single("logo"), updateBrand);
router.delete("/:id", authMiddleware, adminMiddleware, deleteBrand);

module.exports = router;
