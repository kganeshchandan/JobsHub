const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ratingSchema = new Schema({
    applicantID:{
        type: String,
        required:true
    },
    rateSum :{
        type: Number,
        required : true
    },
    ratings:{
        type: Number,
        required: true
    }

});

module.exports = Arating = mongoose.model("Arating", ratingSchema);
