const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sequelize = require("../models/index.js");
const db = require("../models");

let emailRegex = /^((?!\.)[\w-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/;
//let nameRegex = /^[^=*'<>{}0-9]{3,}$/;
let passwordRegex = /^[^=*<>{}]{8,}$/;

/*****   USER SIGNUP    
========================****/

exports.signup = (req, res, next) => {
  sequelize.User.findOne({
    where: {
      username: req.body.username,
      email: req.body.email,
    },
  })
    .then((user) => {
      if (user) {
        return res.status(401).json({
          error: "Nom d'utilisateur ou adresse email déjà utilisée",
        });
      }

      // Hashage du mot de passe
      bcrypt
        .hash(req.body.password, 10)
        .then((hash) => {
          sequelize.User.create({
            username: req.body.username,
            email: req.body.email,
            password: hash,
            admin: 0, // ou req.body.admin si vous souhaitez le définir lors de l'inscription
          })
            .then((newUser) => {
              const token = jwt.sign(
                { userId: newUser.id, userAdmin: newUser.admin },
                process.env.SECRET_TOKEN,
                { expiresIn: "24h" }
              );
              res.status(201).json({
                message: "Utilisateur créé avec succès",
                userId: newUser.id,
                token: token,
                isAdmin: newUser.admin,
              });
            })
            .catch((error) => {
              res.status(500).json({
                error: "Erreur lors de la création de l'utilisateur",
              });
            });
        })
        .catch((error) => {
          res.status(500).json({
            error: "Erreur lors du hashage du mot de passe",
          });
        });
    })
    .catch((error) => {
      res.status(500).json({
        error: "Erreur lors de la recherche de l'utilisateur",
      });
    });
};

/*****   USER LOGIN    
========================****/
exports.login = (req, res, next) => {
  sequelize.User.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(401).json({
          error: "Utilisateur Introuvable",
        });
      }
      //Si l'utilisateur est trouvé, comparaison des passwords
      bcrypt
        .compare(req.body.password, user.password)
        .then((ok) => {
          if (!ok) {
            res.writeHead(401, '"Désolé, mot de passe invalide !"', {
              "content-type": "application/json",
            });
            return res.end();
          }
          //Password ok, envoi du token d'authentification
          res.status(200).json({
            userId: user.id,
            userAdmin: user.admin,
            token: jwt.sign(
              {
                userId: user.id,
                userAdmin: user.admin,
              },
              process.env.SECRET_TOKEN,
              {
                expiresIn: "24h",
              }
            ),
          });
        })
        .catch((error) =>
          res.status(500).json({
            error: "erreur",
          })
        );
    })
    .catch((error) => console.log(error));
};

/*****   AFFICHER UN UTILISATEUR    
======================================****/

exports.getOneUser = (req, res, next) => {
  sequelize.User.findOne({
    where: {
      id: req.params.id,
    },
    attributes: ["id", "username", "admin"],
  })
    .then((user) => {
      console.log(user);
      res.status(200).json(user);
    })
    .catch((error) => console.log(error));
};

/*****   MODIFIE UN UTILISATEUR (USERNAME)
======================================****/

exports.updateUsername = (req, res, next) => {
  const userId = req.params.id;
  const newUsername = req.body.username;

  sequelize.User.findOne({ where: { id: userId } })
    .then((user) => {
      if (!user) {
        return res.status(404).json({ error: "Utilisateur non trouvé" });
      }

      user.username = newUsername;
      user
        .save()
        .then(() =>
          res
            .status(200)
            .json({ message: "Nom d'utilisateur mis à jour avec succès" })
        )
        .catch((error) => res.status(400).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

/*****   RECUPERE TOUS LES UTILISATEURS   
=========================================****/

exports.getAllUsers = (req, res, next) => {
  sequelize.User.findAll({
    attributes: ["id", "username", "admin"],
  })
    .then((user) => {
      console.log(user);
      res.status(200).json(user);
    })
    .catch((error) => console.log(error));
};

/*****   SUPPRIMER UN UTILISATEUR    
===================================****/
exports.deleteUser = (req, res, next) => {
  //vérification des inputs
  try {
    if (req.body.email === "") throw "Veuillez renseigner un mail";
    if (req.body.password === "") throw "Veuillez renseigner un mot de passe";
    if (!passwordRegex.test(req.body.password)) {
      throw "Mot de passe incorrect";
    }
    if (!emailRegex.test(req.body.email)) {
      throw "Veuillez vérifier votre adresse mail";
    }
  } catch (error) {
    return res.status(400).json({
      error: error,
    });
  }
  //recherche de l'utilisateur
  sequelize.User.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(401).json({
          error: "Utilisateur non trouvé",
        });
      }
      //utlisateur est trouvé, comparaison des mots de passe
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.status(401).json({
              error: "Le mot de passe ne correspond pas",
            });
          }
          //suppression de l'utilisateur
          sequelize.User.destroy({
            where: {
              email: req.body.email,
            },
          })
            .then(() =>
              res.status(201).json({
                message: "Utilisateur bien supprimé",
              })
            )
            .catch((error) =>
              res.status(400).json({
                error: "l'utilisateur n'a pas pu être supprimé",
              })
            );
        })
        .catch((error) =>
          res.status(500).json({
            error: "erreur bcrypt",
          })
        );
    })
    .catch((error) => console.log(error));
};

/*****   SUPPRIMER UN UTILISATEUR (ADMIN AUTH)    
================================================****/
exports.deleteAccountAdmin = (req, res, next) => {
  //recherche de l'utilisateur
  sequelize.User.findOne({
    where: {
      id: req.params.id,
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(401).json({
          error: "Utilisateur non trouvé",
        });
      }
      //utlisateur est trouvé, suppression de l'utilisateur
      sequelize.User.destroy({
        where: {
          id: user.id,
        },
      })
        .then(() =>
          res.status(201).json({
            message: "L'utilisateur a été correctement supprimé",
          })
        )
        .catch((error) =>
          res.status(400).json({
            error: "L'utilisateur n'a pas pu être supprimé",
          })
        );
    })
    .catch((error) => console.log(error));
};
