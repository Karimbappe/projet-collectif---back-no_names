const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
    {
        name : {type:String, required : true},
        description : {type:String, required : true},
        image : {type:String, required : true},
        category : {type:String},
        size : {type:String, required : true},
        color : {type:String, required : true},
        price : {type:Number, required : true},
        inStock : {type:Number},
        ratings : {type:Number},
       
    },
    //current time and date
    {timestamps:true}
)
module.exports=mongoose.model("Product",ProductSchema)