/**
 * Mongoose Schema
 */
const mongoose = require("mongoose");

// Create and export the schema
const schema = new mongoose.Schema({
    originalname: {type: String, required:true}, 
    imageurl: {type: String, required:false}, 
    name: {type: String, required:false},
    time: { type: String, required:false},
    date: {type: String, required:false},  
    guest: {type: Number, required:false}, 
})
module.exports = mongoose.model("Cuisine", schema);