const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json({ limit: "50mb" }));
app.use(cors());
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

app.use(bodyParser.json());

const usersFilePath = path.join(__dirname, "user.json");
const employeeFilePath = path.join(__dirname, "employee.json");
let users = JSON.parse(fs.readFileSync(usersFilePath, "utf8"));
let employees = JSON.parse(fs.readFileSync(employeeFilePath, "utf8"));

// API endpoints

app.post("/api/employees", (req, res) => {
  try {
    const employeeData = req.body;
    employees.push(employeeData);
    fs.writeFileSync("employee.json", JSON.stringify(employees, null, 2));
    res.status(201).json({ message: "Employee added successfully" });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});
app.post("/api/register", (req, res) => {
  const { email, password, companyName, logoName, base64Image } = req.body;

  const matches = base64Image.match(/^data:(.+);base64,(.+)$/);
  const imageData = matches[2];
  const imagePath = path.join("src", "assets", "logo", logoName);

  if (users.some((user) => user.email === email)) {
    return res.status(400).json({ error: "Email already exists" });
  }

  fs.writeFile(imagePath, imageData, "base64", (err) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error saving the image");
    } else {
      users.push({ email, password, companyName, logoName });
      fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
    }
  });
  res.status(200).json({ message: "User registered successfully" });
});
app.get("/api/login", (req, res) => {
  const { email, password } = req.query;

  const user = users.find((u) => u.email === email);

  if (!user) {
    return res.status(404).json({ error: "Email not registered" });
  }

  if (user.password !== password) {
    return res.status(401).json({ error: "Incorrect password" });
  }

  // eslint-disable-next-line no-unused-vars
  const { password: _, ...userData } = user;
  res.status(200).json(userData);
});

app.delete("/api/employees/:sno", async (req, res) => {
  try {
    const index = employees.findIndex(
      (employee) => employee.sno === parseInt(req.params.sno)
    );

    if (index !== -1) {
      employees.splice(index, 1);
      fs.writeFileSync("employee.json", JSON.stringify(employees, null, 2));
      res.status(200).send("Employee deleted successfully.");
    } else {
      res.status(404).send("Employee not found.");
    }
  } catch (error) {
    console.error("Error deleting employee:", error);
    res.status(500).send("Internal server error.");
  }
});

app.put("/api/employees/:sno", async (req, res) => {
  try {
    const index = employees.findIndex(
      (employee) => employee.sno === parseInt(req.params.sno)
    );

    if (index !== -1) {
      employees[index] = { ...employees[index], ...req.body };

      fs.writeFileSync("employee.json", JSON.stringify(employees, null, 2));

      res.status(200).send("Employee updated successfully.");
    } else {
      res.status(404).send("Employee not found.");
    }
  } catch (error) {
    console.error("Error updating employee:", error);
    res.status(500).send("Internal server error.");
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
