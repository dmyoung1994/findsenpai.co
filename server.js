var express = require('express');
var mysql = require('mysql');
var app = express();

var conn = mysql.createPool({
  connectionLimit : 10,
  host: 'localhost',
  user: 'dmyoung',
  password: 'Dani3l',
  database: 'findsenpai'
});

function buildUsers(rows) {
  var users = [];
  for (var idx in rows) {
    row = rows[idx];
    var user = {};
    user['name'] = row.name;
    user['score'] = row.score;
    user['id'] = row.id;
    users.push(user);
  }
  return users;
}

app.use(express.static('public'));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.get('/users', function(req, res) {
  var users = [];
  conn.query('select * from users order by score desc limit 20', function(err, rows, fields) {
    if (!err) {
      users = buildUsers(rows);
      res.send(JSON.stringify(users));
    } else {
      console.log(err);
    }
  });
});

app.get('/save', function(req, res) {
  var name = req.query.name;
  var score = req.query.score;
  var id = req.query.id;

  if (id) {
    var query = 'update users set score = ? where name = ? and id = ?';
    query = mysql.format(query, [score, name, id]);
    conn.query(query, function(err, rows, fields) {
      if (err) {
        console.log(err);
      }
    });
  } else {
    var query = 'insert into users (score, name) values (?, ?)';
    query = mysql.format(query, [score, name]);
    conn.query(query, function(err, rows, fields) {
      if (err) {
        throw err;
        console.log(err);
      }
    });
  }

  conn.query('select * from users', function(err, rows, fields) {
    if (!err) {
      users = buildUsers(rows);
      res.send(JSON.stringify(users));
    } else {
      console.log(err);
    }
  });
});

var server = app.listen(8080);
