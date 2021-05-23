const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sequelize = require("../models/index.js");
const db = require("../models");


/*****  CREATE NEW POST    
========================****/
exports.newPost = (req, res, next) => {
    //vérifications des données
    try {
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
    }
  
    //test si image, si pas d'image, imageUrl null
    let imageUrl = null;
    if (req.file) {
      imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    }
  // console.log(imageUrl);
    // creation d 'un nouveau post
    sequelize.Post.create({
        UserId: req.body.UserId,
        title: req.body.title,
        content: req.body.content,
        // url_image: req.body.url_image
        url_image: imageUrl
      })
      .then(response => res.status(200).json({
        message: "Post bien crée"
      }))
      .catch(error => res.status(400).json({
        error: "Ce post n'a pas pu être crée"
      }));
  }