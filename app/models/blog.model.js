const mongoose = require('mongoose');

const BlogSchema = mongoose.Schema({
    heading: String,
    text: String,
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
}, {
    timestamps: true
});

module.exports = mongoose.model('Blog', BlogSchema);
