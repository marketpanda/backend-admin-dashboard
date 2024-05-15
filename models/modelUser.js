import { DATE, INTEGER, STRING, ARRAY } from 'sequelize'
import sequelize from '../database.js' 

const User = sequelize.define('vue_users', {
    id: {
        type: INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    firstName: {
        type: STRING,
        allowNull: false
    },
    lastName: {
        type: STRING,
        allowNull: false
    },
    email: {
        type: STRING,
        allowNull: false,
        unique: true
    },
    birthday: {
        type: DATE,
        allowNull: false
    },
    password: {
        type: STRING,
        allowNull: false
    },
    mobile: {
        type: STRING,
        allowNull: false,
    },
    favorites: {
        type: ARRAY(STRING),
        allowNull: true
    },
    trips: {
        type: ARRAY(STRING),
        allowNull: true
    },
    trips2: {
        type: ARRAY(STRING),
        allowNull: true
    }
})

// User.hasMany(Places, {
//     foreignKey: 'userId',
//     onUpdate: 'CASCADE'
// })

export default User



 