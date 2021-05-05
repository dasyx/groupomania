const bcrypt = require('bcrypt');
//const jwt = require('jsonwebtoken');
//const mysql = require('mysql');

// Connexion à la base de données
//const dbconnect = require('../config/database');

exports.signup = (req, res, next) => {
  let username = req.body.username;
  let email = req.body.email;
  let password = req.body.password;

      let sqlAdd = [username, email, password];
      //let sql = "INSERT INTO users VALUES (NULL, ?, ?, ?, 0)"
      //sql =  mysql.format(sql, username, email, password);
      //Promesse de connexion à la DB :
      new Promise((resolve, reject) => {
        //dbconnect.query( (err) => {
          //  if (err) reject({err})
           resolve({sqlAdd})
        })
    .then(response => res.status(201).json({ response }))
    .catch(error => res.status(400).json({ error }));
};