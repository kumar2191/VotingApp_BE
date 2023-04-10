import mongoose from "mongoose";

const User=mongoose.model('User',new mongoose.Schema({
    Name:{
        type: String,
        required: true
    },
    RegiserNumber:{
        type: String,
        required: true,
        uppercase: true,
        unique: true
    },
    Department:{
        type: String,
        required: true
    },
    Section:{
        type: String,
        required: true,
    },
    Course: {
         type: String,
        required: true
    },
    Email:{
        type: String,
        required: true,
        unique: true
    },
    Password:{
        type: String,
        required: true
    },
    Createdat : {
        type: Date,
        default: Date.now
      },
   
      Batch:{
        type:Number,
        required: true
    },
    PhoneNumber: {
            type:Number,
        required: true   
      }
}));




export {
    User
}