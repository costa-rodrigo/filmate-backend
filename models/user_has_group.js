module.exports = (sequelize, Datatype) => {

    const user_has_group = sequelize.define('user_has_group', {
        is_owner: {
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

    // Associations => N:M relationship

    user_has_group.associate = (models) => {
        user_has_group.belongsTo(models.user)
        user_has_group.belongsTo(models.group)
    };

    return user_has_group;
}

