const Car = require("../schema/car.schema");
const Brand = require("../schema/brand.schema");
const CustomErrorHandler = require("../error/custom-error-handler");
const fs = require("fs");

const createCar = async (req, res, next) => {
  try {
    const {
      brand,
      model,
      year,
      price,
      color,
      fuelType,
      transmission,
      engineCapacity,
      mileage,
      features,
      description,
    } = req.body;

    const brandExists = await Brand.findById(brand);
    if (!brandExists) {
      return next(CustomErrorHandler.NotFound("Marka topilmadi!"));
    }

    const images = {
      exterior: [],
      interior: [],
    };

    if (req.files) {
      if (req.files.exterior) {
        images.exterior = req.files.exterior.map((file) => 
          `${req.protocol}://${req.get('host')}/${file.path.replace(/\\/g, '/')}`
        );
      }
      if (req.files.interior) {
        images.interior = req.files.interior.map((file) => 
          `${req.protocol}://${req.get('host')}/${file.path.replace(/\\/g, '/')}`
        );
      }
    }

    const car = new Car({
      brand,
      model,
      year,
      price,
      color,
      fuelType,
      transmission,
      engineCapacity,
      mileage,
      images,
      features: features ? JSON.parse(features) : [],
      description,
    });

    await car.save();

    await car.populate("brand");

    res.status(201).json({
      success: true,
      message: "Mashina muvaffaqiyatli qo'shildi!",
      data: car,
    });
  } catch (error) {
    next(error);
  }
};

const getAllCars = async (req, res, next) => {
  try {
    const {
      brand,
      fuelType,
      transmission,
      minPrice,
      maxPrice,
      year,
      search,
      isAvailable,
      page = 1,
      limit = 12,
      sort = "-createdAt",
    } = req.query;

    const query = {};

    if (brand) query.brand = brand;
    if (fuelType) query.fuelType = fuelType;
    if (transmission) query.transmission = transmission;
    if (isAvailable !== undefined) query.isAvailable = isAvailable === "true";
    
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    if (year) query.year = Number(year);

    if (search) {
      query.$or = [
        { model: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    const skip = (page - 1) * limit;

    const cars = await Car.find(query)
      .populate("brand")
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Car.countDocuments(query);

    res.json({
      success: true,
      data: cars,
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

const getCarById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const car = await Car.findById(id).populate("brand");
    if (!car) {
      return next(CustomErrorHandler.NotFound("Mashina topilmadi!"));
    }

    car.viewCount += 1;
    await car.save();

    res.json({
      success: true,
      data: car,
    });
  } catch (error) {
    next(error);
  }
};

const updateCar = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

    const car = await Car.findById(id);
    if (!car) {
      return next(CustomErrorHandler.NotFound("Mashina topilmadi!"));
    }

    if (updateData.brand) {
      const brandExists = await Brand.findById(updateData.brand);
      if (!brandExists) {
        return next(CustomErrorHandler.NotFound("Marka topilmadi!"));
      }
    }

    if (req.files) {
      if (req.files.exterior) {
        car.images.exterior.forEach((imgUrl) => {
          const imgPath = imgUrl.split(req.get('host') + '/')[1];
          if (imgPath && fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
        });
        car.images.exterior = req.files.exterior.map((file) => 
          `${req.protocol}://${req.get('host')}/${file.path.replace(/\\/g, '/')}`
        );
      }
      if (req.files.interior) {
        car.images.interior.forEach((imgUrl) => {
          const imgPath = imgUrl.split(req.get('host') + '/')[1];
          if (imgPath && fs.existsSync(imgPath)) fs.unlinkSync(imgPath);
        });
        car.images.interior = req.files.interior.map((file) => 
          `${req.protocol}://${req.get('host')}/${file.path.replace(/\\/g, '/')}`
        );
      }
    }

    if (updateData.features && typeof updateData.features === "string") {
      updateData.features = JSON.parse(updateData.features);
    }

    Object.assign(car, updateData);
    await car.save();
    await car.populate("brand");

    res.json({
      success: true,
      message: "Mashina muvaffaqiyatli yangilandi!",
      data: car,
    });
  } catch (error) {
    next(error);
  }
};

const deleteCar = async (req, res, next) => {
  try {
    const { id } = req.params;

    const car = await Car.findById(id);
    if (!car) {
      return next(CustomErrorHandler.NotFound("Mashina topilmadi!"));
    }

    [...car.images.exterior, ...car.images.interior].forEach((img) => {
      if (fs.existsSync(img)) fs.unlinkSync(img);
    });

    await Car.findByIdAndDelete(id);

    res.json({
      success: true,
      message: "Mashina muvaffaqiyatli o'chirildi!",
    });
  } catch (error) {
    next(error);
  }
};

const getPopularCars = async (req, res, next) => {
  try {
    const { limit = 8 } = req.query;

    const cars = await Car.find({ isAvailable: true })
      .populate("brand")
      .sort({ viewCount: -1 })
      .limit(parseInt(limit));

    res.json({
      success: true,
      data: cars,
    });
  } catch (error) {
    next(error);
  }
};

const getLatestCars = async (req, res, next) => {
  try {
    const { limit = 8 } = req.query;

    const cars = await Car.find({ isAvailable: true })
      .populate("brand")
      .sort({ createdAt: -1 })
      .limit(parseInt(limit));

    res.json({
      success: true,
      data: cars,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createCar,
  getAllCars,
  getCarById,
  updateCar,
  deleteCar,
  getPopularCars,
  getLatestCars,
};
