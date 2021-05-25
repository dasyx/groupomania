'use strict';
module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define("Post", {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false
        },
        imgFile: {
            type: DataTypes.TEXT,
        },
    })
    Post.associate = function (models) {
        models.Post.belongsTo(models.User,{
            onDelete: 'CASCADE',
             hooks: true
        });
        models.Post.hasMany(models.Comment, {
            onDelete: 'CASCADE'
          });
    };
    return Post;
};