import { BOOLEAN, INTEGER, JSON, STRING, TEXT } from 'sequelize'
import sequelize from '../database.js'
import User from './modelUser.js'
import Places from './modelPlaces.js'
 
// import User from './modelUser.js'
// import Places from './modelPlaces.js'

const TripGroup = sequelize.define('vue_trips_groups', {
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
     
    trips: {
        type: JSON,
        allowNull: true
    },
    
    inTrash: {
        type: BOOLEAN,
        default: false,
        allowNull: true
    }  
})

  
// TripGroup.belongsTo(User, {
//     foreignKey: {
//         allowNull: false,
//         name: 'customColumn'
//     }
// })
// User.hasMany(TripGroup)

  
export default TripGroup



 