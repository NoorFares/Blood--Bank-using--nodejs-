const express = require('express');
const exphbs = require('express-handlebars');
const app = express();
const port =process.env.PORT||3000;
const mysql=require('mysql');
const dotenv = require('dotenv');
app.use(express.urlencoded({extended: false}));
app.use(express.json());
dotenv.config({path: './.env'});