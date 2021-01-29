const express = require('express');
const router = express.Router();

const Arating = require('../models/Amodel/Arating');

router.post('/makerating/:ID', async (req, res) =>{
    const rate = new Arating({
        rateSum: 0,
        ratings: 0,
        applicantID : req.params.ID
    }) ;
    try {
        const savedrating = await rate.save();
        res.send(savedrating);
    }catch (err ){
        res.send(err);
    }
});

module.exports = router;