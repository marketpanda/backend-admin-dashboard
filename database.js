import Sequelize from 'sequelize'
 
// const DB_HOST_LOCAL = process.env.DB_HOST_LOCAL
const DB_HOST_LOCAL = 'localhost'
 
let sequelize

if (DB_HOST_LOCAL === 'localhost') {
    sequelize = new Sequelize('watatrip', 'root', '', {
        dialect: 'mysql',
        host: 'localhost'   
    })  
} else { 
    sequelize = new Sequelize('watatrip', 'watatrip', 'T121p@L35FL3T', {
        dialect: 'mysql',
        host: '139.162.8.143'
    }) 
    console.log('live server mysql')
}






if (sequelize) {
    console.log('connected to mysql')
}

export default sequelize



// import Sequelize from 'sequelize'
 
 
// const sequelize = new Sequelize('watatrip', 'root', '', {
//     dialect: 'mysql',
//     host: 'localhost'
// })



// if (sequelize) {
//     console.log('connected to mysql')
// }

// export default sequelize
