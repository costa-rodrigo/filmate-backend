module.exports = (sequelize, Datatype) => {

    const vote = sequelize.define('vote', {

        vote_1: {
            type: Datatype.STRING,
            allowNull: true,
        },

        vote_2: {
            type: Datatype.STRING,
            allowNull: true
        },

        vote_3: {
            type: Datatype.STRING,
            allowNull: true
        },

        vote_4: {
            type: Datatype.STRING,
            allowNull: true
        },

        vote_5: {
            type: Datatype.STRING,
            allowNull: true
        },

        vote_6: {
            type: Datatype.STRING,
            allowNull: true
        },

        vote_7: {
            type: Datatype.STRING,
            allowNull: true
        },

        vote_8: {
            type: Datatype.STRING,
            allowNull: true
        },

        vote_9: {
            type: Datatype.STRING,
            allowNull: true
        },

        vote_10: {
            type: Datatype.STRING,
            allowNull: true
        },

    },
        {
            freezeTableName: true, // tableName will be the same as the model name
            timestamps: true,
            underscored: true
        });


    // Associations
    vote.associate = models => {
        vote.belongsTo(models.session, {
            foreignKey: 'session_id'
        });
        vote.belongsTo(models.user, {
            foreignKey: 'user_id'
        });
    }

    return vote;
}

