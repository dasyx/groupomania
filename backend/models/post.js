module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define("Post", {
        title: {
            type: DataTypes.STRING,
        },
        content: {
            type: DataTypes.STRING,
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
    };
    return Post;
};