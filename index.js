const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const YAML = require("yamljs");
const cookieParser = require("cookie-parser");
const path = require("path");
const errorMiddleware = require("./middleware/error.middleware");
require("dotenv").config();

const authRoutes = require("./router/auth.routes");
const brandRoutes = require("./router/brand.routes");
const carRoutes = require("./router/car.routes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: ['http://localhost:5173', 'https://uzautomotors.vercel.app'],
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/upload", express.static(path.join(__dirname, "upload")));

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/brands", brandRoutes);
app.use("/api/cars", carRoutes);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "UzAutoMotors API ishlayapti!",
  });
});

app.use(errorMiddleware);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route topilmadi!",
  });
});

app.listen(PORT, () => {
  console.log(`Server ${PORT} portda ishga tushdi! 🚀`);
});