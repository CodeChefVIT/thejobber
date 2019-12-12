const express =require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const app = express();
const uuidv4 = require('uuid/v4');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Create connection
const db = mysql.createConnection({
    host : 'localhost',
    user: 'root',
    password : '',
    database: 'test1'  //to use the ccsql database
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
    
        //jwt middleware
        const user ={
            id:1,
            username:'e33or_assasin',
            email :'jdoe@gmail.com',
        }
    
        jwt.sign({user:user}, { expiresIn: '120s' },'secretkey', (err, token) => {
    
            res.json({
                    token:token
            })
        })
    
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
        if(err) console.log({message:"Error",status:401})
        console.log(result);
        console.log({message:"Signup Successful",status:200});
    })
})
})

//for login
app.post('/user/login', (req,res)=>{


    //jwt middleware
    const user ={
        id:1,
        username:'e33or_assasin',
        email :'jdoe@gmail.com',
    }

    jwt.sign({user:user}, { expiresIn: '120s' },'secretkey', (err, token) => {

        res.json({
                token:token
        })
    })

    var email = req.body.email;
    var password = req.body.password;

    sql="SELECT email FROM usertable WHERE email= ?";

    db.query(sql,[email],(err, result)=>{
        if(err) throw err;
        // console.log(result[0]);
        if(result[0] == null){  
            console.log("User not registered.");
        }else if(result[0] != null){
            console.log("Login Successful.");
        }
    })
    
})


//for posting the job
app.post('/job', verifyToken ,(req, res)=>{

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
        console.log("Job Added Successfully");
    })
    
    jwt.verify(req.token, 'secretkey', (err, authData)=>{

        if (err){
            res.sendStatus(403);
        }else{
                res.json({
                    message:'Job Data added',
                    // authData
                })   
        }
    })

})

//for posting the bid
app.post('/bid', verifyToken ,(req, res)=>{

    var id = uuidv4();
    var status = req.body.status;
    var duration = req.body.timest;

    sql = "INSERT INTO bidtable(id, status, duration) VALUES (?,?,?)";

    db.query(sql,[id, status,duration], (err, result)=>{
        if(err) throw err;
        console.log(result);
        console.log("Bid Data Added Successfully");
    })

    jwt.verify(req.token, 'secretkey', (err, authData)=>{

        if (err){
            res.sendStatus(403);
        }else{
                res.json({
                    message:'Bid Data added',
                    // authData
                })   
        }
    })
})

//tokenverification
function verifyToken(req, res, next){

    //get auth header
    const authHeader = req.headers['authorization'];

    if(typeof authHeader !== 'undefined'){

        const bearer = authHeader.split(' ');
        const bearerToken = bearer[1];
        req.token = bearerToken;
        
        next();
    }else{
        res.sendStatus(403);
    }

}

app.listen(port='1337',() =>{
    console.log("Server started on port " + port); 
});
