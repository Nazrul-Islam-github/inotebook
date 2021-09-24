const express = require('express')
const Router = express.Router()
const User = require('../model/User')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const fetchUser = require('../middleware/fetchUser')

// user create route :/api/auth
Router.post('/createuser', [
    body('name', 'Enter a vaild name').isLength({ min: 5 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password Must be 8 cherecter or longer').isLength({ min: 8 })


], async (req, res) => {

    // --------------Validate User info-----------
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        // --------------Validate User info End-----------
        const { name, email, password } = req.body;
        const error = []
        const user = await User.findOne({ email: email });
        if (user) {
            error.push({ msg: "This email is already exists" })
            return res.status(400).json(error)
        }
        else {
            const saltRound = 12
            const newUser = new User({
                name: name,
                email: email,
                password: password
            })
            bcrypt.genSalt(saltRound, (error, salt) => {
                if (error) throw error;
                bcrypt.hash(newUser.password, salt, (error, hash) => {
                    if (error) throw error;
                    newUser.password = hash
                    newUser.save()
                        .then(user => {
                            const data = {
                                user: {
                                    id: user.id
                                }
                            }


                            const authToken = jwt.sign(data, process.env.JWT_TOKEN)

                            return res.json({ authToken })
                        })
                        .catch(error => {
                            console.error(error);
                        })

                })
            })

        }
    } catch (error) {
        console.error(error.message)
        return res.status(500).send("Server Error ")
    }


})


// authenticate user route /api/auth/login
Router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password can not be blank').exists(),
], async (req, res) => {

    // if user enter invalid email then return 400 error code
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    const { email, password } = req.body

    try {
        let user = await User.findOne({ email: email });
        if (!user) return res.status(400).json({ error: "invalid info " });

        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) { return res.status(400).json({ error: "invalid info " }); }



        const data = {
            user: {
                id: user.id
            }
        }


        const authToken = jwt.sign(data, process.env.JWT_TOKEN)
        return res.json({ authToken })
    } catch (error) {
        return res.status(500).send("server error")
    }

});


// get login user details route /api/user/getuser
Router.post('/getuser', fetchUser, async (req, res) => {
    try {
        const userId = req.user.id
        const user = await User.findById(userId).select("-password")
        res.send(user)
    } catch (error) {
        console.error(error.message)
        return res.status(400).json({ error: "invalid info " });
    }


})
module.exports = Router