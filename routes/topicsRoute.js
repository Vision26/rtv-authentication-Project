const express = require('express')
const topicsRoute = express.Router()
const Topics = require('../models/Topics.js')

topicsRoute.post('/', (req, res, next) => {
    req.body.user = req.auth._id
    const newTopic = new Topics(req.body)
    newTopic.save((err, saveTopic) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(201).send(saveTopic)
    })
})

topicsRoute.put('/upvotes/:topicId', (req, res, next) => {
    Topics.findOneAndUpdate(
        { _id: req.params.topicId },
        { $inc: { votes: 1 } },
        { new: true },
        (err, updateVote) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(201).send(updateVote)
        }
    )
})

topicsRoute.put('/downvotes/:topicId', (req, res, next) => {
    Topics.findOneAndUpdate(
        { _id: req.params.topicId },
        { $inc: { votes: -1 } },
        { new: true },
        (err, updateDwnVote) => {
            if(err){
                res.status(500)
                return next(err)
            }
            return res.status(201).send(updateDwnVote)
        }
    )
})

module.exports = topicsRoute