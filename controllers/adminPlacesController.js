/**
 * @swagger
 * components:
 *  schemas:
 *      Places:
 *          type: object
 *          required:
 *              - id
 *              - userId
 *              - name
 *              - address
 *          properties:
 *              id:
 *                  type: integer
 *                  description: The auto-generate id of the Place
 *              userId:
 *                  type: integer
 *                  description: The id of the user who submitted the place
 *              name:
 *                  type: string
 *                  description: The name of the place
 *              address:
 *                  type: string
 *                  description: The address of the place
*/
/**
 * @swagger
 * tags:
 *      name: Places
 *      description: Places managing API
 * /admin/places:
 *      get:
 *          summary: Lists places for admin dashboard
 *          tag: [Places]
 *          responses:
 *              200:
 *                  description: The list of places in Watatrip app
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/Places'
 * /admin/pendingImageUpload:
 *      get:
 *          summary: The list of places with no images yet
 *          tag: [Places]
 *          responses:
 *              200:
 *                  description: Displays all the images with status null. User will be prompted to add at least one image per place to display it
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/Places'
 *       
 * 
 * 
 * 
*/







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
        const newArray = tabulatedData.map((item) => { 

            let imgsArray = Array.isArray(item.imgs) ? item.imgs.filter(img => img) : [];
             
            // const splitCoords = item.coordinates.split(",").map(coord => coord.trim())
            return {
                userId: item.userId,
                name: item.nameOfPlace,
                address: item.address,
                type: item.type || null,
                location: item.location || null,
                category: item.category2 || null, 
                cityProvince: item.cityProvince || null,
                cityId: item.cityId || null,
                description: item.description || null,
                email: item.email || null,
                websiteAndorFbPage: item.websiteAndorFbPage || null,
                storeHours: item.storeHours || null,
                landmark: item.landmark || null,
                mustTry: item.mustTry || null,
                role: item.role || null,
                img: item.img || null,
                coords:  item.coordinates ||null, 
                coordsSpatial:  item.coordsSpatial || null,
                // coords:  item.coordinates || [14.5253, 121.14938], 
                // coordsSpatial:  item.coordsSpatial || null,
                // coords: item.coordinates ? item.coordinates.join(',') : null, 
                // coordsSpatial: item.coordsSpatial || null,
                contactNumber: item.contactNo || null,
                plusCode: item.plusCode || null, 
            }   
        })

        let bulkUpload = await Places.bulkCreate(newArray)
        res.status(200).json({data: tabulatedData, newArray: newArray, bulkUpload: bulkUpload  })
        // res.status(200).json({ newArray, bulkUpload })

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
 