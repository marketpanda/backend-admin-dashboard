import Accommodations from '../models/modelAccommodations.js'
import { createError } from '../utils/errors2.js'
import { convertToUnixTimeStamp } from '../utils/dateConverter.js'

export const accommodations = async(req, res, next) => {
    const userId = req.query.id
    res.status(200).send('list of accommodations')
}

export const userAccommodations = async(req, res, next) => {
    const userId = req.query.userId;

    if (!userId) {
        return next(createError('404', "error"));
    }

    try {
        const getUserAccommodations = await Accommodations.findAll({
            where: {
                userId: userId
            }
        })
        
        let userAccommodationsTimeStamped = getUserAccommodations.map(accommodation => {
            
            if (!accommodation.dateIn || !accommodation.dateOut) {
                return accommodation
            }
            
            const dateInUnix = convertToUnixTimeStamp(accommodation.dateIn)
            const dateOutUnix = convertToUnixTimeStamp(accommodation.dateOut)

            return {
                ...accommodation.toJSON(),
                dateIn: dateInUnix,
                dateOut: dateOutUnix
            }

        })
 
        
        res.status(200).json(userAccommodationsTimeStamped); // Return the timestamped data
    } catch (error) {
        return next(createError(404, "Something went wrong"));
    }
};


export const editUserAccommodations = async(req, res, next) => {
    const userId = req.query.id
    res.status(200).send('edit user accommodations')
}

export const bookAccommodations  = async(req, res, next) => {
    try {         
        const newAccommodations = new Accommodations({

             rentalId: req.body.rentalId,
             userId: req.body.userId,
             pax: req.body.pax,
             mobile: req.body.mobile,
             email: req.body.email,
             guestName: req.body.guestName,
             dateIn: req.body.dateIn,
             dateOut: req.body.dateOut,
             price: req.body.price,
             status: req.body.status

        }) 

        await newAccommodations.save()
        res.status(200).send('Accommodation has been created')
    } catch (error) {
        next (error)
    }
}

export const editAccommodations = async(req, res, next) => {
    res.status(200).send('edit accommodation')
}

export const updateuserAccommodation = async(req, res, next) => {
    const userId = req.query.userId
    const bookingId = req.body.id
    

    try {
        const getTheBooking = await Accommodations.findByPk(bookingId)
        if (!userId) {
            return next(createError(404, "Missing user id"))
        }
        if (!getTheBooking) {
            return next(createError(404, "No such booking from provided booking id"))
        }
        const updates = req.body
        
        let updated = await getTheBooking.update(req.body)

        console.log("Accommodation update: ", updated)
        
        res.status(200).json({msg: 'Accommodation updated', userId: userId, update: updated, updates: updates})

    } catch (error) {
        return next(createError(404, error.message))
    }


}

export const deleteAccommodations = async(req, res, next) => {
    res.status(200).send('delete accommodation')
}


 

  