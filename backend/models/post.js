const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    published: { type: Boolean, required: true },
    body: { type:  String, required: true },
    date_posted: { type: Date }
})