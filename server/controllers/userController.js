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
  // Find blood Type by Search
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
  exports.form = (req, res) => {
    res.render('add-user.hbs');
  }
  exports.create = (req, res) => {
    const { name, blood_type, email, phone, address } = req.body;
    let searchTerm = req.body.search;
    // User the connection
    connection.query('INSERT INTO user SET name = ?, blood_type = ?, email = ?, phone = ?, address = ?', [name, blood_type, email, phone, address], (err, rows) => {
      if (!err) {
        res.render('add-user.hbs', { alert: `${name} added successfully.` });
      } else {
        console.log(err);
      }
      console.log('The data from user table: \n', rows);
    });
  }
 

// View Donor
exports.viewall = (req, res) => {

  // User the connection
  connection.query('SELECT * FROM user WHERE id = ?', [req.params.id], (err, rows) => {
    if (!err) {
      res.render('view-user', { rows });
    } else {
      console.log(err);
    }
    console.log('The data from user table: \n', rows);
  });

}
// Edit Donor
exports.edit = (req, res) => {
  // User the connection
  connection.query('SELECT * FROM user WHERE id = ?', [req.params.id], (err, rows) => {
    if (!err) {
      res.render('edit-user.hbs', { rows });
    } else {
      console.log(err);
    }
    console.log('The data from user table: \n', rows);
  });
}

 // Update donor
 exports.update = (req, res) => {
  const { name, blood_type, email, phone, address } = req.body;
  // User the connection
  connection.query('UPDATE user SET  name = ?, blood_type = ?, email = ?, phone = ?, address = ? WHERE id = ?', [name, blood_type, email, phone,address, req.params.id], (err, rows) => {
    if (!err) {
      // User the connection
      connection.query('SELECT * FROM user WHERE id = ?', [req.params.id], (err, rows) => {
        // When done with the connection, release it
        if (!err) {
          res.render('edit-user.hbs', { rows, alert: `${name} has been updated.` });
        } else {
          
          console.log(err);
        }
        console.log('The data from user table: \n', rows);
      });
    } else {
      console.log(err);
    }
    console.log('The data from user table: \n', rows);
  });
}