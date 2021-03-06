const express = require('express');
const exphbs = require('express-handlebars');
const app = express();
const port =process.env.PORT||3005;
const mysql=require('mysql');
const dotenv = require('dotenv');
const cookieSession = require('cookie-session');
app.use(express.urlencoded({extended: false}));
app.use(express.json());
dotenv.config({path: './.env'});
const  cookieParser = require('cookie-parser');
const session = require('express-session');
//when use the enviroment file env error file
/*let db= mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
  });*/
  //create the conection of DataBase(bloodbank)
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
  app.use(cookieSession({
  name: 'session',
  keys: ['key1', 'key2']
}));
//use cookiesParser
  app.use(cookieParser());
  //use session
  app.use(session({ 
    secret: '123458cat',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000 }
}));
  const routes = require('./server/routes/user');
   app.use('/', routes);

  // Server setup
   app.listen(port, 
    () =>{
         console.log(`Listening on port ${port}`)});