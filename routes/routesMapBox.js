import express from 'express'
import { authenticate } from '../utils/authenticateUser.js'
import { searchPlaces } from '../controllers/mapBoxController.js'


const router = express.Router()

router.get('/:query', authenticate, searchPlaces)
 

export default router