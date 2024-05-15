import express from 'express'
import { deleteUser, getPhoto, getUser, updateUser, updateUser2, updateTrips, uploadPhoto, getUserTrips } from '../controllers/userController.js'
import { upload } from '../utils/upload.js'
import { authenticate } from '../utils/authenticateUser.js'

const router = express.Router()

 

router.get('/', authenticate, getUser) 
// router.get('/', getUser) 

// user trips edit
router.patch('/', authenticate, updateUser) 

// user profile edit
router.patch('/edit', authenticate, updateUser2) 

router.get('/photos', getPhoto)

router.post('/photos', upload.single("image"), uploadPhoto)

router.patch('/:theUserId/trips', updateTrips)

router.get('/:userId/trips', getUserTrips)

export default router