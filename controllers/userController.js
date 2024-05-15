import { get } from "https"
import User from "../models/modelUser.js"
import { createError } from "../utils/errors2.js" 
import bcrypt from 'bcrypt'
import { Sequelize } from "sequelize"
 
export const getUser = async(req, res, next) => {
    const getId = req.query.id
    if (!getId || getId === '') {
        res.status(400).json({msg: 'No user id submitted'})
    }

    const fromNext = req.customParams
    const cookies = req.cookies.jwt

    const getUser = await User.findByPk(getId)
    const getuserJSON = getUser.toJSON()


    res.status(200).json({ userData: getuserJSON })

    // try {
    //     const getUserById = await User.findByPk(getId)
    //     if (!getUserById) {
    //         throw new Error('User not found')
    //     } 

    //     //destructure and removes sending hashed passwords
    //     const {password, ...detailsPasswordRemoved} = getUserById.toJSON()
         
    //     res.status(200).json(detailsPasswordRemoved)
    // } catch (error) {
    //     next(error)
    // } 
}

export const getUserTrips = async(req, res, next) => {
    let getId = req.params.userId
    getId = parseInt(getId)
    if (!getId || getId === '') {
        res.status(400).json({msg: 'No user id submitted'})
    }

    try {
        const getUserById = await User.findByPk(getId)
        if (!getUserById) {
            throw new Error('User not found')
        }

        const {password, ...detailsPasswordRemoved} = getUserById.toJSON() 
         
        res.status(200).json({
            results: detailsPasswordRemoved,
            results2: getId,
            results3: 'res3',
            jsonTrips: detailsPasswordRemoved.trips,
            jsonTrip2: JSON.parse(detailsPasswordRemoved.trips)
        })

    } catch (error) {
        next(error)
    }
}


//delete trip
export const updateUser = async(req, res, next) => { 
    try { 
        const getUserId = req.query.id
        const removeThisTrip = req.body.tripToRemove
    
        if (!getUserId || getUserId === '') {
            return res.status(400).json({ error: 'User does not exists'}) 
        }

        const getUserDetailsViaID = await User.findByPk(getUserId)
        
        const userTrips = JSON.parse(getUserDetailsViaID.trips)
        const filterTrips = userTrips.filter(item => item.id  !== removeThisTrip)
        
        await getUserDetailsViaID.update({ trips: filterTrips })

        if (!getUserDetailsViaID) {
            return res.status(400).json({error: 'Could not find user'})
        }

        return res.status(200).json({
            a: (typeof getUserDetailsViaID),
            b: getUserDetailsViaID,
            c: userTrips,
            d: (typeof userTrips),
            e: filterTrips,
            f: (typeof filterTrips)
        })
    } catch (error) {
        next(error)
    }
     
}


//update user profile
export const updateUser2 = async(req, res, next) => { 

    try {
        const id = req.body.id 
        
         
        const { currentPassword, newPassword, ...updatesPasswordRemoved } = req.body

        if (!id || id === '') {
            return res.status(400).json({error: 'No user id'})
        }

        const userFromDB = await User.findByPk(id)
        const oldUser = userFromDB
        if (!userFromDB) {
            return res.status(400).json({error: 'No such user from provided ID'})
        }

        const isCurrentPasswordCorrect = await bcrypt.compare(currentPassword, userFromDB.password)
        if (!isCurrentPasswordCorrect) {
            return next(createError(404, 'Incorrect current password'))
        }


        //if user opted to change his password
        if (newPassword && newPassword !== "") {
            const salt = bcrypt.genSaltSync(10)
            const hash = bcrypt.hashSync(newPassword, salt)

            updatesPasswordRemoved.password = hash
        }

        var userEmail

        //check existing email if user opt to change email, but exclude his/her current email
        const isEmailExisting = async(email, userIdToExclude) => {
            try {
                const existingUser = await User.findOne({
                    where: {
                        email: email,
                        id: { [Sequelize.Op.not]: userIdToExclude } 
                    }
                })

                userEmail = existingUser
                return !!existingUser

            } catch (error) {
                userEmail = error
                return next(createError(404,`Email already exists ${error}`))
            }
        }

        const noSuchEmail = await isEmailExisting(updatesPasswordRemoved.email, id)

        if (noSuchEmail) {
            return next(createError(404, 'Email already exists'))
        }
 
        const updates = await userFromDB.update(updatesPasswordRemoved)

        return res.status(200).json({
            data: req.body,
            cookies: req.cookies.access_token,
            dataPwdsStripped: updatesPasswordRemoved,
            oldUser: oldUser, 
            updates: updates,
            currentPasswordInput:req.body.currentPassword, 
            passwordFromDB: userFromDB.password,
            isCurrentPasswordCorrect: isCurrentPasswordCorrect,
            noSuchEmail: noSuchEmail,
            userEmail: userEmail
        })
    } catch (error) {
        next(error)
    }
     
}



//add trip
export const updateTrips = async(req, res, next) => {
  
    try {
        const userId = req.body.userId
        const checkIdFromDatabase = await User.findByPk(userId)
        
        if (!checkIdFromDatabase) {
            return res.status(400).json({ error: 'User does not exists' })
        }
        
        const newTrips = req.body.trip
        let existingTripsParsed = JSON.parse(checkIdFromDatabase.trips)
        if (!existingTripsParsed.some(trip => trip.id === newTrips.id)) {
            
            existingTripsParsed.push(req.body.trip)
            await checkIdFromDatabase.update({trips: existingTripsParsed})
        
        } 
        
        return res.status(200).json({ 
           
            cirdb: existingTripsParsed 
            
        }) 

    } catch (error) {
        // return res.status(400).json({ error: error.message || 'Something went wrong'})
        // next(createError(404, 'Something went wrong'))
        return res.status(500).json({error: error.message || 'Something went wrong'})
    } 
    
}

export const deleteUser = async(req, res, next) => {
    res.status(200).send('read user info')
    
}

export const uploadPhoto2 = () => {
    
}


export const uploadPhoto = async(req, res, next) => {
    res.status(200).send('upload photo')
}

export const getPhoto = async(req, res, next) => {
    res.status(200).send('photo rendered')
}