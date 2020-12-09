const express = require("express");
const router = express.Router();
const { queryPromise, queryCallback } = require("../db");

router.get("/", (req, res) => {
  let sql = "SELECT * FROM employee";

  queryPromise(sql)
    .then((emp) => {
      console.log("emp:", emp);
      res.send(emp);
    })
    .catch((err) => {
      console.error("ERROR:" + err);
      res.status(400).send(err.message);
    });
});

router.get("/employees1", async (req, res) => {
  let sql = "SELECT * FROM employee";
  try {
    const emp = await queryPromise(sql);
    console.log("emp:", emp);
    res.send(emp);
  } catch (ex) {
    console.error("ERROR:" + ex);
    res.status(400).send(ex.message);
  }
});

router.get("/employees2", (req, res) => {
  let sql = "SELECT * FROM employee";
  queryCallback(sql, function (err, results) {
    if (err) {
      console.error("ERROR:" + err);
      res.status(400).send(err.message);
    } else {
      console.log("emp:", results);
      res.send(results);
    }
  });
});

module.exports = router;
