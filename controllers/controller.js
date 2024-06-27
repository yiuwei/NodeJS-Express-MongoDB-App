/**
 * File Controllers
 */

// Create storage to upload files
const restaurant = require('../models/mongoose');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/images');
    },
    filename: function (req, file, cb){
        cb(null,`${file.originalname}`);
    }
});

// Create service class with CRUD functions
class ServiceClass {
    // List resources
    static list(){
        return restaurant.find({})
          .then((cuisine)=>{
            return cuisine;
          });
    }
    // Create resources
    static create(object){
      const data = new restaurant(object);
      return data.save();
    }
    // Read reservation
    static read(id){
        return restaurant.findById(id)
          .then((data)=>{
            return data;
          });
    }
    // Update reservation 
    static update(id, input){
        return restaurant.findOne({_id: id})
          .then((data)=>{
            data.set(input);
            data.save();
            return data;
          });
    }
    // delete reservation 
    static delete(id){
        return restaurant.deleteOne({_id: id})
           .then((object)=>{
            return object;
           })   
    }
}
module.exports.storage = storage;
module.exports.ServiceClass = ServiceClass;