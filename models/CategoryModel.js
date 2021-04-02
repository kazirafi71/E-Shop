const mongoose=require('mongoose')


const categorySchema=mongoose.Schema({
    categoryName:{
        type: String,
        unique: true
    }
},{timestamps: true})

const CategoryModel=mongoose.model('Category', categorySchema)

module.exports=CategoryModel

