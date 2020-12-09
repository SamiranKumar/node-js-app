const express = require("express");
const router = express.Router();
const { mysqlConnection } = require("../db");
const { validateFields } = require("../utils/fieldsValidity");

router.get("/", (req, res, next) => {
  res.status(200).json({
    message: "Handling GET Request to Product",
  });
});

router.post("/", (req, res, next) => {
  const requestData = {
    emp_name: req.body.emp_name,
    emp_code: req.body.emp_code,
    salary: req.body.salary,
  };

  mysqlConnection.query(
    "INSERT INTO employee SET ?",
    requestData,
    function (error, results, fields) {
      if (error) {
        console.log("error ocurred", error);
        res.send({
          code: 400,
          failed: "error ocurred",
        });
      } else {
        console.log("The solution is: ", results);
        res.send({
          code: 200,
          success: "user registered sucessfully",
        });
      }
    }
  );
});

router.post("/a", async (req, res) => {
  const required = ["emp_name", "emp_code", "salary"];
  let validity = validateFields(required, req.body);

  if (!validity.is_valid) {
    return res.status(400).send({ message: validity.message });
  }

  return res.status(200).send({ message: validity.message });
});

/*








exports.getUser = function (id, callback) {
  let sql = `SELECT * From users WHERE id = ?`;
  db.query(sql, [id], function (err, data) {
    if (err) {
      callback(err);
    } else {
      callback(null, data);
    }
  });
};



exports.updateUser = function (id, data, callback) {
  let sql = "update users set ? where id = ?";
  db.query(sql, [data, id], function (err, data) {
    if (err) {
      callback(err);
    } else {
      callback(null, data);
    }
  });
};

exports.deleteUser = function (id, callback) {
  let sql = "DELETE from users where id = ?";
  db.query(sql, [id], function (err, data) {
    if (err) {
      callback(err);
    } else {
      callback(null, data);
    }
  });
};
*/
//--------------------------------------------------------------
module.exports = router;
//--------------------------------------------------------------
