const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Bcrypt = require("bcryptjs");
// const joi = require('@hapi/joi');
require('mongoose-type-email');
mongoose.SchemaTypes.Email.defaults.message = 'Email address is invalid'

// Create Schema
const UserSchema = new Schema({
	jobtype: {
		type: String,
		required: true,
		// enum:['applicant', 'recruiter'],
		validate:{
			validator: (items)=> items==='applicant'|| items ==='recruiter'	, 
			message: "job can only be applicant or recruiter"
		}
	},
	email: {
		type: mongoose.SchemaTypes.Email,
		required: true	
			
    },
    password:{
        type: String,
		required:true,
    },
	date:{
		type: Date,
		default: Date.now
	}
});

module.exports = User = mongoose.model("Users", UserSchema);
//$2a$10$W2gUcGSQHkIUGkVkFH9ka.Ox2BJXSJkHRUghvfwc/tmD7D6JKiLOu