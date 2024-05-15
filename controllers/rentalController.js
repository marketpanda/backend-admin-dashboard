import Rentals from "../models/modelRental.js";
import { createError } from "../utils/errors2.js";
import cloudinary from "../utils/cloudinary.js";
import { Sequelize } from "sequelize";

export const getRentals = async(req, res, next) => {

    const rentalId = req.query.id
    const cityProvince = req.query.cityProvince

    if (cityProvince && cityProvince.trim() !== '') {
        try {
            const getRentalsViaCityProvince = await Rentals.findAll({
                where: {
                    cityProvince: cityProvince
                }
            })

            res.status(200).json(getRentalsViaCityProvince)

        } catch(error) {
             return next (createError(404, error.message))
        }
    }

    if (rentalId && !rentalId.trim() !== '') {
        try {
            const getRentalById = await Rentals.findByPk(rentalId)
            if (!getRentalById) {
                throw new Error ('Rental not found')
            }
            res.status(200).json(getRentalById)
        } catch (error) {
            return next (createError(404, "error"))
        }
    } 
        
    try {
        const rentals = await Rentals.findAll({ limit: 100})
        res.status(200).json({rentals: rentals})
    } catch (error) {
        return next(createError(404, error.message))
    }    
    
} 


export const getRentalsFilterSort = async(req, res, next) => {
    
    res.status(200).json({msg: 'hi there'})
}

export const getRentalsDetailsByIds = async(req, res, next) => {
    const ids = req.query.ids

    if (ids === '') return

    try {
        const getRentalsUsingTheseIds = await Rentals.findAll({
            where: {
                id: JSON.parse(ids)
            }
        })
        res.status(200).json(getRentalsUsingTheseIds)
    } catch (error) {
        return next(createError(404, 'Could not be found'))
    }
    
}

export const addRental = async(req, res, next) => {
    try {
        const newRental = new Rentals({
            userId: req.body.userId,
            place: req.body.place,
            rentalType: req.body.rentalType,
            coords: req.body.coords,
            description: req.body.description,
            amenities: req.body.amenities,
            features: req.body.features,
            cityProvince: req.body.cityProvince,
            address: req.body.address,
            imgs: req.body.imgs,

        })

        await newRental.save()

        res.status(200).json({
            mgs: 'Rental added',
            newRental: newRental
        })
    } catch (error) {
        // return next(createError(404, "error"))
        res.status(404).json({error: error.message, errorStack: error.stack, msg: 'error'})
    }
   
    
}

export const editRental = async(req, res, next) => {
    res.status(200).json({msg: 'hi there'})
}

export const getRentalsByUser = async(req, res, next) => {
    const userId = req.query.userId
    if (!userId) {
        return next(createError(404, "User ID not found"))
    }

    try {
        const userRentals = await Rentals.findAll({
            where: {
                userId: userId
            }
        })

        res.status(200).json(userRentals)
    } catch (error) {
        return next(createError(404, "Something went wrong"))
    }
}

export const updateRentalByUser = async(req, res, next) => {
    const id = req.body.id
    const getRentalById = await Rentals.findByPk(id)
    if (!getRentalById) {
        return next(createError(404, "No such rental from provided ID"))
    }

    try {
        const updateRental  = getRentalById.update(req.body)
        return res.status(200).json({
            data: updateRental,
            message: 'success'
        })
    } catch (error) {
        return next (createError(404, "Something went wrong"))
    }
}