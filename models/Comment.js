const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentSchema = ({
    comments:{
        type:String
    },
    user:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
})

module.exports = mongoose.model('Comments', commentSchema)