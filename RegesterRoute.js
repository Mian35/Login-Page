const express = require("express");
const { body, validationResult } = require('express-validator');
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')
const JWT_SECRET = "qasimisagoodb$oy";



const router = express.Router();
const User = require("../model/UserLogin")
router.post('/', [
    body('username', 'Please enter a valid Username').isLength({ min: 5 }),
    body('password', ' Password cannot be blank').isLength({ min: 5 }).exists(),
    body('email', 'Please enter a valid Email Address').isEmail(),
], async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success,
            errors: errors.array()


        })

    }
    try {
        let user = await User.findOne({ email: req.body.email })
        if (user) {
            success = false;
            return res.status(400).json({ success, error: "Sorry! a user with this email already exist" })
        }
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt)
        user = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: secPass
        })
        const data = {
            user: {
                id: user.id
            }
        }
        const user_token = jwt.sign(data, JWT_SECRET)

        //.then(user => res.json(user))
        // .catch(err => {
        //console.log(err)
        // res.json({ error: "Please enter a unique value for Email ", message: err.message })
        //})
        // res.json(user)
        success = true;
        res.json({ success, user_token })
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Some error occured")
    }
})


module.exports = router;