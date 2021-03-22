module.exports = (sequelize, Datatype) => {

    const session = sequelize.define('session', {

        id: {
            primaryKey: true,
            autoIncrement: true,
            type: Datatype.INTEGER,
            allowNull: false
        },
        isClosed: {
            type: Datatype.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    },
        {
            freezeTableName: true, // tableName will be the same as the model name
            timestamps: false,
            underscored: true
        });


    // Associations
    session.associate = models => {

        session.belongsTo(models.group, {
            foreignKey: 'group_id'
        });

        session.hasMany(models.vote);
    }

    return session;
}

