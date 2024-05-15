import * as fs from 'fs'
// import Places from '../models/modelPlaces.js'
import { createError } from '../utils/errors2.js'
import cloudinary from '../utils/cloudinary.js' 
import { Sequelize } from 'sequelize'
import { URLSearchParams } from 'url'
import { type } from 'os'
import axios from 'axios'

export const searchPlaces = async (req, res, next) => {

    try {   
        
        const query = req.params.query
        const results  = await axios(`https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?access_token=${process.env.VUE_APP_MAPBOX}`)
        
        results.data.features.forEach((item) => {
            item.city = null
            item.state = null

            item.context.forEach((type) => {
                if (type.id.includes("place")) {
                    item.city = type.text
                }

                if (type.id.includes("region")) {
                    item.state = type.text
                }
            })
        })


        const data = results.data 
        res.status(200).json(data)
        // res.status(200).json({query2: query})

    } catch (error) {
        res.status(500).json({ error: error.message })
    } 
}
 