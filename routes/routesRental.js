import express from 'express'
import { addRental, getRentals, editRental, getRentalsByUser, updateRentalByUser, getRentalsDetailsByIds } from '../controllers/rentalController.js'
import { authenticate } from '../utils/authenticateUser.js'

const router = express.Router()

router.get('/', getRentals)
router.get('/rentalsByIds', getRentalsDetailsByIds)
router.post('/', addRental)
router.put('/', editRental)


router.get('/myRentals', authenticate, getRentalsByUser)
router.post('/myRentals', authenticate, updateRentalByUser)

export default router