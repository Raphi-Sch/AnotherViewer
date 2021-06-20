const fs = require('fs')
const mysql = require('mysql2');
const config = getConfig();

const db = mysql.createConnection({
    host: config["db_host"],
    user: config["db_user"],
    password: config["db_pass"],
    database: config["db_name"]
});

db.connect(function (err) {
    if (err) throw err;
})

function query(sql, data) {
  return new Promise(resolve => db.query(sql, data, function (err, result) {
    if (err) {
      console.error(err);
      resolve(null);
    }
    resolve(result);
  }));
}

module.exports = {query}

function getConfig() {
  let config = require('./db.json');
  try {
    if (fs.existsSync('./db2.json')) {
      config = require('./db2.json');
    }
  } catch (err) {
    console.error(err)
  }
  return config;
}
