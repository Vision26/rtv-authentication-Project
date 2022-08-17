const mongoose = require('mongoose')
const Schema = mongoose.Schema

const topicSchema = new Schema({
title:{
    type: String,
    required: true
},
description:{
    type: String
},
votes:{
    type: Number,
    default: 0
}
})

module.exports = mongoose.model('Topics', topicSchema)