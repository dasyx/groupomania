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
        error: "Utilisateur Introuvable"
      })
    }
    //utilisateur trouvé, comparaison des mdp
    bcrypt.compare(req.body.password, user.password)
      .then(valid => {
        if (!valid) {
          return res.status(401).json({
            error: "Mot de passe non valide"
          })
        }
        //mdp valide, envoi d'un token d'authentification
        res.status(200).json({
          userId: user.id,
          userAdmin: user.admin,
          token: jwt.sign({
              userId: user.id,
              userAdmin: user.admin,
            },
            process.env.SECRET_TOKEN, {
              expiresIn: '24h'
            })
        })
      })
      .catch(error => res.status(500).json({
        error: "erreur"
      }));
  })
  .catch(error => console.log(error));
}


/*****   AFFICHER UN UTILISATEUR    
======================================****/

exports.getOneUser = (req, res, next) => {
  sequelize.User.findOne({
      where: {
        id: req.params.id
      },
      attributes: ["id", "username", "admin"]
    })
    .then(user => {
      console.log(user);
      res.status(200).json(user);
    })
    .catch(error => console.log(error));
}


/*****   MODIFIER UN UTILISATEUR    
===================================****/
exports.modifyUser = (req, res, next) => {
  const userObject = req.file ?
      {
          ...req.body.userId,
          imgProfile: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
      } : { ... req.body}
  User.update({ ...userObject, id:  req.params.id}, { where: { id: req.params.id }})
    .then(() => res.status(200).json({ ...userObject }))
    .catch(error => res.status(400).json({ error }))
}
