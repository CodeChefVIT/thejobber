const express =require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const app = express()
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Create connection
const db = mysql.createConnection({
    host : 'localhost',
    user: 'root',
    password : '',
    database: 'ccsqlnew'  //to use the ccsql database
});

//Connect                               
db.connect((err)=>{

    if(err){
        throw err;
    }
    console.log('Mysql connected..')

})
// for sign in
app.post('/user/signup', function(req, res){
    sql = "INSERT INTO usertable(id, name, email, address, phnum, paymentid, rating, uid) VALUES ('5959', 'rishabh', 'rb@gmail.com', 'vellore institute of technology vellore', '9928160595', 'upiid', '7', '11')";

    db.query(sql , (err, result)=>{
        if(err) throw err;
        console.log(result);
        res.send("Signup Successful");
    })
    db.query('UPDATE usertable SET id = FLOOR( 1 + RAND( ) *3000)')
    db.query('UPDATE usertable SET uid = FLOOR( 1 + RAND( ) *3000)')
})

//for posting the job   
app.post('/job', function(req, res){
    sql = "INSERT INTO jobtable(id, empid, description, maxwage, durationto, durationfrom, status, workerid) VALUES ('5959', '511', 'Need a Job', '200', '430', '530', 'Active', '11')";

    db.query(sql , (err, result)=>{
        if(err) throw err;
        console.log(result);
        res.send("Job Added Successfully");
    })
    db.query('UPDATE jobtable SET id = FLOOR( 1 + RAND( ) *3000)');
    db.query('UPDATE jobtable SET empid = FLOOR( 1 + RAND( ) *3000)');
    db.query('UPDATE jobtable SET workerid = FLOOR( 1 + RAND( ) *3000)');
})

//for posting the bid
app.post('/bid', function(req, res){
    sql = "INSERT INTO bidtable(id, bidderid, status, jobid, bidid) VALUES ('5959', '511', 'Active', '323', '434')";

    db.query(sql , (err, result)=>{
        if(err) throw err;
        console.log(result);
        res.send("Bid Data Added Successfully");
    })
    db.query('UPDATE bidtable SET id = FLOOR( 1 + RAND( ) *3000)');
    db.query('UPDATE bidtable SET bidderid = FLOOR( 1 + RAND( ) *3000)');
    db.query('UPDATE bidtable SET jobid = FLOOR( 1 + RAND( ) *3000)');
    db.query('UPDATE bidtable SET bidid = FLOOR( 1 + RAND( ) *3000)');
})

app.listen(port='1337',() =>{
    console.log("Server started on port " + port);
    
});
