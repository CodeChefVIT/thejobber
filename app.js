const express =require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const app = express();
const uuidv4 = require('uuid/v4');
const bcrypt = require('bcrypt');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Create connection
const db = mysql.createConnection({
    host : 'localhost',
    user: 'root',
    password : '',
    database: 'ccsql1'  //to use the ccsql database
});

//Connect                               
db.connect((err)=>{

    if(err){
        throw err;
    }
    console.log('Mysql connected..')

})
// for sign in
app.post('/user/signup', (req, res)=>{

    var id = uuidv4();
    var name = req.body.name;
    var email= req.body.email;
    var address = req.body.address;
    var phnum = req.body.phnum;
    var paymentid = req.body.payid;
    var rating = req.body.rating;

   bcrypt.hash(req.body.password, 3, function(err, hash){
        if (err) throw err;
    
    sql = "INSERT INTO usertable(id,name,password,email,address,phnum,paymentid,rating) VALUES(?,?,?,?,?,?,?,?)";

    db.query(sql,[id,name,hash,email,address,phnum,paymentid,rating],(err, result)=>{
        if(err) throw err;
        console.log(result);
        res.send("Signup Successful");
    })
})

})

//for posting the job
app.post('/job', (req, res)=>{

    var id = uuidv4();
    var description= req.body.desc;
    var maxwage = req.body.max;
    var durationto = req.body.durto;
    var durationfrom = req.body.durfrom;
    var status = req.body.status;
    sql = "INSERT INTO jobtable(id, description, maxwage, durationto, durationfrom, status) VALUES (?,?,?,?,?,?)";

    db.query(sql,[id, description,maxwage,durationto,durationfrom,status] ,(err, result)=>{
        if(err) throw err;
        console.log(result);
        res.send("Job Added Successfully");
    })
})

//for posting the bid
app.post('/bid', (req, res)=>{

    var id = uuidv4();
    var status = req.body.status;
    var duration = req.body.timest;

    sql = "INSERT INTO bidtable(id, status, duration) VALUES (?,?,?)";

    db.query(sql,[id, status,duration], (err, result)=>{
        if(err) throw err;
        console.log(result);
        res.send("Bid Data Added Successfully");
    })
})

app.listen(port='1337',() =>{
    console.log("Server started on port " + port); 
});
