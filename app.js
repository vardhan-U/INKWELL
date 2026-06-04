const mongoose = require('mongoose');


mongoose.connect('mongodb://127.0.0.1:27017/mongopractice');
const bookSchema =  mongoose.Schema({
    Author: {type:String,required:true},
    Title: {type:String,required:true},
    Genre: {type:String,required:true},
    Status: {type:String,enum:['Reading','Finished'],required:true},
    rating: {type:Number,required:false},
    Review: {type:String,required:false}
})

module.exports = mongoose.model("book",bookSchema);