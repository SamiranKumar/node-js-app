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
    database: 'employeedb',
    multipleStatements:true  //For use store procedure

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



app.get('/employees',(req,res)=>{
    mysqlConnection.query('SELECT * FROM employee',(err,rows,fields)=>{
        if(!err){
            //console.log(rows);
        res.send(rows);

        }else{
            console.log(err);
        }
    })
});

app.get('/employees:id',(req,res)=>{
    mysqlConnection.query('SELECT * FROM employee WHERE id = ?',[req.params.id],(err,rows,fields)=>{
        if(!err){
            //console.log(rows);
        
        res.send(rows);
        }else{
            console.log(err);
        }
    })
});



app.delete('/employees:id',(req,res)=>{
    mysqlConnection.query('DELETE FROM employee WHERE id = ?',[req.params.id],(err,rows,fields)=>{
        if(!err){
            //console.log(rows);
        
        res.send("DELETE SUCCESSFULLY");

        }else{
            console.log(err);
        }
    })
});


app.post('/employees',(req,res)=>{

    let emp = req.body;
    console.log(emp);
    var sql = "SET @id = ?; SET @emp_name = ?; @emp_code = ?; @salary = ?; CALL Employee_ADD_OR_EDIT( @_id, @_emp_name, @_emp_code, @_salary)";

    mysqlConnection.query(sql,[emp.id,emp.name,emp.emp_code,emp.salary],(err,rows,fields)=>{
        if(!err){
            //console.log(rows);
        
        res.send(rows);
        }else{
            console.log(err);
        }
    })
});