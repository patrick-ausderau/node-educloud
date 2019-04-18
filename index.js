'use strict';
require('dotenv').config();
const express = require('express');
const fs      = require('fs');
const https   = require('https');
const app = express();
const bodyParser = require('body-parser');

console.log('Alive we ride');

const sslkey  = fs.readFileSync('/etc/pki/tls/private/ca.key');
const sslcert = fs.readFileSync('/etc/pki/tls/certs/ca.crt');
const options = {
    key: sslkey,
    cert: sslcert
};

app.get('/', (req, res) => {
  res.send('Hello');
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
