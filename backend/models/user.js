module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
        username: {
          type: DataTypes.STRING,
          allowNull: false
        },
        email: {
          type: DataTypes.STRING,
          unique: true,
          allowNull: false
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false
        },
        admin: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false
        }
    });
  
    return User;
  };