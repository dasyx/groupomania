const dbConfig = require("../config/database.js");
const Sequelize = require("sequelize");
const db = {};

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    
    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle
    }
});
  
// Vérification de la connexion à la db mysql
  try {
    sequelize.authenticate();
    console.log('Connexion à la base de données établie avec succès !');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
  
  db.Sequelize = Sequelize;
  db.sequelize = sequelize;
  
  db.User = require("./user.js")(sequelize, Sequelize);
  
  module.exports = db;