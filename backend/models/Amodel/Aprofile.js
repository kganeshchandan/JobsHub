const { string, array } = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
require("mongoose-type-email");

mongoose.SchemaTypes.Email.defaults.message = "Email address is invalid";

const profileSchema = Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: mongoose.SchemaTypes.Email,
    required: true,
  },
  userID: {
    type: String,
    required: true,
  },
  education: {
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
  skills: {
    type: Array,
  },
  rateSum: {
    type: Number,
    required: true,
    default: 0,
  },
  ratings: {
    type: Number,
    required: true,
    default: 0,
  },
});
module.exports = Aprofile = mongoose.model("Aprofile", profileSchema);
