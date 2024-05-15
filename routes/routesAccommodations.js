import express from 'express'
 
import {  bookAccommodations, deleteAccommodations, userAccommodations, updateuserAccommodation } from '../controllers/accommodationsController.js'
import { authenticate } from '../utils/authenticateUser.js'

const router = express.Router()

router.post('/', authenticate, bookAccommodations)
router.delete('/', authenticate, deleteAccommodations)

router.get('/myAccommodations', authenticate, userAccommodations) 
router.post('/myAccommodations', authenticate, updateuserAccommodation)

export default router