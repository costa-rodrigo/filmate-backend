module.exports = (sequelize, Datatype) => {

    const User = sequelize.define('user', {

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
        },

        password: {
            type: Datatype.STRING,
            notEmpty: true,
            allowNull: false
        }
    },
        {
            freezeTableName: true, // Model tableName will be the same as the model name
            timestamps: false,
            underscored: true
        });

    return User;
}