const express = require("express");
const router = express.Router();
const Bcrypt = require("bcryptjs");
const Jobs = require("../models/Jobs");
const User = require("../models/Users");
const Joi = require("joi");
const application = require("../models/Amodel/AppList_A");
router.get("/findjob/:ID", async (req, res) => {
  await Jobs.findOne({ _id: req.params.ID })
    .then((items) => res.json(items))
    .catch((err) => res.json(err));
});
router.get("/", async (req, res) => {
  await Jobs.find().then((items) => res.json(items));
});

router.get("/find/:ID", async (req, res) => {
  await Jobs.find({ RecruiterID: req.params.ID }).then((items) =>
    res.json(items)
  );
});
router.post("/postjob/:recruiterID", async (req, res) => {
  // console.log('post a job here');
  const temp = await User.findOne({ _id: req.params.recruiterID });
  // console.log(temp);
  const newjob = new Jobs({
    title: req.body.title,
    RecruiterName: req.body.name,
    RecruiterEmail: temp.email,
    RecruiterID: req.params.recruiterID,
    maxApplications: req.body.maxapp,
    availPos: req.body.maxpos,
    // DatePosted: req.body.DatePosted,
    DeadlineDate: req.body.deadline,
    SkillSet: req.body.skills.map((s) => s.value),
    jobTime: req.body.jobtype,
    duration: req.body.duration,
    salary: req.body.salary,
    // RateSum: req.body.RateSum,
    // Ratings: req.body.Ratings,
  });
  console.log(newjob);
  // res.json(newjob);
  try {
    const savedjob = await newjob.save();
    res.json("job created !");
    console.log("success");
  } catch (err) {
    res.status(400).json(err);
    console.log("failed");
  }
});

router.post("/editjob/:ID", async (req, res) => {
  const jobedit = await Jobs.findOne({ _id: req.params.ID });
  console.log("...", jobedit);

  // jobedit.title = req.body.title,
  // jobedit.RecruiterName = req.body.RecruiterName,
  // jobedit.RecruiterEmail = req.body.RecruiterEmail,
  // jobedit.RecruiterID = req.body.RecruiterID,
  (jobedit.maxApplications = req.body.maxapp),
    (jobedit.availPos = req.body.maxpos),
    // DatePosted: req.body.DatePosted,
    (jobedit.DeadlineDate = req.body.deadline),
    // jobedit.SkillSet = req.body.SkillSet,
    // jobedit.jobTime = req.body.jobTime,
    // jobedit.duration = req.body.duration,
    // jobedit.salary = req.body.salary,
    // jobedit.RateSum = req.body.RateSum,
    // jobedit.Ratings = req.body.Ratings
    console.log(jobedit);
  try {
    const savedjobedit = await jobedit.save();
    res.json(savedjobedit);
  } catch (err) {
    console.log(err);
  }
});

router.post("/delete/:ID", async (req, res) => {
  const toedit = await Jobs.findOne({ _id: req.params.ID });
  toedit.status = false;
  try {
    const savedjobedit = await toedit.save();
    res.json(savedjobedit);
  } catch (err) {
    console.log(err);
  }
});

router.post("/rab/acr/r/x/:ID/:id", async (req, res) => {
  try {
    const toedit = await application.findOne({
      jobID: req.params.ID,
      applicantID: req.params.id,
    });
    toedit.Abool = true;
    console.log("bb", toedit);

    const jobedit = await Jobs.findOne({ _id: req.params.ID });
    console.log("heelo", req.body);
    // console.log("bruh", jobedit);
    jobedit.RateSum = req.body.rating + jobedit.RateSum;
    jobedit.Ratings = jobedit.Ratings + 1;
    // console.log(jobedit);
    // res.json(jobedit);

    const savedjobedit = await jobedit.save();

    const savedtoedit = await toedit.save();
    res.json(savedjobedit);
  } catch (err) {
    res.json(err);
  }
});

module.exports = router;

// {
//     "title": " programmer ",
//     "RecruiterName": "harsha",
//     "RecruiterEmail" : "harsha@gmail.com",
//     "maxApplications": "50",
//     "availPos": "20",
//     //"DatePosted": req.body.DatePosted,
//     "DeadlineDate": "2021-1-1",
//     "SkillSet": " [ 'C++','Python']",
//     "jobTime": "Full-Time",
//     "duration": "4",
//     "salary": "25000",
//     "RateSum": "0",
//     "Ratings": "5"
// }
