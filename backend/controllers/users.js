const bcrypt = require('bcrypt');
const sequelize = require('../models/index.js');
const User = require('../models/User');
const db = require('../models');
const {
  DataTypes,
} = require('sequelize');

//recherche de l'utilisateur
let mailRegex = /.+@.+\..+/;
let nameRegex = /^[^=*'<>{}0-9]{3,}$/;
let passwordRegex = /^[^=*'<>{}]{5,}$/;

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
                error: "Utilisateur deja existant"
              })
            }
            //le mail n'est pas utilisé
            //vérifications des données
            /*try {
              if (req.body.username === "") throw "Veuillez renseigner un nom";
              if (!nameRegex.test(req.body.firstname)) throw "Prénom non valide (trop court ou utilise des chiffres, caractères spéciaux)";
              if (!nameRegex.test(req.body.lastname)) throw "Nom non valide (trop court ou utilise des chiffres, caractères spéciaux)";
              if (req.body.mail === "") throw "Veuillez renseigner un mail";
              if (!passwordRegex.test(req.body.mdp)) {
                throw "Le mot de passe doit contenir au moins 5 caractères et ne doit pas contenir les caractères suivants: =*'<>{}"
              }
              if (!mailRegex.test(req.body.mail)) {
                throw "Veuillez entrer une adresse mail valide";
              }
            } catch (error) {
              return res.status(400).json({
                error: error
              });
            }*/
  
            //hashage du mot de passe
            //let hash = bcrypt.hashSync(req.body.mdp, 10);
  
            //déclaration des données
            let username = req.body.username;
            let email = req.body.email;
            let mdpHash = req.body.password;
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