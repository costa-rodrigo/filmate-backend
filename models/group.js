module.exports = (sequelize, Datatype) => {

    const group = sequelize.define('group', {

        id: {
            primaryKey: true,
            autoIncrement: true,
            type: Datatype.INTEGER,
            allowNull: false
        },

        name: {
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


    // Associations
    group.associate = models => {
        group.belongsToMany(models.user, {
            foreignKey: 'user_id',
            through: 'user_has_group',
            as: 'user'
        });
    }

    return group;
}

