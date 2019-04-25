'use strict';
require('dotenv').config();
const express = require('express');
const fs      = require('fs');
const https   = require('https');
const app = express();
const bodyParser = require('body-parser');
// get the client
const mysql = require('mysql2');

// create the connection to database
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  socketPath: '/var/lib/mysql/mysql.sock'
});

passport.use(new LocalStrategy(
  (username, password, done) => {
    //Normally, select * from users where username=?
    if(username != process.env.USR && password != process.env.PWD) {
       return done(null, false);
    }
    return done(null, user);
  }
));

console.log('Alive we ride');

const sslkey  = fs.readFileSync('/etc/pki/tls/private/ca.key');
const sslcert = fs.readFileSync('/etc/pki/tls/certs/ca.crt');
const options = {
    key: sslkey,
    cert: sslcert
};

app.get('/', (req, res) => {
  if (req.secure) res.send('https :)');
  else res.send('hello not secure?');
});
app.get('/db', (req, res) => {
  // simple query
  connection.query(
    'SELECT * FROM animals ORDER BY name',
    (err, results, fields) => {
      console.log(results); // results contains rows returned by server
      console.log(fields); // fields contains extra meta data about results
      res.send(results);
    }
  );
});
app.post('/',
  bodyParser.urlencoded({extended:true}),
  (req, res) => {
  console.log(req.body);
  res.send('POST: Hello ' + req.body.name);
});
app.get('/test', (req, res) => {
  console.log(req.query);
  res.send(`Hello ${req.query.name}!`);
});

app.listen(3000); //normal http traffic
https.createServer(options, app).listen(8000); //https traffic
