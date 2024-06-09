const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    email: { type: String, maxLength: 70, required: true },
    password: { type: String, maxLength: 40, required: true },
    posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }]
});

UserSchema.virtual('blogger').get(function() {
    if (this.posts.length === 0) {
        return false;
    } else {
        return true;
    }
});

module.exports = mongoose.model('User', UserSchema);

