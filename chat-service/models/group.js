module.exports = function (sequelize, DataTypes) {
    const group = sequelize.define('group', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isIn: [["project", "procedural", "recurrent", "department"]]
            }
        },
        projectId: {
            type: DataTypes.STRING,
            defaultValue: null
        },
        proceduralId: {
            type: DataTypes.INTEGER,
            defaultValue: null
        },
        recurrentId: {
            type: DataTypes.STRING,
            defaultValue: null
        },
        departmentId: {
            type: DataTypes.STRING,
            defaultValue: null
        }
    },
        {
            timestamps: false
        });

    return group;
}