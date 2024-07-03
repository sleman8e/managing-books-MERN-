const mongoose = require('mongoose');
const booksSchema = new mongoose.Schema({
    title:{type:String, required:true},
    author:{type:String, required:true},
    language:{type:String, required:true},
    price:{type:Number, required:true},
    
});
module.exports = mongoose.model('Books',booksSchema);