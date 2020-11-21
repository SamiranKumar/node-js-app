const { query, queryCb } = require("./db");

const express = require("express");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

///
////
////
app.get("/employees", (req, res) => {
  let q = "SELECT * FROM employee";

  dbQuary(q)
    .then(function (emp) {
      console.log("emp:", emp);
      res.send(emp);
    })
    .catch((err) => {
      console.error("ERROR:" + err);
      res.status(400).send(err.message);
    });
});

app.get("/employees1", async (req, res) => {
  let q = "SELECT * FROM employee";
  try {
    const emp = await dbQuary(q);
    console.log("emp:", emp);
    res.send(emp);
  } catch (ex) {
    console.error("ERROR:" + ex);
    res.status(400).send(ex.message);
  }
});

app.get("/employees2", (req, res) => {
  let q = "SELECT * FROM employee";
  queryCb(q, function (err, results) {
    if (err) {
      console.error("ERROR:" + err);
      res.status(400).send(err.message);
    } else {
      console.log("emp:", results);
      res.send(results);
    }
  });
});

app.listen(4000, () => {
  console.log("Express server is Running Port:4000");
});

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
