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
  //récupération de tous les posts présents dans la bdd
  //console.log(post)
  sequelize.Post.findAll({
    attributes: ['id', 'content', 'title'],
})
  .then(posts => {
    console.log(posts);
    res.status(200).json(posts);
  })
  .catch(error => res.status(400).json({
    error
  }));
}

/*****  CREATE NEW POST    
========================****/
exports.newPost = (req, res, next) => {
  //console.log(req.body.imgFile)
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
        imgFile: imgUrl
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
            attributes: ['id', 'username', 'admin']
          },
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

/*****  SUPPRIMER UN POST    
============================****/
exports.deleteOnePost = (req, res, next) => {
  sequelize.Post.findOne({
      where: {id: req.params.id}})
    .then(post => {

      
      if(post.imgFile === null){
        sequelize.Post.destroy({where: {id: req.params.id}})
          .then(post => {res.status(200).json({
              message: "Post bien supprimé"
            });
          })
          .catch(error => res.status(400).json({
            error
          }));
      }else {
        const filename = post.imgFile.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
          sequelize.Post.destroy({where: {id: req.params.id}})
            .then(post => {res.status(200).json({
                message: "post bien supprimé"
              });
            })
            .catch(error => res.status(400).json({
              error
            }));
          })
      }
    })
    .catch(error => res.status(500).json({
      error
    }));
}