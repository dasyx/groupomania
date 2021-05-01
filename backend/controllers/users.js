const bcrypt = require('bcrypt');
//const jwt = require('jsonwebtoken');
const User = require('../models/user');

exports.signup = (req, res, next) => {
    // On appelle la méthode hash de bcrypt qui sera la fonction de cryptage de mot de passe
    // On va lui passer le mdp du corps de la requête passé par le frontend
    // le "salt" correspond de fois on execute l'algorythme de hashage, soit 10 fois ici
    bcrypt.hash(req.body.password, 10)
      .then(hash => {
        // Création du nouvel utilisateur
        const user = new User({
          username: req.body.username,
          email: req.body.email,
          password: hash
        });
        // Enregistrement de l'utilisateur dans la base de données
        user.save()
          .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
          .catch(error => res.status(400).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
};