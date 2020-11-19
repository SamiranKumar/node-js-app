const msql = require("mysql");

const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));


//===========================================================
var mysqlConnection = msql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'employeedb'

});

mysqlConnection.connect((err) => {
    if (!err) {
        console.log("DB Connection Succcess!");
    } else {
        console.log("DB Connection Failed:" + err.message);
    }
});


app.listen(4000,()=>{
    console.log("Express server is Running Port:4000");
});
