const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: String,
    phone: String,
    firstLevelFriends: [ {type: mongoose.Schema.Types.ObjectId, ref: 'User'} ]
}, {
    timestamps: true
});

module.exports = mongoose.model('User', UserSchema);
