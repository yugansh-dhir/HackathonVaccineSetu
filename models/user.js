const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const passportLocalMongoose = require('passport-local-mongoose');


const userSchema= new Schema({
    email:{
        type: String,
        // required: [true, 'Email cannot be blank']

    },
    pincode:{
        type: Number,
        // required: [true, 'pincode cannot be blank']

    }
});
module.exports=mongoose.model('User', userSchema)