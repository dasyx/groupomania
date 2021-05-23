'use strict';
module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define("Post", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        ownerId: { 
            type: DataTypes.INTEGER },
        text: { 
            type: DataTypes.TEXT },
        imgFile: { 
            type: DataTypes.STRING }
    });
    return Post;
};