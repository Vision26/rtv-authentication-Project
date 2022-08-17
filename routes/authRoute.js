const express = require('express')
const authRoute = express.Router()
const User = require('../models/User.js')
const jwt = require('jsonwebtoken')

//SignUp
authRoute.post('/signup', (req, res, next) => {
    User.findOne({ username: req.body.username.toLowerCase() }, (err, user) => {
        if(err){
            res.status(500)
            return next(err)
        }
        if(user){
            res.status(403)
            return next(new Error("Username is already taken."))
        }
        const newUser = new User(req.body)
        newUser.save((err, saveUser) => {
            if(err){
                res.status(500)
                return next(err)
            }
            //payload
            const token = jwt.sign(saveUser.toObject(), process.env.SECRET)
            return res.status(201).send({ token, user:saveUser })
        })
    })
})

//Login
authRoute.post('/login', (req, res, next) => {
    User.findOne( {username: req.body.username.toLowerCase() }, (err, user) => {
        if(err){
            res.status(500)
            return next(err)
        }
        if(!user){
            res.status(403)
            return next(new Error("Username is incorrect."))
        }
        if(req.body.password !== user.password){
            res.status(403)
            return next(new Error("Password is incorrect."))
        }
        const token = jwt.sign(user.toObject(), process.env.SECRET)
        return res.status(200).send( { token, user } )
    })
})
module.exports = authRoute