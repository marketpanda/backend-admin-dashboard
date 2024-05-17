import express from 'express'
import { authenticate } from '../utils/authenticateUser.js'
import { adminGetPlaces, adminPlacesBulkUpload, adminPlacesGetPendingImageUpload, uploadSingleRowOfImagesLink } from '../controllers/adminPlacesController.js'


const router = express.Router()

router.get('/plces', adminGetPlaces) 
router.get('/pendingImageUpload', adminPlacesGetPendingImageUpload) 

router.post('/bulkUpload', adminPlacesBulkUpload) 
router.post('/singleRowLinksUpdate', uploadSingleRowOfImagesLink)

 

export default router