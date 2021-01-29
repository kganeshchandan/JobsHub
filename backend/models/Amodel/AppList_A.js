const { number, date } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
require("mongoose-type-email");

const applicationSchema = new Schema({
  applicantID: {
    type: String,
    required: true,
  },
  aname: {
    type: String,
    required: true,
  },
  skills: {
    type: Array,
  },
  rname: {
    type: String,
    required: true,
  },
  jobtitle: {
    type: String,
    default: true,
  },
  aeducation: {
    type: Array,
    Instance: {
      InstituteName: {
        type: String,
      },
      Year: {
        start: {
          type: String,
        },
        end: {
          type: String,
        },
      },
    },
  },
  Abool: {
    type: Boolean,
    default: false,
  },
  Jbool: {
    type: Boolean,
    default: false,
  },
  aratesum: {
    type: Number,
    default: 0,
  },
  aratings: {
    type: Number,
    default: 0,
  },
  jrating: {
    type: Number,
    default: 0,
  },
  jratesum: {
    type: Number,
    default: 0,
  },
  salary: {
    default: true,
    type: Number,
  },
  dateofjoin: {
    type: Date,
  },
  jobID: {
    type: String,
    required: true,
  },
  recruiterID: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    enum: ["Applied", "Apply", "Accepted", "Rejected", "Short-listed"],
    default: "Apply",
  },
  SOP: {
    type: String,
    maxlength: [250, "word limit is 250"],
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Applications = mongoose.model(
  "Applications",
  applicationSchema
);
