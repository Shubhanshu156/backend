const express = require("express");
const Employee = require("../employee");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { name, department, position, salary } = req.body;
    if (
      typeof name !== "string" ||
      typeof department !== "string" ||
      typeof position !== "string" ||
      typeof salary !== "number" ||
      isNaN(salary) ||
      salary <= 0
    ) {
      return res.status(400).json({
        error: "Invalid input. Please provide valid data types for each field.",
      });
    }

    const existingEmployee = await Employee.findOne({ name });
    if (existingEmployee) {
      return res
        .status(409)
        .json({ error: "An employee with the same name already exists." });
    }

    const newEmployee = new Employee({
      name,
      department,
      position,
      salary,
    });

    await newEmployee.save();

    res.status(201).json({ message: "Employee created successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
