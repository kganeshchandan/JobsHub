const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Bcrypt = require("bcryptjs");
require("dotenv/config");
const PORT = 5000;
const joi = require("@hapi/joi");
var cors = require("cors");

app.use(cors());

const userRoute = require("./routes/users");
const jobRoute = require("./routes/jobs");
const AprofileRoute = require("./routes/Applicant/aprofile");
const RprofileRoute = require("./routes/Recruiter/rprofile");
const applicationRoute = require("./routes/application");
const ratingRoute = require("./routes/ratings");

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/userlist", userRoute);
app.use("/joblist", jobRoute);
app.use("/Aprofile", AprofileRoute);
app.use("/Rprofile", RprofileRoute);
app.use("/application", applicationRoute);
app.use("/rating", ratingRoute);

mongoose.connect(process.env.url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.once("open", () => console.log("connected to DB"));

app.listen(PORT, () => {
  console.log("Server is running on Port: " + PORT);
});
