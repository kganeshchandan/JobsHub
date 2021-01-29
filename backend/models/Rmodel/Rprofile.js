const { string } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
require('mongoose-type-email');

mongoose.SchemaTypes.Email.defaults.message = 'Email address is invalid'

const profileSchema = Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: mongoose.SchemaTypes.Email,
        required: true
    },
    userID:{
        type: String,
        required: true
    },
    contact:{
        type: String,
        required: true,
        min:10,
        max:10,
        message: 'contact number is invalid'
    },
    BioData:{
        type: String,
        required: true,
        maxLength: [250, 'word limit is 250']
    },   
    

});
module.exports = Rprofile = mongoose.model("Rprofile", profileSchema);
