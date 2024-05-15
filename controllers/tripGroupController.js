import Trip from '../models/modelTrip.js' 
import TripGroup from '../models/modelTripGroup.js'
import {createError} from '../utils/errors2.js'


export const getTripGroups = async(req, res, next) => {
    res.status(200).send('trip groups all')
}

export const getTripGroupsByUserId = async(req, res, next) => {

    const userId = req.params.userId 
    if (!userId) { return next(createError(404, 'User id not provided or invalid')) }

    const userTripGroups = await TripGroup.findAll({
        where: {
            userId: userId,
            inTrash: 0
        }
    }) 

    res.status(200).json(userTripGroups) 
}

export const createTripGroup  = async(req, res, next) => {
    // try {         
        
    //     const newTripGroup = new TripGroup({ 
    //         userId: req.body.userId,
    //         name: req.body.name,
    //         trips: req.body.trips
    //     })
        
    //     await newTripGroup.save()
    //     res.status(200).json({
    //         message: 'Trip has been created',
    //         trip: req.body.name
    //     })
    try {         
        
        const newTripGroup = await TripGroup.create({ 
            userId: req.body.userId,
            name: req.body.name,
            trips: req.body.trips
        })
        
        // await newTripGroup.save()
        res.status(200).json({
            message: 'Trip has been created',
            trip: req.body.name,
            data: newTripGroup
        })
    } catch (error) {
        next (createError(404, "Error on adding trip group"))
    }
    // res.status(200).json({msg: 'create trip group'})
}

export const editTripGroup = async(req, res, next) => {

    try { 
   
        const tripGroupTrips = req.body.trips

        const findTripGroupFromDB = await TripGroup.findByPk(req.body.id)

        findTripGroupFromDB.trips = tripGroupTrips 
        await findTripGroupFromDB.save()
        // const success = await findTripGroupFromDB.save()

        res.status(200).json({trips: tripGroupTrips})
    } catch (error) {
        next (createError(404, "Error editing trip"))
    }
   
}

export const deleteTripGroup = async(req, res, next) => {
    try {
        const userId = req.body.userId

        const getTheTripGroup = await TripGroup.findOne({
            where: {
                id: req.body.tripGroudId 
            }
        })

        await getTheTripGroup.update(
            { inTrash: 1 },
            {
                where: {
                    userId: userId
                }
            }
        )   

        await getTheTripGroup.save()

        // const updatedTripGroup = TripGroup.save()
        res.status(200).json({body: req.body, getTheTripGroup: getTheTripGroup})

    } catch (error) {
        next (createError(404, error.message))
    }

   
}
 

  