const mongoose = require("mongoose")

const EmployeeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please provide an email"],
      unique: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email"],
    },
    department: {
      type: String,
      required: [true, "Please provide a department"],
      trim: true,
    },
    joiningDate: {
      type: Date,
      required: [true, "Please provide a joining date"],
    },
  },
  {
    timestamps: true,
  },
)

module.exports = mongoose.model("Employee", EmployeeSchema)
