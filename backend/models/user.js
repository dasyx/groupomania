module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
      username: {
        type: DataTypes.TEXT
      },
      email: {
        type: DataTypes.TEXT
      },
      password: {
        type: DataTypes.TEXT
      },
      admin: {
        type: DataTypes.INTEGER
      }
    });
  
    return User;
  };