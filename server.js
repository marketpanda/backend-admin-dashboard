import express from 'express';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import path from 'path'
import cors from 'cors'
  

import cookieParser from 'cookie-parser';

 
dotenv.config() 
  
import routesAuth from './routes/routesAuth.js'
import routesUser from './routes/routesUser.js' 
import routesTrip from './routes/routesTrip.js'
import routesAccommodations from './routes/routesAccommodations.js'
import routesRooms from './routes/routesRooms.js'
import routesPlaces from './routes/routesPlaces.js'

//for testing
// import routesHome from './routes/api.js'
 
 
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
 

const app = express();


app.use(cors())

// app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
 
app.use(cookieParser())
// app.use(express.static(path.join(__dirname, 'public_html/src/')))
app.use(express.static(path.join(__dirname, `${process.env.ENV_LOCAL}/public_html/src/`)))

//home page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, `${process.env.ENV_LOCAL}/public_html/src/index.html`))
})
 
 
 

//login and register
app.use('/auth', routesAuth)

//user edit and (soft) delete
app.use('/users', routesUser)

//chat
app.use('/chats', routesChat)

//trip
app.use('/trip', routesTrip)

//accommodations
app.use('/accommodations', routesAccommodations)

//rooms
app.use('/rooms', routesRooms)

//places
app.use('/places', routesPlaces)

//for testing
// app.use('/', routesHome)


//page not found
app.use((req, res) => {
    res.status(404).sendFile(path.join(__dirname, `${process.env.ENV_LOCAL}/public_html/src/404.html`))
})
app.use((err, req, res, next) => {
    const errorStatus = err.status || 500
    const errorMessage = err.message || "Something went wrong"
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack
    })
})


const port = process.env.LISTEN_PORT
app.listen(port, () => {
    console.log(`NodeJS Server is running at port ${port}`)
})