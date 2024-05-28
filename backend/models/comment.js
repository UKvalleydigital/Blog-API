const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User',  required: true},
    body: { type: String, required: true },
    date_posted: { type: Date }
});

module.exports = mongoose.model('Comment', CommentSchema);