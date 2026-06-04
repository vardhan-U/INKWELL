const mongoose = require('mongoose');


mongoose.connect('mongodb://127.0.0.1:27017/mongopractice');
const bookSchema =  mongoose.Schema({
    author: {type:String,required:true},
    title: {type:String,required:true},
    genre: {type:String,required:true},
    status: {type:String,enum:['Reading','Finished'],required:true},
    rating: {type:Number,required:false},
    review: {type:String,required:false}
})

module.exports = mongoose.model("book",bookSchema);