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