'use strict';
module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define("Post", {
        ownerId: { 
            type: DataTypes.INTEGER 
        },
        title: {
            type: DataTypes.STRING
        },
        text: { 
            type: DataTypes.TEXT 
        },
        imgFile: { 
            type: DataTypes.STRING 
        }
    });
    return Post;
};