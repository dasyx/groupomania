var mysql = require('mysql');
  
console.log('Get connection ...');

// création de la connexion à la groupomania.sql(db)
var connectdb = mysql.createConnection({
  database: 'grp7',
  host: 'localhost',
  user: 'root',
  password: ''
});

// connexion :
connectdb.connect(function() {
  //if (err) throw err;
  console.log("Vous êtes connecté!");
});
 
module.exports = connectdb;