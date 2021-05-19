module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
        username: {
          type: DataTypes.STRING,
          allowNull: false
        },
        firstname: {
          type: DataTypes.STRING,
          allowNull: true
        },
        lastname: {
          type: DataTypes.STRING,
          allowNull: true
        },
        bio: {
          type: DataTypes.STRING,
          allowNull: true
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
        },
        imageUrl: {
          type: DataTypes.STRING,
          allowNull: true,
        }
    });

    return User;
    
  };