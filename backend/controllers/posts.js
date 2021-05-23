const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const sequelize = require("../models/index.js");
const db = require("../models");

//const fs = require('fs');

/*****  CREATE NEW POST    
========================****/
exports.newPost = (req, res, next) => {
    //vérifications des données
    try {
      if (req.body.text === "" || req.body.text == null) throw "Veuillez renseigner un contenu";
      if (req.body.title === "" || req.body.content == null) throw "Veuillez renseigner un titre";
      if (req.body.title.length < 3) throw "Titre de 3 caractères minimum";
      if (req.body.text.length < 3) throw "Contenu de 3 caractères minimum";
      if (!textRegex.test(req.body.text)) throw "Caractères spéciaux utilisés interdits  * < > { }";
      if (!textRegex.test(req.body.title)) throw "Caractères spéciaux utilisés interdits  * < > { }"
    } catch (error) {
      return res.status(400).json({
        error: error
      });
    }
  
    //test si image, si pas d'image, imageUrl null
    let newPost = {}; let imgLink = '';
    if(req.file) { 
        imgLink = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`; }
    newPost = { 
        ownerId: req.body.ownerId, 
        title: req.body.title,
        text: req.body.text, 
        imgFile: imgLink }

    // creation d 'un nouveau post
    sequelize.Post.create(newPost)
      .then(response => res.status(200).json({
        message: "Le Post a correctement été crée"
      }))
      .catch(error => res.status(400).json({
        error: "Une erreur est survenue lors de la création du Post"
      }));
  }