const express = require('express')
const topicsRoute = express.Router()
const Topics = require('../models/Topics.js')
const jwt = require('jsonwebtoken')



module.exports = topicsRoute