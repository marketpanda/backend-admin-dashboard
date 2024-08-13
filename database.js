import Sequelize from 'sequelize'
import dotenv from 'dotenv';

dotenv.config()
 
// const DB_HOST_LOCAL = process.env.DB_HOST_LOCAL
const DB_HOST_LOCAL = 'localhost2'
 
let sequelize

if (DB_HOST_LOCAL === 'localhost') {
    sequelize = new Sequelize('watatrip', 'root', '', {
        dialect: 'mysql',
        host: 'localhost'   
    })  
} else { 
    sequelize = new Sequelize(
        process.env.DB_NAME_LOCAL, 
        process.env.DB_UID_LOCAL, 
        process.env.DB_PWD_LOCAL,  
        {
        dialect: 'mysql',
        host: '139.162.8.143'
    })   
} 

sequelize.authenticate()
    .then(() => console.log('connected'))
    .catch((err) => console.error('error in connection', err))

export default sequelize