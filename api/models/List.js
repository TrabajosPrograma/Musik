const mongoose = require ("mongoose");

const ListSchema = new mongoose.Schema({
    title:{type:String, required:true,unique:true},
    Album:{type:String},
    isSongs:{type:Boolean,default:false},
    conten:{type:Array}
},{timestamps:true}
);

module.exports = mongoose.model("List", ListSchema);