const bcrypt = require('bcrypt');
const sequelize = require('../models/index.js');
const User = require('../models/User');
const db = require('../models');
const {
  DataTypes,
} = require('sequelize');

//recherche de l'utilisateur
let mailRegex = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;
let nameRegex = /^[^=*'<>{}0-9]{3,}$/;
let passwordRegex = /^[^=*<>{}]{8,}$/;

exports.signup = (req, res, next) => {
    db.sequelize.sync()
      .then(() => {
        sequelize.User.findOne({
            where: {
              email: req.body.email,
            }
          })
          .then((user) => {
            if (user) {
              return res.status(401).json({
                error: "Utilisateur déjà créé ou adresse email déjà utilisée !"
              })
            }
            //le mail n'est pas utilisé
            //vérifications des données
            try {
              if (req.body.username === "") throw "Veuillez renseigner un nom";
              if (req.body.email === "") throw "Veuillez renseigner un mail";
              if (!nameRegex.test(req.body.username)) {
                throw "Le nom d'utlisateur doit contenir au moins 3 caractères, les caractères suivants ne sont pas autorisés : ^=*<>{}"
              }
              if (!passwordRegex.test(req.body.mdpHash)) {
                throw "Le mot de passe doit contenir au moins 8 caractères et ne doit pas contenir les caractères suivants: ^=*<>{}"
              }
              if (!mailRegex.test(req.body.email)) {
                throw "Veuillez entrer une adresse mail valide";
              }
            } catch (error) {
              return res.status(400).json({
                error: error
              });
            }
  
            //hashage du mot de passe
            let hash = bcrypt.hashSync(req.body.password, 10);
  
            //déclaration des données
            let username = req.body.username;
            let email = req.body.email;
            let mdpHash = hash;
            //let admin = 0;
  
            //création de l'utilisateur
            if (req.body.username !== "" && req.body.email !== "") {
              console.log('database connected...');
              sequelize.User.create({
                  username: username,
                  email: email,
                  password: mdpHash,
                  //admin: admin
                })
                .then(() => res.status(201).json({
                  message: "Utilisateur bien crée"
                }))
                .catch(error => console.log("erreur"));
            } else {
              return res.status(400).json({
                message: "champs vide !"
              });
            }
  
          })
          /*.catch(error => res.status(500).json({
            error
          }));*/
      })
      .catch(error => console.log(error));
  }