const mongoose = require("mongoose");

async function connectDB() {
  try {
    await mongoose
      .connect(process.env.MONGO_URI)
      .then(() => console.log("DataBase ga ulandi"))
      .catch((err) => console.log(err.message));
  } catch (error) {
    console.log(error.message);
  }
}

module.exports = connectDB;
