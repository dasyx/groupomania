const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sequelize = require("../models/index.js");
const db = require("../models");
const Post = require('../models/Post');
const User = require('../models/User');

//const fs = require('fs');

let textRegex = /^[^=*<>{}]+$/;


/*****  GET ALL POSTS    
===========================****/
exports.getAllPosts = (req, res, next) => {
  //console.log(req)
  //récupération de tous les posts présents dans la bdd
   sequelize.Post.findAll({
      include: [{
          model: sequelize.User,
          attributes: ["username", "admin"]
        },
        {
          model: sequelize.Comment
        }
      ],
      order: [
        ['createdAt', 'DESC']
      ]
    })
    .then(post => {
      console.log(post);
      res.status(200).json(post);
    })
    .catch(error => res.status(400).json({
      error
    }));
}

/*****  CREATE NEW POST    
========================****/
exports.newPost = (req, res, next) => {
  console.log(req.body.imgFile)
    //vérifications des données
    /*try {
      if (req.body.content === "" || req.body.content == null) throw "Veuillez renseigner un contenu";
      if (req.body.title === "" || req.body.content == null) throw "Veuillez renseigner un titre";
      if (req.body.title.length < 3) throw "Titre de 3 caractères minimum";
      if (req.body.content.length < 3) throw "Contenu de 3 caractères minimum";
      if (!textRegex.test(req.body.content)) throw "Caractères spéciaux utilisés interdits  * < > { }";
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
        UserId: req.body.UserId,
        title: req.body.title,
        content: req.body.content,
        imgFile: req.body.imgUrl
      })
    // creation d 'un nouveau post
      .then(response => res.status(201).json({
        message: "Le Post a correctement été crée"
      }))
      .catch(error => res.status(400).json({
        error: "Une erreur est survenue lors de la création du Post"
      }));
  }

/*****  GET ONE POST    
============================****/
  exports.getOnePost = (req, res, next) => {
    //récupération d'un post avec ses commentaires
    sequelize.Post.findOne({
        where: {
          id: req.params.id
        },
        include: [{
            model: sequelize.User,
            attributes: ["username"]
          },
          {
            model: sequelize.Comment,
            include: [{
              model: sequelize.User,
              attributes: ["username", "id"]
            }]
          }
        ],
      })
      .then(post => {
        console.log(post);
        res.status(200).json(post);
      })
      .catch(error => res.status(400).json({
        error
      }));
  }