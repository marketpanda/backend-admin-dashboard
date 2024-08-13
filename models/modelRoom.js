import { BOOLEAN, DATE, DOUBLE, INTEGER, STRING } from 'sequelize'
import sequelize from '../database.js'

const Rooms = sequelize.define('vue_rooms', {
    id: {
        type: INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    homeType: {
        type: STRING,
        allowNull: false
    },
    roomType: {
        type: STRING,
        allowNull: false 
    }, 
    totalOccupancy: {
        type: INTEGER,
        allowNull: false
    },
    totalBedrooms: {
        type: INTEGER,
        allowNull: false
    }, 
    totalBathrooms: {
        type: INTEGER,
        allowNull: false
    },
    summary: {
        type: STRING,
        allowNull: false
    },
    address: {
        type: STRING,
        allowNull: false
    },
    hasTv: {
        type: BOOLEAN,
        allowNull: false
    },
    hasKitchen: {
        type: BOOLEAN,
        allowNull: false
    },
    hasAircon: {
        type: BOOLEAN,
        allowNull: false
    },
    hasHeating: {
        type: BOOLEAN,
        allowNull: false
    },
    hasInternet: {
        type: BOOLEAN,
        allowNull: false
    },
    price: {
        type: INTEGER,
        allowNull: false
    },
    publishedAt: {
        type: DATE,
        allowNull: false
    },
    ownerId: {
        type: INTEGER,
        allowNull: false
    },
    latitude: {
        type: DOUBLE,
        allowNull: false
    },
    longitude: {
        type: DOUBLE,
        allowNull: false
    }, 
    image_url: {
        type: STRING,
        allowNull: false 
    }
})

export default Rooms