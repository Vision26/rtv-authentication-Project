const express = require('express')
const topicsRoute = express.Router()
const Topics = require('../models/Topics.js')

//GET all topics
topicsRoute.get('/', (req, res, next) => {
    Topics.find((err, topic) => {
        if(err){
            res.status(500)
            return next(err)
        }
        return res.status(200).send(topic)
    })
})

//GET all topics by user Id
topicsRoute.get('/user', (req, res, next) => {
Topics.find( { user: req.auth._id }, (err, topic) => {
    if(err){
        res.status(500)
        return next(err)
    }
    return res.status(200).send(topic)
})
})

//POST Topics
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

//Upvote by specific Id
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

//Downvote PUT by specifc Id
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