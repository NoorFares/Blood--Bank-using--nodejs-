const express = require('express');
const exphbs = require('express-handlebars');
const app = express();
const port =process.env.PORT|| 8080;
const mysql=require('mysql');
const dotenv = require('dotenv');
app.use(express.urlencoded({extended: false}));
app.use(express.json());
dotenv.config({path: './.env'});
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database:'bloodbank'
  });
  db.connect(error => {
    if(error) {
      console.log(error);
    }else{
      console.log('MYSQL connected...');
    }
  });
  //creat Template using hbs
  app.use(express.static('public'))
  const handlebars = exphbs.create({ extname: '.hbs',});
  app.engine('.hbs', handlebars.engine);
  app.set('view engine', '.hbs');
  app.listen(port, 
    () =>{
         console.log(`Listening on port ${port}`)});

  