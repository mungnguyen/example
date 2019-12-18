module.exports = function (sequelize, DataTypes) {
    const groupMember = sequelize.define('groupMember', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        userId: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        isAdmin: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            default: false
        }
    },
        {
            timestamps: false
        });

    return groupMember;
}