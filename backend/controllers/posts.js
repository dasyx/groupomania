const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sequelize = require("../models/index.js");
const db = require("../models");

//const fs = require('fs');

/*****  CREATE NEW POST    
========================****/
exports.newPost = (req, res, next) => {
  //console.log(req.body.title)
    //vérifications des données
    /*try {
      if (req.body.text === "" || req.body.text == null) throw "Veuillez renseigner un contenu";
      if (req.body.title === "" || req.body.text == null) throw "Veuillez renseigner un titre";
      if (req.body.title.length < 3) throw "Titre de 3 caractères minimum";
      if (req.body.text.length < 3) throw "Contenu de 3 caractères minimum";
      if (!textRegex.test(req.body.text)) throw "Caractères spéciaux utilisés interdits  * < > { }";
      if (!textRegex.test(req.body.title)) throw "Caractères spéciaux utilisés interdits  * < > { }"
    } catch (error) {
      return res.status(400).json({
        error: error
      });
    }*/

    //test si image, si pas d'image, imageUrl null
  let imgUrl = null;
  if (req.file) {
    imgUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  }
      // creation d 'un nouveau post
    sequelize.Post.create({
        userId: req.body.userId,
        title: req.body.title,
        text: req.body.text,
        //imgFile: imgUrl
      })
    // creation d 'un nouveau post
      .then(response => res.status(200).json({
        message: "Le Post a correctement été crée"
      }))
      .catch(error => res.status(400).json({
        error: "Une erreur est survenue lors de la création du Post"
      }));
  }
/*****  GET ALL POSTS    
===========================****/
exports.getAllPosts = (req, res, next) => {
  //récupération de tous les posts présents dans la bdd
  sequelize.Post.findAll({
      include: [{
          model: sequelize.User,
          attributes: ["username", "admin"]
        },
      ],
      order: [
        ['createdAt', 'DESC']
      ]
    })
    .then(posts => {
      console.log(posts);
      res.status(200).json(posts);
    })
    .catch(error => res.status(400).json({
      error
    }));
}