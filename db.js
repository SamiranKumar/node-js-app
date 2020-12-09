const msql = require("mysql");

//===========================================================
var mysqlConnection = msql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "employeedb",
  multipleStatements: true, //For use store procedure
  connectionLimit: 50,
});

//======Create mysql Connection
// mysqlConnection.connect((err) => {
//   if (!err) {
//     console.log("DB Connection Succcess!");
//   } else {
//     console.log("DB Connection Failed:" + err.message);
//   }
// });

//
//
//
//======Create Promise base funtion
/*
function query(quarySql) {
  return new Promise((resolve, reject) => {
    mysqlConnection.query(quarySql, function (err, results) {
      //asynchronous funtion   function (err, results)
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}

*/

function queryPromise(quarySql) {
  return new Promise((resolve, reject) => {
    mysqlConnection.query(quarySql, (err, results) => {
      //asynchronous funtion   function (err, results)
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
}

//======Create Promise base funtion
function queryCallback(quarySql, callback) {
  mysqlConnection.query(quarySql, function (err, results) {
    if (err) callback(err);
    callback(null, results);
  });
}

module.exports = { queryPromise, queryCallback, mysqlConnection };
//module.exports = { mysqlConnection };
