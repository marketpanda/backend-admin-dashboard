import { INTEGER, JSON, STRING, TEXT } from "sequelize";
import sequelize from "../database.js";

const Rentals = sequelize.define('vue_rentals', {
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
    place: {
        type: STRING,
        allowNull: false
    },
    rentalType: {
        type: STRING,
        allowNull: true
    },
    coords: {
        type: JSON,
        allowNull: true
    },
    description: {
        type: TEXT,
        allowNull: true
    },
    amenities: {
        type: JSON, // Store array of objects as JSON string in TEXT column
        allowNull: true,
        get() {
            const value = this.getDataValue('amenities');
            return value ? value : [];
        },
        set(value) {
            this.setDataValue('amenities', value);
        }
    },
    features: {
        type: JSON, // Store array of objects as JSON string in TEXT column
        allowNull: true,
        get() {
            const value = this.getDataValue('features');
            return value ? value : [];
        },
        set(value) {
            this.setDataValue('features', value);
        }
    },
    cityProvince: {
        type: STRING,
        allowNull: false
    },
    address: {
        type: STRING,
        allowNull: true
    },
    imgs: {
        type: JSON, // Store array of strings as JSON in JSON column
        allowNull: true,
        defaultValue: [],
        get() {
            const value = this.getDataValue('imgs');
            return value ? value : [];
        },
        set(value) {
            this.setDataValue('imgs', value);
        }
    }
    
});

export default Rentals;
