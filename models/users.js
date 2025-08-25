const mongoose = require('mongoose');

const userSchema = new mongoose.Schema( {

    "username" : {
        type : String , 
        required: true ,
        unique: true 
    } ,

    "password" : {
        type: String , 
        required: true , 
        unique: true
    } , 

    "email" : {
        type: String , 
        required: true , 
        unique: true
    }
    
} , { timestamps: true } );

const userModel = mongoose.model('users' , userSchema); 
// users is the name of collection to be created inside the URL_Shortener database created using mongodb.
// The schema of the "users" collection is defined by "userSchema"

module.exports = userModel;