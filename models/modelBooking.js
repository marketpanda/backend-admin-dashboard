import { INTEGER, STRING,  DATE } from "sequelize"
import sequelize from "../database.js"

const Bookings = sequelize.define('vue_bookings', {
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
    rentalId: {
        type: INTEGER,
        allowNull: false
    },
    pax: {
        type: INTEGER,
        allowNull: false
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
        type: INTEGER,
        allowNull: true
    }
})

export default Bookings