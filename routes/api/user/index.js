const express = require('express');
const router = express.Router();
const db = require("../../../db/models");

router.get("/find/:uid", (req,res) => {
    db.User.findOne({_id: req.params.uid})
    .then((userRes) => {
        const userInfo = {
            firstName: userRes.firstName,
            lastName: userRes.lastName,
            photo: userRes.photo
        };
        res.json(userInfo);
    })
    .catch(function (err) {
        res.json(err);
    });
})

router.get("/", (req,res) => {
    db.User.findOne({_id: req.user._id})
    .populate([
        {path: 'saved'}, 
        {path: 'ignored'}
    ])
    .then((userRes) => {
        res.json(userRes);
    })
    .catch(function (err) {
        res.json(err);
    });
})

module.exports = router;