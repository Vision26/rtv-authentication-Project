const express = require('express')
const app = express()
require('dotenv').config()
const morgan = require('morgan')
const mongoose = require('mongoose')
const { expressjwt } = require('express-jwt')

process.env.SECRET

app.use(express.json())
app.use(morgan('dev'))

mongoose.connect('mongodb://localhost:27017/rtv',
() => console.log("Data Base Connected.")
)

app.use('/auth', require('./routes/authRoute.js'))
app.use('/politicviews', expressjwt({ secret: process.env.SECRET, algorithms: ['HS256'] }))
app.use('/politicviews/topics', require('./routes/topicsRoute.js'))

app.use((err, req, res, next) => {
    console.log(err)
    if(err.name === "UnauthorizedError"){
        res.status(err.status)
    }
    return res.send({ errMsg: err.message })
})

app.listen(9000, () => {
    console.log("Server - LocalHost//9000 - Connected")
})