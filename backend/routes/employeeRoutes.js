const express = require("express");
const router = express.Router();
const Employee = require("../models/Employee");

// GET /api/employees - Fetch all employees
router.get("/", async (req, res) => {
  try {
    const employees = await Employee.find({}).sort({ createdAt: -1 });
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch employees" });
  }
});

// GET /api/employees/:id - Get a specific employee
router.get("/:id", async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ error: "Employee not found" });
    }
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch employee" });
  }
});

// POST /api/employees - Add a new employee
router.post("/", async (req, res) => {
  try {
    const { name, email, department, joiningDate } = req.body;

    // Validation
    if (!name || !email || !department || !joiningDate) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Email validation
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    // Check if email already exists
    const existingEmployee = await Employee.findOne({ email });
    if (existingEmployee) {
      return res
        .status(400)
        .json({ error: "Employee with this email already exists" });
    }

    const newEmployee = new Employee({
      name,
      email,
      department,
      joiningDate,
    });

    await newEmployee.save();
    res.status(201).json(newEmployee);
  } catch (error) {
    res.status(500).json({ error: "Failed to create employee" });
  }
});

// PUT /api/employees/:id - Update an employee
router.put("/:id", async (req, res) => {
  try {
    const { name, email, department, joiningDate } = req.body;

    // Validation
    if (!name || !email || !department || !joiningDate) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Email validation
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    // Check if email already exists (excluding the current employee)
    const existingEmployee = await Employee.findOne({
      email,
      _id: { $ne: req.params.id },
    });

    if (existingEmployee) {
      return res
        .status(400)
        .json({ error: "Another employee with this email already exists" });
    }

    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.params.id,
      { name, email, department, joiningDate },
      { new: true, runValidators: true }
    );

    if (!updatedEmployee) {
      return res.status(404).json({ error: "Employee not found" });
    }

    res.status(200).json(updatedEmployee);
  } catch (error) {
    res.status(500).json({ error: "Failed to update employee" });
  }
});

// DELETE /api/employees/:id - Delete an employee
router.delete("/:id", async (req, res) => {
  try {
    const deletedEmployee = await Employee.findByIdAndDelete(req.params.id);
    if (!deletedEmployee) {
      return res.status(404).json({ error: "Employee not found" });
    }
    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete employee" });
  }
});

module.exports = router;
