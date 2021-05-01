// Importation de mongoose
const mongoose = require('mongoose');
require('mongoose-type-email');
// Utilisation du plugin de mongoose pour faciliter la validation unique de l'utilisateur par son adresse email
const uniqueValidator = require('mongoose-unique-validator');
// Création du schéma utilisateur de notre api en utilisant la fonction Schema de mongoose
const userSchema = mongoose.Schema({
    username: {
      type: String,
      required: [true]
    },
    email: { 
      type: String, 
      unique: true, 
      required: [true, "Veuillez entrer votre adresse email"] 
    },
    password: { type: String, required: [true, "Veuillez entrer un mot de passe valide"] }
});


userSchema.plugin(uniqueValidator);
// Exportation du schéma sous forme de modèle
module.exports = mongoose.model('User', userSchema);