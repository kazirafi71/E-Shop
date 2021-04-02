const mongoose=require('mongoose')



const fileModelSchema= mongoose.Schema({
    name:{
        type: String
    },
    image:{
        type: String
    }
})

const FileModel= mongoose.model('File', fileModelSchema)

module.exports=FileModel