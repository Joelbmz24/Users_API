const mongoose = require("mongoose"),
    Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required:true
    },
    lastName: {
        type:String,
        required:true
    },
    email: {
        type: String,
        required: true 
    },
    password:{
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        enum:['admin','user'],
        default: 'user'
    }
}, {
    timestamps:true
});
module.exports =  mongoose.model('User',userSchema)

