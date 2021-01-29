const { date } = require("@hapi/joi");
const express = require("express");
const { findOne } = require("../models/Amodel/AppList_A");
const router = express.Router();
const application = require("../models/Amodel/AppList_A");
const Jobs = require("../models/Jobs");
const User = require("../models/Users");
const Aprofile = require("../models/Amodel/Aprofile");
const Rprofile = require("../models/Rmodel/Rprofile");

router.get("/", async (req, res) => {
  await application.find().then((items) => res.json(items));
});

router.get("/byapplicant/:Id", async (req, res) => {
  await application
    .find({ applicantID: req.params.id })
    .then((o) => res.json(o));
});

router.get("/:Aid/:Jid", async (req, res) => {
  const temp = await application.findOne({
    applicantID: req.params.Aid,
    jobID: req.params.Jid,
  });
  res.json(temp);
});
router.get("/recruiter/:Rid/:Jid", async (req, res) => {
  const temp = await application.find({
    recruiterID: req.params.Rid,
    jobID: req.params.Jid,
  });
  res.json(temp);
});
router.post("/apply/:applicantID/:jobID", async (req, res) => {
  // req.body has the SOP
  const job = await Jobs.findOne({ _id: req.params.jobID });
  const applicant = await Aprofile.findOne({ userID: req.params.applicantID });
  const recruiter = await Rprofile.findOne({ userID: job.RecruiterID });
  // console.log(job);
  console.log("job", job);
  console.log("appl", applicant);
  console.log("recr", recruiter);
  console.log("skils", applicant.skills);
  // res.json(applicant.skills);
  const newapp = new application({
    applicantID: req.params.applicantID,
    jobID: req.params.jobID,
    aname: applicant.name,
    skills: applicant.skills.map((s) => s.value),
    rname: recruiter.name,
    jobtitle: job.title,
    aeducation: applicant.education,
    aratesum: applicant.rateSum,
    aratings: applicant.ratings,
    salary: job.salary,
    // dateofjoin,

    recruiterID: job.RecruiterID,
    state: "Applied",
    SOP: req.body.SOP,
  });
  console.log(newapp);
  // res.json(newapp);
  try {
    const savednewapp = await newapp.save();
    res.json(savednewapp);
  } catch (err) {
    console.log(err);
  }
  //  http://localhost:5000/application/apply/5ffe078dffcebb6c812423dd
});

router.post("/acceptApp/:applicationID", async (req, res) => {
  const newapp = await application.findOne({ _id: req.params.applicationID });

  newapp.state = "Accepted";

  try {
    const savednewapp = await newapp.save();
    res.json(savednewapp);
  } catch (err) {
    console.log(err);
  }
});
router.post("/rejectApp/:applicationID", async (req, res) => {
  const newapp = await application.findOne({ _id: req.params.applicationID });

  newapp.state = "Rejected";
  try {
    const savednewapp = await newapp.save();
    res.json(savednewapp);
  } catch (err) {
    res.json(err);
  }
});
router.post("/shortlistApp/:applicationID", async (req, res) => {
  const newapp = await application.findOne({ _id: req.params.applicationID });
  newapp.state = "Short-listed";
  // res.json(newapp);
  try {
    const savednewapp = await newapp.save();
    res.json(savednewapp);
  } catch (err) {
    res.json(err);
  }
});

router.get("/recruiter/dashboard/:jobID", async (req, res) => {
  const list = await application.find({ jobID: req.params.ID });
  res.json(list);
});

router.get("/applicant/dashboard/:applicantID", async (req, res) => {
  const list = await application.find({ applicantID: req.params.applicantID });
  res.json(list);
});

router.get("/findapp/findapp/:ID", async (req, res) => {
  const applist = await application.find({ applicantID: req.params.ID });
  // .then((o) => {
  //   res.json(o);
  // })
  // .catch((err) => res.json(err));
  res.json(applist);
  //   applist.map((s) => console.log(s));
});
router.get("/byrecruiter/by/rec/:ID", async (req, res) => {
  const temp = await application.find({ recruiterID: req.params.ID });
  res.json(temp);
});

router.post("/abcde/xyz/omg/fku/:appID/:Eid", async (req, res) => {
  const temp = await Aprofile.findOne({ userID: req.params.Eid });

  (temp.rateSum = temp.rateSum + req.body.rating),
    (temp.ratings = temp.ratings + 1);
  console.log("nr");
  console.log(temp);
  const temp2 = await application.findOne({ _id: req.params.appID });
  temp2.Jbool = true;
  console.log(temp2);
  try {
    const x = await temp.save();
    const y = await temp2.save();
    res.json(y);
  } catch (err) {
    res.json(err);
  }
});
module.exports = router;
