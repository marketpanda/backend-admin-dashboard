import * as fs from 'fs'
import Places from '../models/modelPlaces.js'
import { createError } from '../utils/errors2.js'
import cloudinary from '../utils/cloudinary.js' 
import { Op, Sequelize, col, fn, literal, where } from 'sequelize'


export const getPlaces = async (req, res, next) => {

    //either by destination (e.g. manila) or id (31)
    const getDestination = req.query.destination
    const placeId = req.query.id

    //not null and not empty
    if (placeId && placeId.trim() !== "") {
        try {
            const getPlaceById = await Places.findByPk(placeId)
            if (!getPlaceById) {
                throw new Error('Place not found')
            }
            res.status(200).json(getPlaceById)
        } catch (error) {
            next(error)
            //res.status(400).json({ msg: 'Could not find place with id ', placeId })
        }
    } else if (getDestination) {
        
        try {
            // const existingEmail = await User.findOne({where: {email: req.body.email}})
            const getPlacesByCity = await Places.findAll({where: {cityProvince: getDestination}})

            console.log("getPlacesByCity", getPlacesByCity)
            res.status(200).json(getPlacesByCity)
            //ref
        } catch (error) {
            console.log('an error occured')
        }  

    } 

    
}

export const populateLocation = async(req, res, next) => {
    
    try {
        const getRecent = await Places.findAll({
            limit: 10,
            order: [['createdAt', 'DESC']]
        }) 

        if (!getRecent) {
            throw new Error('Something went wrong')
        }
        res.status(200).json(getRecent)

    } catch (error) {
        return next (createError(404, "error"))
    }
     
    
}

export const getPlacesFilterSort = async(req, res, next) => {
    const getMode = req.query.sort 
    
    if (getMode === 'recent') {
        try {
            const getRecent = await Places.findAll({
                limit: 10,
                order: [['createdAt', 'DESC']]
            }) 

            if (!getRecent) {
                throw new Error('Something went wrong')
            }
            res.status(200).json(getRecent)

        } catch (error) {
            return next (createError(404, "error"))
        }
    }

    if (getMode === 'mustTry') {
        try {
            const getRecentMustTries = await Places.findAll({
                where: {
                    mustTry: {
                        [Sequelize.Op.not]: null
                    }
                },
                order: [['createdAt', 'DESC']],
                limit: 10
            })

            if (!getRecentMustTries) {
                throw new Error('Sometihng went wrong')
            }

            res.status(200).json(getRecentMustTries)

        } catch (error) {
            return next(createError(404, "error"))
        }
    }
    
}

export const addPlace = async(req, res, next) => {
    try {           
        const newPlace = new Places({  
            userId: req.body.userId,
            name: req.body.name,
            address: req.body.address,
            type: req.body.type,
            coords: req.body.coords,
            location: req.body.location,
            cityProvince: req.body.cityProvince,
            cityId: req.body.cityId,
            description: req.body.description,
            email: req.body.email,
            landmark: req.body.landmark,
            mustTry: req.body.mustTry,
            role: req.body.role, 
            img: req.body.img,
            imgs: req.body.imgs,
            contactNumber: req.body.contactNumber 
        });
          
        await newPlace.save()
         
        res.status(200).json({
            msg: 'Place has been created',
            newPlace: newPlace,
            cloudinaryResult: cloudinary.api.resources()
        })  

       
    } catch (error) {
        
        return next(createError(404, "error")) 
    }
}

export const getPlacesByUser = async(req, res, next) => {
    const userId = req.query.userId
    if (!userId) {
        return next(createError(404, "User ID not found"))
    }

    try {

        const userPlaces = await Places.findAll({
            where: {
                userId: userId
            }
        })
    
        res.status(200).json(userPlaces)
    } catch (error) {
        return next(createError(404, "Something went wrong"))
    }


}

export const updatePlaceByUser = async(req, res, next) => {
    const id = req.body.id
    const getPlaceViaID = await Places.findByPk(id)
    if (!getPlaceViaID) {
        return next(createError(404, 'No such place from provided ID'))
    } 
    try {
        const updatePlace = getPlaceViaID.update(req.body)
        return res.status(200).json({
            data:updatePlace,
            message: 'success'
        })
    } catch (error) {
        return next(createError(404, 'Something went wrong updating'))
    }
}

export const getPlacesWithinRadius = async(req, res, next) => {

    try {

        const getCenterCoords = req.query.center
         
        const regex = /LngLat\(([^,]+),\s*([^)]+)\)/
        const match = getCenterCoords.match(regex)

        if (!match || match.length !==3 ) {
            return res.status(400).json({ error: 'Invalid format for center coords' })
        }

        const longitude = parseFloat(match[1])
        const latitude = parseFloat(match[2])
 
         
        
        const placesWithinRadius = await Places.findAll({
            attributes: [
                'address', 
                'name',
                'cityProvince',
                'coords', //
                'coordsSpatial',
                'description',
                'id',
                'img',
                'imgs',
                'userId',
                [fn('ST_Distance_Sphere', col('coordsSpatial'), literal(`ST_GeomFromText('POINT(${longitude} ${latitude})')`)), 'distance']
            ],
            //we use haversine method
            where: where(
                fn('ST_Distance_Sphere', col('coordsSpatial'), literal(`ST_GeomFromText('POINT(${longitude} ${latitude})')`)), { [Op.lt]: 1000 } // in meters
            ),
            order: literal('distance')
        })

        // const rowsWithinDistance = await YourModel.findAll({
        //     attributes: [
        //       [sequelize.fn('ST_Distance_Sphere', sequelize.col('coordsSpatial'), sequelize.literal(`ST_GeomFromText('POINT(${longitude} ${latitude})')`)), 'distance']
        //     ],
        //     where: sequelize.where(
        //       sequelize.fn('ST_Distance_Sphere', sequelize.col('coordsSpatial'), sequelize.literal(`ST_GeomFromText('POINT(${longitude} ${latitude})')`)),
        //       { [Op.lt]: distanceInMeters }
        //     ),
        //     order: sequelize.literal('distance') // Order by distance
        //   });

        res.status(200).json({center: getCenterCoords, places: placesWithinRadius, lat: latitude}) 
    } catch (error) {
        res.status(404).json({error: error.message})
    }    

}