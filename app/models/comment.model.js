const mongoose = require('mongoose');

const CommentSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    blog: { type: mongoose.Schema.Types.ObjectId, ref: 'Blog' },
    message: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Comment', CommentSchema);
