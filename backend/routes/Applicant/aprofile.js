const express = require("express");
const { findOne } = require("../../models/Amodel/Aprofile");
const router = express.Router();
const Aprofile = require("../../models/Amodel/Aprofile");
const User = require("../../models/Users");
const Arating = require("../../models/Amodel/Arating");

router.get("/:ID", async (req, res) => {
  const temp = await Aprofile.findOne({ userID: req.params.ID });
  res.json(temp);
});

router.post("/post/:ID", async (req, res) => {
  const temp = await Aprofile.findOne({ userID: req.params.ID });
  if (!temp) {
    const rate = await Arating.findOne({ applicantID: req.params.ID });
    const box = await User.findOne({ _id: req.params.ID });
    const profile = new Aprofile({
      userID: req.params.ID,
      name: req.body.name,
      email: box.email,
      education: req.body.education,
      skills: req.body.skills,
      rateSum: 0,
      ratings: 0,
    });

    console.log(profile);
    // res.json(profile);
    try {
      const savedprofile = await profile.save();
      res.send(savedprofile);
    } catch (err) {
      res.send(err);
    }
  } else {
    const toedit = await Aprofile.findOne({ userID: req.params.ID });
    (toedit.name = req.body.name),
      // toedit.email  = req.body.email,
      (toedit.education = req.body.education);
    toedit.skills = req.body.skills;

    console.log(toedit);
    try {
      const savededit = await toedit.save();
      res.json(savededit);
    } catch (err) {
      res.send(err);
    }
  }
});
////////////////example data type given below///////////////
// {
//     "name": "asia",
//     "email": "asia@gmail.com",
//     "education": [ {
//         "Instance": {
//             "InstituteName": "FIITJEE",
//             "Year" : {
//                 "start" : " 5",
//                 "end" : "6"
//             }
//         }
//     },
//         {
//         "Instance": {
//             "InstituteName": "Narayana",
//             "Year" : {
//                 "start" : " 10",
//                 "end" : "11"
//             }

//         }
//     }
//     ]
// }
//////////////////////////
// {
//     education: [ { Instance: [Object] }, { Instance: [Object] } ],
//     _id: 5ffe5964924f0546a51d2890,
//     name: 'asia',
//     email: 'asia@gmail.com'
//   }

// router.post("/edit/:ID", async (req, res) => {
//   const toedit = await Aprofile.findOne({ userID: req.params.ID });
//   (toedit.name = req.body.name),
//     // toedit.email  = req.body.email,
//     (toedit.education = req.body.education);

//   console.log(toedit);
//   try {
//     const savededit = await toedit.save();
//     res.json(savededit);
//   } catch (err) {
//     res.send(err);
//   }
//   // res.send('gklsg');
// });

module.exports = router;
