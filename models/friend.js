module.exports = (sequelize, Datatype) => {

    const friend = sequelize.define('friend', {

        id: {
            primaryKey: true,
            autoIncrement: true,
            type: Datatype.INTEGER,
            allowNull: false
        },

        user_id: {
            type: Datatype.INTEGER,
            allowNull: false
        },

        friend_id: {
            type: Datatype.INTEGER,
            allowNull: false
        },

        friend_name: {
            type: Datatype.STRING,
            allowNull: false
        },
        friend_email: {
            type: Datatype.STRING,
            notEmpty: true,
            allowNull: false
        }

    },
        {
            freezeTableName: true, // tableName will be the same as the model name
            timestamps: false,
            underscored: true
        });

    // friend.associate = models => {
    //     friend.belongsTo(models.user, {
    //         foreignKey: 'user_id'
    //     });
    // }

    return friend;
}

