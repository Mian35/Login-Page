const express = require("express");
const { body, validationResult } = require('express-validator');
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken')
const JWT_SECRET = "qasimisagoodb$oy";

const router = express.Router();
const User = require("../model/UserLogin")
router.post('/', [

    body('password', ' Password cannot be blank').isLength({ min: 5 }).exists(),
    body('email', 'Please enter a valid Email Address').isEmail(),
], async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()


        })

    }
    const { email, password } = req.body
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Please try to login with correct credentials" })
        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            success = false;
            return res.status(400).json({ success, error: "The password you have given is not correct" })
        }
        const data = {
            user: {
                id: user.id
            }
        }
        const user_token = jwt.sign(data, JWT_SECRET)
        success = true;
        res.json({ success, user_token })
    }
    catch (error) {
        console.error(error.message)
        res.status(500).send("Internal Server Error")
    }



})


module.exports = router;