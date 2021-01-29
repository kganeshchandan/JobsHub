const express = require("express");
const router = express.Router();
const Rprofile = require("../../models/Rmodel/Rprofile");
const User = require("../../models/Users");

router.get("/:ID", async (req, res) => {
  const temp = await Rprofile.findOne({ userID: req.params.ID });
  res.json(temp);
});

// router.post("")
router.post("/saveprofile/:ID", async (req, res) => {
  const box = await User.findOne({ _id: req.params.ID });
  const temp = await Rprofile.findOne({ userID: req.params.ID });
  if (!temp) {
    const profile = new Rprofile({
      name: req.body.name,
      userID: req.params.ID,
      email: box.email,
      contact: req.body.contact,
      BioData: req.body.BioData,
    });
    console.log("..");
    console.log(profile);
    try {
      const savedprofile = await profile.save();
      res.send(savedprofile);
    } catch (err) {
      res.status(400).json(err);
    }
  } else {
    const toedit = await Rprofile.findOne({ userID: req.params.ID });
    (toedit.name = req.body.name),
      // toedit.email  = req.body.email,
      (toedit.BioData = req.body.BioData),
      (toedit.contact = req.body.contact);
    console.log("||");
    console.log(toedit);
    try {
      const savededit = await toedit.save();
      res.json(savededit);
    } catch (err) {
      res.status(400).json(err);
    }
  }
});

// router.post("/edit/:ID", async (req, res) => {
//   const toedit = await Rprofile.findOne({ userID: req.params.ID });
//   (toedit.name = req.body.name),
//     // toedit.email  = req.body.email,
//     (toedit.BioData = req.body.BioData),
//     (toedit.contact = req.body.contact);

//   console.log(toedit);
//   try {
//     const savededit = await toedit.save();
//     res.json(savededit);
//   } catch (err) {
//     res.send(err);
//   }
// });

module.exports = router;
