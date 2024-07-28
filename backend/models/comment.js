const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User',  required: true},
    post: { type: Schema.Types.ObjectId, ref: 'Post',  required: true},
    text: { type: String, maxLength: 10000, required: true },
    date_posted: { type: Date,  required: true }
});

module.exports = mongoose.model('Comment', CommentSchema);