const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}))

app.use(express.static("public"));
app.use(express.json());
//CONNECTING DATABASE TO OUR EXPRESS APPLICATION
mongoose.connect("mongodb://localhost:27017/gfg-employees",
{useNewUrlParser: true})

//writing schema fpr employee-data collection
const employeeSchema = {
    employee_name: String,
    employee_department: String,
    employee_salary: Number
}

//Creating a model around employeeSchema
const EmployeeData= mongoose.model(
    "EmployeeData", employeeSchema
)

//fetching all the employee
app.get("/employees", async (req, res) => {
   try {
    const foundEmployees = await EmployeeData.find()
    res.send(foundEmployees)
} catch (err) {
    res.send(err)
}
    })

app.get("/employees/:id", async (req, res) => {
    try {
        const foundEmployee = await EmployeeData.findOne({_id: req.params.id});
        res.send(foundEmployee)
    } catch (err) {
        res.send(err)
    }
})

app.post("/employees", async (req, res) => {
    try {
        const newEmployee = new EmployeeData(req.body);
        const savedEmployee = await newEmployee.save();
        res.status(201).send(savedEmployee);
    } catch (err) {
        res.status(400).send(err);
    }
});

app.delete("/employees/:id", async (req, res) => {
    try {
      const deleteForId = await EmployeeData.deleteOne({_id: req.params.id})  
    } catch (error) {
        res.send(error)
    }
})
app.listen(3000, function(){
    console.log("server started on port 3000");
})
