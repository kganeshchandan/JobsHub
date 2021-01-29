const { number, date, string } = require("@hapi/joi");
const { bool } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
require("mongoose-type-email");
mongoose.SchemaTypes.Email.defaults.message = "Email address is invalid";

const JobSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  RecruiterName: {
    type: String,
    required: true,
  },
  RecruiterID: {
    type: String,
    required: true,
  },
  RecruiterEmail: {
    type: mongoose.SchemaTypes.Email,
    required: true,
  },
  maxApplications: {
    type: Number,
    required: true,
  },
  availPos: {
    type: Number,
    required: true,
  },
  DatePosted: {
    type: Date,
    default: Date.now,
  },
  DeadlineDate: {
    type: Date,
    required: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
  SkillSet: {
    type: Array,
  },
  jobTime: {
    type: String,
    enum: ["Full-Time", "Part-Time", "Work from home"],
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  salary: {
    type: Number,
    required: true,
    min: [0, "salary can only be +ve"],
  },
  RateSum: {
    type: Number,
    required: true,
    default: 0,
  },
  Ratings: {
    type: Number,
    required: true,
    default: 0,
  },
});

module.exports = Jobs = mongoose.model("Jobs", JobSchema);
