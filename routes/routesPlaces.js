import express from 'express'
import { getPlaces, addPlace, getPlacesFilterSort, getPlacesByUser, updatePlaceByUser, populateLocation, getPlacesWithinRadius } from '../controllers/placesController.js'
import { authenticate } from '../utils/authenticateUser.js'


const router = express.Router()

router.get('/', getPlaces)

//populate with current or pinned location
router.get('/populateLocation', populateLocation)

router.get('/filterSort', getPlacesFilterSort)

router.post('/addPlace', addPlace)

router.get('/myPlaces', authenticate, getPlacesByUser)
router.post('/myPlaces', authenticate, updatePlaceByUser)

router.get('/placeByRadius', getPlacesWithinRadius)

export default router