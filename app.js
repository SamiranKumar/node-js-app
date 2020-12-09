const express = require("express");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

///
////
////

const employees = require("./routers/employees"); //routers file
const employees_v2 = require("./routers/employees_v2"); //routers file

app.use("/api/v1/employees", employees);
app.use("api/v2/employees", employees_v2);

/*
 url Not found
 */
app.use((req, res, next) => {
  const error = new Error("Not Found!");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    message: error.message,
  });
});

/*
 *
 *
 *
 */
const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log("Express server is Running Port:4000");
});

//module.exports = app; //app.js apply for public access modifier

// //===========================================================
// var mysqlConnection = msql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "employeedb",
//   multipleStatements: true, //For use store procedure
// });

// mysqlConnection.connect((err) => {
//   if (!err) {
//     console.log("DB Connection Succcess!");
//   } else {
//     console.log("DB Connection Failed:" + err.message);
//   }
// });

// app.get("/employees", (req, res) => {
//   mysqlConnection.query("SELECT * FROM employee", (err, rows, fields) => {
//     if (!err) {
//       //console.log(rows);
//       //  res.send(rows);
//       res.json(rows);
//     } else {
//       console.log(err);
//     }
//   });
// });

// app.get("/employees:id", (req, res) => {
//   mysqlConnection.query(
//     "SELECT * FROM employee WHERE id = ?",
//     [req.params.id],
//     (err, rows, fields) => {
//       if (!err) {
//         //console.log(rows);

//         res.send(rows);
//       } else {
//         console.log(err);
//       }
//     }
//   );
// });

// app.delete("/employees:id", (req, res) => {
//   mysqlConnection.query(
//     "DELETE FROM employee WHERE id = ?",
//     [req.params.id],
//     (err, rows, fields) => {
//       if (!err) {
//         //console.log(rows);

//         res.send("DELETE SUCCESSFULLY");
//       } else {
//         console.log(err);
//       }
//     }
//   );
// });

// app.post("/employees", (req, res) => {
//   let emp = req.body;
//   console.log(emp);
//   var sql =
//     "SET @id = ?; SET @emp_name = ?; @emp_code = ?; @salary = ?; CALL Employee_ADD_OR_EDIT( @_id, @_emp_name, @_emp_code, @_salary)";

//   mysqlConnection.query(
//     sql,
//     [emp.id, emp.name, emp.emp_code, emp.salary],
//     (err, rows, fields) => {
//       if (!err) {
//         //console.log(rows);

//         res.send(rows);
//       } else {
//         console.log(err);
//       }
//     }
//   );
// });
