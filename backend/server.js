const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const employeeRoutes = require("./routes/employeeRoutes")
require("dotenv").config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err))

// Routes
app.use("/api/employees", employeeRoutes)

// Basic route
app.get("/", (req, res) => {
  res.send("Employee Management API is running")
})

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
