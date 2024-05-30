const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment', required: true }],
    title: { type: String, required: true },
    published: { type: Boolean, required: true },
    text: { type:  String, maxLength: 500, required: true },
    date_posted: { type: Date, required: true }
})

module.exports = mongoose.model('Post', PostSchema)