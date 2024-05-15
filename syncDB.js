import sequelize from "./database.js"

import User from './models/modelUser.js'
import Places from "./models/modelPlaces.js"
// import Trip from "./models/modelTrip.js"
sequelize.sync().then(result => {
    console.log(result)
})