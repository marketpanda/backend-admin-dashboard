import jwt from "jsonwebtoken";

const secretKey = 'sdfssrjwiou394028dksjf'
export const authenticate = (req, res, next) => {
    // const token = req.cookies.jwt
    next()
}


// export const updateUser2 = async(req, res, next) => { 

//     try {
//         const id = req.body.id 
        
         
//         const { currentPassword, newPassword, ...updatesPasswordRemoved } = req.body

//         if (!id || id === '') {
//             return res.status(400).json({error: 'No user id'})
//         }

//         const userFromDB = await User.findByPk(id)
//         const oldUser = userFromDB
//         if (!userFromDB) {
//             return res.status(400).json({error: 'No such user from provided ID'})
//         }

//         const isCurrentPasswordCorrect = await bcrypt.compare(currentPassword, userFromDB.password)
//         if (!isCurrentPasswordCorrect) {
//             return next(createError(404, 'Incorrect current password'))
//         }


//         //if user opted to change his password
//         if (newPassword && newPassword !== "") {
//             const salt = bcrypt.genSaltSync(10)
//             const hash = bcrypt.hashSync(newPassword, salt)

//             updatesPasswordRemoved.password = hash
//         }

//         var userEmail

//         //check existing email if user opt to change email, but exclude his/her current email
//         const isEmailExisting = async(email, userIdToExclude) => {
//             try {
//                 const existingUser = await User.findOne({
//                     where: {
//                         email: email,
//                         id: { [Sequelize.Op.not]: userIdToExclude } 
//                     }
//                 })

//                 userEmail = existingUser
//                 return !!existingUser

//             } catch (error) {
//                 userEmail = error
//                 return next(createError(404,`Email already exists ${error}`))
//             }
//         }

//         const noSuchEmail = await isEmailExisting(updatesPasswordRemoved.email, id)

//         if (noSuchEmail) {
//             return next(createError(404, 'Email already exists'))
//         }
 
//         const updates = await userFromDB.update(updatesPasswordRemoved)

//         return res.status(200).json({
//             data: req.body,
//             dataPwdsStripped: updatesPasswordRemoved,
//             oldUser: oldUser, 
//             updates: updates,
//             currentPasswordInput:req.body.currentPassword, 
//             passwordFromDB: userFromDB.password,
//             isCurrentPasswordCorrect: isCurrentPasswordCorrect,
//             noSuchEmail: noSuchEmail,
//             userEmail: userEmail
//         })
//     } catch (error) {
//         next(error)
//     }
     
// }
