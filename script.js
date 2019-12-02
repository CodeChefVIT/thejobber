const mysql = require("mysql");

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

        let sql1 = 'CREATE TABLE usertable(id VARCHAR(40),empid int(4),bidderid int(4), workerid int(4), name VARCHAR(255), email VARCHAR(255), address VARCHAR(255), phnum int(10), paymentid VARCHAR(255), rating int(1), PRIMARY KEY(id))';

        db.query(sql1 , (err, result)=>{
            if(err) throw err;
            console.log(result);
        })

        let sql2 = 'CREATE TABLE jobtable(id VARCHAR(40), description VARCHAR(255), maxwage int(2), durationto TIME(0), durationfrom TIME(0), status VARCHAR(255), PRIMARY KEY(id),timestamp TIMESTAMP, empid varchar(40) REFERENCES usertable(id),workerid varchar(40) REFERENCES usertable(id))';
        db.query(sql2 , (err, result)=>{
            if(err) throw err;
            console.log(result);
        })


        let sql3 = 'CREATE TABLE bidtable(id VARCHAR(40),status VARCHAR(255), jobid varchar(40) REFERENCES jobtable(id),bidderid varchar(40) REFERENCES usertable(id), bidid int(4), timestamp TIMESTAMP,PRIMARY KEY(id))';
        db.query(sql3 , (err, result)=>{
            if(err) throw err;
            console.log(result);
        })


