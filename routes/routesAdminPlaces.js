import express from 'express'
import { authenticate } from '../utils/authenticateUser.js'
import { adminGetPlaces, adminPlacesBulkUpload, adminPlacesGetPendingImageUpload } from '../controllers/adminPlacesController.js'


const router = express.Router()

router.get('/plces', adminGetPlaces) 
router.get('/pendingImageUpload', adminPlacesGetPendingImageUpload) 

router.post('/bulkUpload', adminPlacesBulkUpload) 

 

export default router