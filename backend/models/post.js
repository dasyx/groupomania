'use strict';
module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define('Post', {
        userId: {
            type: DataTypes.TEXT,
        },
        title: {
            type: DataTypes.TEXT,
        },
        text: { 
            type: DataTypes.TEXT,
        },
        /*imgFile: {
            type: DataTypes.TEXT,
        },*/
    });
    Post.associate = function (models) {
        models.Post.belongsTo(models.User,{
          onDelete: 'CASCADE',
          hooks: true
        });
    };
    return Post;
};