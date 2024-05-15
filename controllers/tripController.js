 
import Trip from '../models/modelTrip.js'
import {createError} from '../utils/errors2.js'


export const trips = async(req, res, next) => {
    res.status(200).send('trips')
}

export const createTrip  = async(req, res, next) => {
    try {         
        const newTrip = new Trip({

            //placeId has to exist to its origin table, will throw error otherwise
            placeId: req.body.placeId,
            meetUpLocation: req.body.meetUpLocation,
            dateOfTrip: req.body.dateOfTrip,
            pax: req.body.pax, 
            guests: req.body.guests           
        }) 

        await newTrip.save()
        res.status(200).send('Trip has been created')
    } catch (error) {
        next (error)
    }
}

export const editTrip = async(req, res, next) => {
    res.status(200).send('edit trip')
}

export const deleteTrip = async(req, res, next) => {
    res.status(200).send('delete trip')
}
 

  