import { BOOLEAN, INTEGER, JSON, STRING } from 'sequelize'
import sequelize from '../database.js'
import User from './modelUser.js'
import Places from './modelPlaces.js'
 
// import User from './modelUser.js'
// import Places from './modelPlaces.js'

const Trip = sequelize.define('vue_trip', {
    id: {
        type: INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    
    meetUpLocation: {
        type: STRING,
        allowNull: false
    },
    dateOfTrip: {
        type: STRING,
        allowNull: false 
    },
    pax: {
        type: INTEGER,
        allowNull: false
    },
    guests: {
        type: JSON         
    },
    confirmed: {
        type: BOOLEAN,
        defaultValue: false
    },
    paid: {
        type: BOOLEAN,
        defaultValue: false
    }
})

Trip.belongsTo(User)
Places.hasMany(Trip)

  
export default Trip



 