const mysql = require('mysql');
const dotenv=require('dotenv');
const path=require('path');
dotenv.config({path:'./.env'});
// Connection Pool
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password:'',
  database: 'bloodbank'
});
connection.connect(error => {
    if(error) {
      console.log(error);
    }else{
      console.log('MYSQL connected of table user..*!');
    }
  });
  //View Donrs
exports.view = (req, res) => {
    // Donrs  the connection
    connection.query('SELECT * FROM user WHERE status = "active"', (err, rows) => {
      // When done with the connection, release it
      if (!err) {
        let removedUser = req.query.removed;
        res.render('home.hbs', { rows, removedUser });
      } else {
        console.log(err);
      }
      console.log('The data from user table: \n', rows);
    });
  }
  // Find User by Search
  exports.find = (req, res) => {
    let searchTerm = req.body.search;
    // User the connection
    connection.query('SELECT * FROM user WHERE  blood_type LIKE ?', [ searchTerm ], (err, rows) => {
      if (!err) {
        res.render('home.hbs', { rows });
      } else {
        console.log(err);
      }
      console.log('The data from user table: \n', rows);
    });
  }