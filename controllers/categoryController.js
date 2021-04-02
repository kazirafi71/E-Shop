const CategoryModel = require("../models/CategoryModel")

module.exports.addCategoryController=(req,res,next)=>{
    
    const {categoryName}=req.body 

    if(!categoryName){
        return res.status(401).json({
            error:'Provide valid category name'
        })
    }

    const category=new CategoryModel({
        categoryName
    })

    category.save()
    .then(result=>{
        return res.status(201).json({
            text:`Category created`,
            result
        })
    })
    .catch(err=>{
        console.log(err)
        return res.status(401).json({
            error:'Category all ready exist'
        })
    })
}

module.exports.getCategoryController=async (req,res,next)=>{
    
    try {
        const getCategory=await CategoryModel.find()
        return res.status(201).json({
            getCategory
        })
    } catch (error) {
        console.log(error)
    }
}