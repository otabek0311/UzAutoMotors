const User = require("../schema/user.schema");
const bcrypt = require("bcryptjs");
const CustomErrorHandler = require("../error/custom-error-handler");
const { accessToken, refreshToken } = require("../utils/token-generator");
const sendOtp = require("../utils/send-otp");
const jwt = require("jsonwebtoken");

const register = async (req, res, next) => {
  try {
    const { fullName, email, password, phoneNumber } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(CustomErrorHandler.BadRequest("Bu email allaqachon ro'yxatdan o'tgan!"));
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000);

    const user = new User({
      fullName,
      email,
      password: hashedPassword,
      phoneNumber,
      otp: {
        code: otp,
        expiresAt: otpExpires,
      },
    });

    await user.save();

    await sendOtp(email, otp);

    res.status(201).json({
      success: true,
      message: "Ro'yxatdan o'tdingiz! Emailingizga tasdiqlash kodi yuborildi.",
      data: {
        email: user.email,
        fullName: user.fullName,
      },
    });
  } catch (error) {
    next(error);
  }
};

const verifyOtp = async (req, res, next) => {
  try {
    const { email, otp } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return next(CustomErrorHandler.NotFound("Foydalanuvchi topilmadi!"));
    }

    if (user.isVerified) {
      return next(CustomErrorHandler.BadRequest("Email allaqachon tasdiqlangan!"));
    }

    if (user.otp.code !== otp) {
      return next(CustomErrorHandler.BadRequest("OTP kod noto'g'ri!"));
    }

    if (new Date() > user.otp.expiresAt) {
      return next(CustomErrorHandler.BadRequest("OTP kodi muddati tugagan!"));
    }

    user.isVerified = true;
    user.otp = undefined;
    await user.save();

    res.json({
      success: true,
      message: "Email muvaffaqiyatli tasdiqlandi!",
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return next(CustomErrorHandler.BadRequest("Email yoki parol noto'g'ri!"));
    }

    if (!user.isVerified) {
      return next(CustomErrorHandler.unAuthorazed("Emailingizni tasdiqlang!"));
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return next(CustomErrorHandler.BadRequest("Email yoki parol noto'g'ri!"));
    }

    const payload = {
      _id: user._id,
      email: user.email,
      role: user.role,
    };

    const access = accessToken(payload);
    const refresh = refreshToken(payload);

    res.json({
      success: true,
      message: "Tizimga muvaffaqiyatli kirdingiz!",
      data: {
        user: {
          _id: user._id,
          fullName: user.fullName,
          email: user.email,
          role: user.role,
        },
        accessToken: access,
        refreshToken: refresh,
      },
    });
  } catch (error) {
    next(error);
  }
};

const forgetPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return next(CustomErrorHandler.NotFound("Foydalanuvchi topilmadi!"));
    }

    const resetToken = jwt.sign({ _id: user._id }, process.env.RESET_SECRET_KEY, {
      expiresIn: "1h",
    });

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000;
    await user.save();

    await sendOtp(email, resetToken);

    res.json({
      success: true,
      message: "Parolni tiklash uchun email yuborildi!",
    });
  } catch (error) {
    next(error);
  }
};

const resetPassword = async (req, res, next) => {
  try {
    const { token, newPassword } = req.body;

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
      return next(CustomErrorHandler.BadRequest("Token yaroqsiz yoki muddati tugagan!"));
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.json({
      success: true,
      message: "Parol muvaffaqiyatli o'zgartirildi!",
    });
  } catch (error) {
    next(error);
  }
};

const getCurrentUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) {
      return next(CustomErrorHandler.NotFound("Foydalanuvchi topilmadi!"));
    }

    res.json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  verifyOtp,
  login,
  forgetPassword,
  resetPassword,
  getCurrentUser,
};
