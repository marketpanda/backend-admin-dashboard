import * as fs from 'fs'
import Places from '../models/modelPlaces.js'
import { createError } from '../utils/errors2.js'
import cloudinary from '../utils/cloudinary.js' 
import { Op, Sequelize, col, fn, literal, where } from 'sequelize'


export const adminGetPlaces = async (req, res, next) => { 
    
    res.status(200).json({msg: "loading places..."}) 
    
}

export const adminPlacesBulkUpload = async(req, res, next) => {
    
    const tabulatedData = req.body
    
    try {
        const newArray = []

        tabulatedData.map((item) => {
            const singleItem =  {
                userId: item.userId,
                name: item.name,
                address: item.address,
                type: item.type,
                coords: item.coords,
                location: item.location,
                cityProvince: item.cityProvince,
                cityId: item.cityId,
                description: item.description,
                email: item.email,
                landmark: item.landmark,
                mustTry: item.mustTry,
                role: item.role,
                img: item.img,
                img: item.imgs,  
                coordsSpatial: item.coordsSpatial,
                contactNumber: item.contactNumber
            }  

            newArray.push(singleItem)
        })

        let bulkUpload = await Places.bulkCreate(newArray)
 
        res.status(200).json({data: tabulatedData, newArray: newArray, bulkUpload: bulkUpload })

    } catch (error) {
        return next (createError(404, error))
    }
     
    
}

export const adminPlacesGetPendingImageUpload = async (req, res, next) => {

    try {
    
        const getPlacesWithPendingImageUpload = await Places.findAll({
            where: {
                imgs: null
            }
        })
    
        res.status(200).json({
            data: getPlacesWithPendingImageUpload,
            msg: "loading places with pending imagess..."
        })
    
    } catch (error) {
       
        res.status(404).json({ error: error.message })
    
    }
}

export const uploadSingleRowOfImagesLink = async (req, res, next) => {
	const secureUrls = req.body.secureUrlsCloudinary
	const id = req.body.id

    const getPlaceWithNoImage = await Places.findByPk(id)

    if (!getPlaceWithNoImage) {
        return next(createError(404, "Place not found"))
    }

    try {
        const updatePlaceWithNewImages = await getPlaceWithNoImage.update({ imgs: secureUrls })
        return res.status(200).json({
            data: updatePlaceWithNewImages,
            message: "success"
        })
    } catch (error) {
        //res.status(500).json({ error: error.message })
		return next(createError(500, "Something went wrong"))
    }
}
//     res.status(200).json({ urls: secureUrls, id: id })
// } else {
//     res.status(400).json({ msg: 'Place not found'})
// }
 