import {  ARRAY, INTEGER, STRING, TEXT, GEOMETRY } from 'sequelize'
import sequelize from '../database.js'
import User from './modelUser.js'



const Places = sequelize.define('vue_places', {
    id: {
        type: INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    userId: {
        type: INTEGER,
        allowNull: false 
    },
    name: {
        type: STRING,
        allowNull: false
    },
    address: {
        type: STRING,
        allowNull: false
    }, 
    type: {
        type: STRING,
        allowNull: true
    },
    location: {
        type: STRING,
        allowNull: true
    },
    cityProvince: {
        type: STRING,
        allowNull: true
    },
    cityId: {
        type: INTEGER,
        allowNull: true
    },
    description: {
        type: TEXT('long'),
        allowNull: true
    },
    email: {
        type: STRING,
        allowNull: true
    }, 
    landmark: {
        type: STRING,
        allowNull: true
    },
    mustTry: {
        type: STRING,
        allowNull: true
    },
    role: {
        type: STRING,
        allowNull: true
    }, 
    img: {
        type: STRING,
        allowNull: true
    }, 
    imgs: {
        type: ARRAY(STRING),
        allowNull: true
    }, 
    coords: {
        type: STRING,
        allowNull: true
    }, 
    coordsSpatial:  {
        type: GEOMETRY('POINT'),
        allowNull: true
    }, 
    contactNumber: {
        type: STRING,
        allowNull: true
    }  

   
})

// Places.belongsTo(User, {
//     foreignKey: 'userId',
//     onUpdate:'CASCADE'
// })



export default Places



