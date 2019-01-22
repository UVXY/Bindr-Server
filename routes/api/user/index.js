const express = require('express');
const router = express.Router();
const db = require('../../db/models');

router.get("/find/:uid", (req,res) => {
    db.User.findOne({_id: req.params.uid})
    .populate([
        {path: 'saved'}, 
        {path: 'ignored'}
    ])
    .then((userRes) => {
        const userInfo = {
            firstName: userRes.firstName,
            lastName: userRes.lastName,
            image: userRes.image
        };
        res.json(userInfo);
    })
})

router.get("/", (req,res) => {
    db.User.findOne({_id: req.body.uid})
    .populate([
        {path: 'saved'}, 
        {path: 'ignored'}
    ])
    .then((userRes) => {
        const userInfo = {
            firstName: userRes.firstName,
            lastName: userRes.lastName,
            savedBooks: userRes.saved,
            ignoredBooks: userRes.ignored,
            image: userRes.image
        };
        res.json(userInfo);
    })
})

module.exports = router;