const Brand = require("../schema/brand.schema");
const CustomErrorHandler = require("../error/custom-error-handler");
const fs = require("fs");
const path = require("path");

const createBrand = async (req, res, next) => {
  try {
    const { name, description, country } = req.body;

    const existingBrand = await Brand.findOne({ name });
    if (existingBrand) {
      return next(CustomErrorHandler.BadRequest("Bu marka allaqachon mavjud!"));
    }

    if (!req.file) {
      return next(CustomErrorHandler.BadRequest("Logo yuklash majburiy!"));
    }

    const brand = new Brand({
      name,
      description,
      country,
      logo: req.file.path,
    });

    await brand.save();

    res.status(201).json({
      success: true,
      message: "Marka muvaffaqiyatli yaratildi!",
      data: brand,
    });
  } catch (error) {
    next(error);
  }
};

const getAllBrands = async (req, res, next) => {
  try {
    const { isActive, search, page = 1, limit = 10 } = req.query;

    const query = {};

    if (isActive !== undefined) {
      query.isActive = isActive === "true";
    }

    if (search) {
      query.name = { $regex: search, $options: "i" };
    }

    const skip = (page - 1) * limit;

    const brands = await Brand.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Brand.countDocuments(query);

    res.json({
      success: true,
      data: brands,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    next(error);
  }
};

const getBrandById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const brand = await Brand.findById(id);
    if (!brand) {
      return next(CustomErrorHandler.NotFound("Marka topilmadi!"));
    }

    res.json({
      success: true,
      data: brand,
    });
  } catch (error) {
    next(error);
  }
};

const updateBrand = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, description, country, isActive } = req.body;

    const brand = await Brand.findById(id);
    if (!brand) {
      return next(CustomErrorHandler.NotFound("Marka topilmadi!"));
    }

    if (req.file) {
      if (brand.logo && fs.existsSync(brand.logo)) {
        fs.unlinkSync(brand.logo);
      }
      brand.logo = req.file.path;
    }

    if (name) brand.name = name;
    if (description !== undefined) brand.description = description;
    if (country !== undefined) brand.country = country;
    if (isActive !== undefined) brand.isActive = isActive;

    await brand.save();

    res.json({
      success: true,
      message: "Marka muvaffaqiyatli yangilandi!",
      data: brand,
    });
  } catch (error) {
    next(error);
  }
};

const deleteBrand = async (req, res, next) => {
  try {
    const { id } = req.params;

    const brand = await Brand.findById(id);
    if (!brand) {
      return next(CustomErrorHandler.NotFound("Marka topilmadi!"));
    }

    if (brand.logo && fs.existsSync(brand.logo)) {
      fs.unlinkSync(brand.logo);
    }

    await Brand.findByIdAndDelete(id);

    res.json({
      success: true,
      message: "Marka muvaffaqiyatli o'chirildi!",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createBrand,
  getAllBrands,
  getBrandById,
  updateBrand,
  deleteBrand,
};
