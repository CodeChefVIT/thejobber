const mysql = require("mysql");

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

//First
const firstTable=()=>{
    return new Promise((resolve,reject)=>{
        let sql1 = 'CREATE TABLE usertable(id VARCHAR(40), name VARCHAR(255),password CHAR(255), email VARCHAR(255), address VARCHAR(255), phnum VARCHAR(10), paymentid VARCHAR(255), rating int(1), PRIMARY KEY(id))';

        db.query(sql1 , (err, result)=>{
            if(err) reject(err);
            resolve("User Table Created")
        })

    })
}
//Second
const secondTable=()=>{
    return new Promise((resolve,reject)=>{
        let sql2 = 'CREATE TABLE jobtable(id VARCHAR(40), description VARCHAR(255), maxwage int(2), durationto TIME(0), durationfrom TIME(0), status VARCHAR(255), PRIMARY KEY(id),timestamp TIMESTAMP,workerid VARCHAR(40), FOREIGN KEY (workerid) REFERENCES usertable(id),empid VARCHAR(40),FOREIGN KEY (empid) REFERENCES usertable(id))';
        db.query(sql2 , (err, result)=>{
            if(err) reject(err);
            resolve("Job Table Created");
        })
    })
} 
//Third
const thirdTable=()=>{
    return new Promise((resolve,reject)=>{
        let sql3 = 'CREATE TABLE bidtable(id VARCHAR(40),status VARCHAR(255),jobid VARCHAR(40), FOREIGN KEY (jobid) REFERENCES jobtable(id),bidderid VARCHAR(40),FOREIGN KEY (bidderid) REFERENCES usertable(id), duration VARCHAR(5),PRIMARY KEY(id))';
        db.query(sql3 , (err, result)=>{
            if(err) throw err;
            resolve("Bid Table Created");
            // console.log(result);
        })
        })
}

firstTable().then(res1=>{
    console.log(res1);
    secondTable().then(res2=>{
        console.log(res2)
        thirdTable().then(res3=>{
            console.log("Bid Table Created");
        }).catch((err)=>{
            console.log("Error in Bid table.")
        })
    }).catch((err)=>{
        console.log("Error in Job table.")
    })
}).catch(err=>{
    console.log("Error in User table.")
})
