const dbConfig = require("../config/database.js");
const Sequelize = require("sequelize");

const db = {};

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    logging: false,
    
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
  
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

  db.Sequelize = Sequelize;
  db.sequelize = sequelize;
  
  db.User = require("./user.js")(sequelize, Sequelize);
  db.Post = require("./post.js")(sequelize, Sequelize);
  
  module.exports = db;