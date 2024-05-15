import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from '../models/modelUser.js'
import {createError} from '../utils/errors2.js'
  
export const register  = async(req, res, next) => { 
     
    try {
        const existingEmail = await User.findOne({where: {email: req.body.email}})
        console.log("existingEmail", existingEmail)
        if (existingEmail) {
            return res.status(400).json({ error: 'Email is already registered'})
        }

        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(req.body.password, salt)

        const newUser = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            birthday: req.body.birthday,
            password: hash,
            mobile: req.body.mobile
        })

        await newUser.save()
        res.status(200).send('User has been created')
    } catch (error) {
        next (error)
    }
}

 
export const login = async(req, res, next) => {
   
    try { 
        const getUser = await User.findOne({where: {email: req.body.email}})
        if (!getUser) {
            return next(createError(404, "Email not found"))
        } 

        const isPasswordCorrect = await bcrypt.compare(req.body.password, getUser.password)
        if (!isPasswordCorrect) {
            return next(createError(404, "Incorrect password"))
        }
        const { password, ...otherDetailsNoPassword } = getUser.toJSON()
        // const token = jwt.sign({ id: user.id, isBusinessOwner: user.isBusinessOwner}, process.env.JWT)
        const token = jwt.sign({ email: getUser.email}, process.env.JWT_SECRET)

        const expirationDate = new Date(Date.now() + 24 * 60 * 60 * 1000 * 7); // 7 days expiration
        
        res.cookie("jwt", token, {
                httpOnly: true,
                maxAge: expirationDate 
            })
            .status(200)
            .json(otherDetailsNoPassword)
             
            
    } catch (error) {
        next (error)
    }
}