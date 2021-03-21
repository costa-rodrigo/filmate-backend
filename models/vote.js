module.exports = (sequelize, Datatype) => {

    const vote = sequelize.define('vote', {

        vote_1: {
            type: Datatype.BOOLEAN,
            allowNull: false
        },

        vote_2: {
            type: Datatype.BOOLEAN,
            allowNull: false
        },

        vote_3: {
            type: Datatype.BOOLEAN,
            allowNull: false
        },

        vote_4: {
            type: Datatype.BOOLEAN,
            allowNull: false
        },

        vote_5: {
            type: Datatype.BOOLEAN,
            allowNull: false
        },

        vote_6: {
            type: Datatype.BOOLEAN,
            allowNull: false
        },

        vote_7: {
            type: Datatype.BOOLEAN,
            allowNull: false
        },

        vote_8: {
            type: Datatype.BOOLEAN,
            allowNull: false
        },

        vote_9: {
            type: Datatype.BOOLEAN,
            allowNull: false
        },

        vote_10: {
            type: Datatype.BOOLEAN,
            allowNull: false
        },

    },
        {
            freezeTableName: true, // tableName will be the same as the model name
            timestamps: false,
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

