import multer from 'multer';
import path from 'path'

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './photo_uploads')
    },
    filename: (req, file, cb) => {
        console.log('file ', file)
        console.log('path ', path)
        cb(null, Date.now() + path.extname(file.originalname))
    }
})
 

export const upload = multer({storage: storage })