var express = require('express');
var app = express();
var mysql = require('mysql');
var bodyParser = require('body-parser');

var connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'vagrant',
  database: 'express-test'
});

app.use(bodyParser.urlencoded());

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('Database connect success');
});

app.get('/', function (req, res){
  res.sendfile('index.html');
});

app.route('/todo')
  .get(function (req, res){
    var sql = "SELECT * FROM todo";
    connection.query(sql, function (err, results){
      res.send(results);
    });
  })
  .post(function (req, res){
    var params = req.body;
    var sql  = "INSERT INTO todo (content, createtime) VALUES(?, ?)";
    var values = [params.content, null];
    sql = mysql.format(sql, values);
    connection.query(sql, function (err, results){
      res.send('success');
    });
  });

app.listen(3000, function (){
  console.log('Example app listening on port 3000!');
});