const express = require("express");
const router = express.Router();
const multer  = require('multer');
const cloudinary = require('cloudinary');
const User = require("../../db/models/user");
const passport = require("../../passport");

cloudinary.config(process.env.CLOUDINARY_URL);

const upload = multer({dest: "/tmp/img_uploads"}).single("photo");

// router.get("/google", passport.authenticate("google", { scope: ["profile"] }))

// router.get("/google/callback",
// 	passport.authenticate("google", {
// 		successRedirect: "http://localhost:3000",
// 		failureRedirect: "http://localhost:3000/login"
// 	}))

router.get('/user/:id', (req, res, next) => {
	console.log('===== user!!======')
	const id = req.params.id;
	User.findOne({
		'_id': id
	}, (err, userMatch) => {
		if (userMatch) {
			res.json(userMatch)
		}else{
			res.json({"ERROR": "NO MATCH"})
		}
	})
})

router.post(
	'/login',
	function(req, res, next) {
		console.log('================')
		next()
	},
	passport.authenticate('local'),
	(req, res) => {
		console.log('POST to /login')
		const user = JSON.parse(JSON.stringify(req.user)) // hack
		const cleanUser = Object.assign({}, user)
		if (cleanUser.local) {
			console.log(`Deleting ${cleanUser.local.password}`)
			delete cleanUser.local.password
		}
		console.log(cleanUser)
		res.json({ user: cleanUser })
	}
)

router.post('/logout', (req, res) => {
	if (req.user) {
		req.session.destroy()
		res.clearCookie('connect.sid') // clean up!
		return res.json({ msg: 'logging you out' })
	} else {
		return res.json({ msg: 'no user to log out!' })
	}
})

router.post('/signup', (req, res) => {
	// ADD VALIDATION
	upload(req, res, function(upErr) {
		if (upErr){
			res.json(upErr);
		} else {
			const { username, password, firstName, lastName} = req.body
			const {path, originalname} = req.file
			cloudinary.v2.uploader.upload(path, 
				{
					public_id: originalname,
					resource_type: "image"
				},
				(cloudErr, cloudRes) => {
					console.log(req.body);
					const photo = cloudRes.url;
				if (cloudErr) {
					res.json(cloudErr);
				} else {
					User.findOne({ 'local.username': username }, (err, userMatch) => {
					if (userMatch) {
						return res.json({
							error: `Sorry, already a user with the username: ${username}`
						})
					}
					const newUser = new User({
						'local.username': username,
						'local.password': password,
						firstName,
						lastName,
						photo
					});
					newUser.save((dbErr, savedUser) => {
						if (dbErr) return res.json(dbErr)
						return res.json(savedUser)
					})
					})
				}
			});
		}
    })
})

module.exports = router
