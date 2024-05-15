import { DATE, FLOAT, INTEGER, NUMBER, STRING } from 'sequelize'
import sequelize from '../database.js'

const Accommodations = sequelize.define('vue_accommodations2', {
    id: {
        type: INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true    
    },
    
    rentalId: {
        type: INTEGER,
        allowNull: false
    },
    userId: {
        type: INTEGER,
        allowNull: false 
    },
    pax: {
        type: INTEGER,
        allowNull: false
    },
    mobile: {
        type: STRING,
        allowNull: true
    },
    email: {
        type: STRING,
        allowNull: true
    },
    guestName: {
        type: STRING,
        allowNull: true         
    },
    dateIn: {
        type: DATE, 
        allowNull: true
    },
    dateOut: {
        type: DATE,
        allowNull: true
    },
    price: {
        type: FLOAT,
        allowNull: true
    },
    status: {
        type: STRING,
        allowNull: true
    }
})
 
export default Accommodations



 