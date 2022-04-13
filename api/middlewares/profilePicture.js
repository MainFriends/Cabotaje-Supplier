const multer = require('multer');
const path = require('path');

const diskstorage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'api/uploads')
        },
        filename: (req, file, cb) => {
            cb(null, req.user.COD_USER + '-profile-picture-' + file.originalname)
        }
})

const fileUpload = multer({
    storage: diskstorage
}).single('image');

module.exports = fileUpload;