const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sequelize = require('../models/index.js');
const User = require('../models/User');
const db = require('../models');
const {
  DataTypes,
} = require('sequelize');

//let mailRegex = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;
//let nameRegex = /^[^=*'<>{}0-9]{3,}$/;
//let passwordRegex = /^[^=*<>{}]{8,}$/;


/*****   USER SIGNUP    
========================****/

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

/*****   USER LOGIN    
========================****/
exports.login = (req, res, next) => {

  sequelize.User.findOne({
    where: {
      email: req.body.email
    }
  })
  .then(user => {
    if (!user) {
      return res.status(401).json({
        error: "Utilisateur non trouvé"
      })
    }
    //utilisateur trouvé, comparaison des mdp
    bcrypt.compare(req.body.password, user.password)
      .then(valid => {
        if (!valid) {
          return res.status(401).json({
            error: "Password invalide"
          })
        }
        //mdp valide, envoi d'un token d'authentification
        res.status(200).json({
          userId: user.id,
          token: jwt.sign({
              userId: user.id,
            },
            'MY_SECRET_TOKEN', {
              expiresIn: '24h'
            })
        })
      })
      .catch(error => res.status(500).json({
        error: "erreur bcrypt"
      }));
  })
  .catch(error => console.log(error));
}