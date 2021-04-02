const router = require('express').Router()
const upload = require('../middleware/multer')
const FileModel = require('../models/FileModel')


router.post('/file-upload', upload.single('img'), (req, res) => {
    // console.log(req.file.path)
    // console.log(req.body.name)
    const url = req.protocol + '://' + req.get('host')
    console.log(url)
    const fileModel = new FileModel({
        
        image: url+'/uploads/'+req.file.filename
    })

    fileModel.save()
        .then(result => {
            console.log(result)
            return res.status(201).json({
                result
            })
        })
        .catch(err => console.log(err))
})


router.get('/file', (req, res) => {



    FileModel.find({})
        .then(result => {
            //console.log(result)
            return res.status(201).json({
                result
            })
        })
        .catch(err => console.log(err))
})



module.exports = router