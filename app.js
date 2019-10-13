const express =require("express");
const mysql = require("mysql");

//Create connection
const db = mysql.createConnection({
    host : 'localhost',
    user: 'root',
    password : '',
    database: 'ccsql'  //to use the ccsql database
});

//Connect                               
db.connect((err)=>{

    if(err){
        throw err;
    }
    console.log('Mysql connected..')

})

const app = express()

// THIS IS TO CREATE SQL TABLES
app.get('/', (req, res)=>{
        let sql1 = 'CREATE TABLE usertable(id int AUTO_INCREMENT, name VARCHAR(255), email VARCHAR(255), address VARCHAR(255), phnum int(10), paymentid VARCHAR(255), rating int(1), PRIMARY KEY(id), uid int(4))';

        db.query(sql1 , (err, result)=>{
            if(err) throw err;
            console.log(result);
            res.send("User table created created");

        })
})
app.get('/', (req, res)=>{
    let sql2 = 'CREATE TABLE jobtable(id int AUTO_INCREMENT, description VARCHAR(255), maxwage int(5), duration VARCHAR(255),workerid int(4), status VARCHAR(10), jobid int(4), PRIMARY KEY(id))';

    db.query(sql2 , (err, result)=>{
        if(err) throw err;
        console.log(result);
        res.send("Job table created created");

    })
})

app.get('/', (req, res)=>{
    let sql3 = 'CREATE TABLE bidtable(id int AUTO_INCREMENT, bidid int(4), workerid int(4),bidamount int(4), bidstatus VARCHAR(50), PRIMARY KEY(id))';

    db.query(sql3 , (err, result)=>{
        if(err) throw err;
        console.log(result);
        res.send("Bid table created created");

    })
})

// app.get('/', (req, resp)=>{
//     //about mysql
//     db.query("SELECT * FROM mySampleTable", function(error, rows, fields){
//         if(!!error){
//             console.log("Error in the query");
//         }else{
//             console.log("Successful Query");
//             console.log(rows);
//             console.log(rows[0]);
//             console.log(rows[1].Name);
//             // resp.send("This is the Name "+rows[0].Name)
//             resp.json(rows)
//         }

//     });

    
// })

app.listen(port='1337',() =>{
    console.log("Server started on port "+port);
    
});
