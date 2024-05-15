import express from 'express'
import { createTrip, deleteTrip, editTrip, trips } from '../controllers/tripController.js'
import { createTripGroup, deleteTripGroup, editTripGroup, getTripGroupsByUserId } from '../controllers/tripGroupController.js'
import { authenticate } from '../utils/authenticateUser.js'

const router = express.Router()

router.post('/createTrip', authenticate, createTrip)
router.get('/', authenticate, trips)
router.put('/', authenticate, editTrip)
router.delete('/', authenticate, deleteTrip)

router.post('/tripGroups', authenticate, createTripGroup)
router.patch('/tripGroups/edit', authenticate, editTripGroup)
router.get('/tripGroups/:userId', authenticate, getTripGroupsByUserId)
router.patch('/tripGroups/delete', authenticate, deleteTripGroup)

//admin dashboard
// router.get('/tripGroups', authenticate, getTripGroups) 
 
export default router