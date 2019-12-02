// get dependencies
var app = require('express')();
var Sequelize = require('sequelize');
 
// sequelize initialization
var sequelize = new Sequelize("mysql://e33or_assasin:spacex@localhost:5432/dbname");
 
// check database connection
var test = sequelize.authenticate()
    .then(function () {
        console.log("CONNECTED! ");
    })
    .catch(function (err) {
        console.log(err);
    })
    .done();

// initializing a port
app.listen(5000);