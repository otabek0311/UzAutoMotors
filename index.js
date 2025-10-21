const express = require("express")
const cors = require("cors")
const connectDB = require("./config/db")
const YAML = require("yamljs")
const cockieParser = require("cookie-parser")
require("dotenv").config() 



const app = express()
const PORT = process.env.PORT || 3000



app.use(express.json())
app.use(cors())

connectDB()



app.listen(PORT, () =>{
    console.log("server ishladi ",PORT); 
})