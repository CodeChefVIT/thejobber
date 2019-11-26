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

        let sql1 = 'CREATE TABLE usertable(id int AUTO_INCREMENT,empid int(4),bidderid int(4), workerid int(4), name VARCHAR(255), email VARCHAR(255), address VARCHAR(255), phnum int(10), paymentid VARCHAR(255), rating int(1), PRIMARY KEY(id), uid int(4),ADD FOREIGN KEY(empid) REFERENCES jobtable(empid),ADD FOREIGN KEY(bidderid) REFERENCES bidtable(bidderid),ADD FOREIGN KEY(workerid) REFERENCES jobtable(workerid))';

        db.query(sql1 , (err, result)=>{
            if(err) throw err;
            console.log(result);
        })

        let sql2 = 'CREATE TABLE jobtable(id int AUTO_INCREMENT, empid int(4),jobid int(4), description VARCHAR(255), maxwage int(2), durationto VARCHAR(2), durationfrom VARCHAR(2), status VARCHAR(255), workerid int(4), PRIMARY KEY(id),ADD FOREIGN KEY(jobid) REFERENCES bidtable(jobid))';
        db.query(sql2 , (err, result)=>{
            if(err) throw err;
            console.log(result);
        })


        let sql3 = 'CREATE TABLE bidtable(id int AUTO_INCREMENT, bidderid int(4),status VARCHAR(255), jobid int(4), bidid int(4), PRIMARY KEY(id))';
        db.query(sql3 , (err, result)=>{
            if(err) throw err;
            console.log(result);
        })


// //for dele0ting table
// app.get('/delete', (req, res)=>{
//     var sql = "DROP DATABASE ccsqlnew";
//     db.query(sql, (err, result)=>{
//         if (err) throw err;
//         console.log('database deleted');
//     })
// })


