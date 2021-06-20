var mysql = require('mysql');
var config = require('./db.json');

var db = mysql.createConnection({
    host: config["db_host"],
    user: config["db_user"],
    password: config["db_pass"],
    database: config["db_name"]
});

db.connect(function(err) {
    if(err) throw err;
})

function query(sql){
    return new Promise(resolve => db.query(sql, function(err, result){
        if (err) {
            console.error(err);
            resolve(null);
        } 

        resolve(result);
    }));
}

module.exports = {query}