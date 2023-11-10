const mongoose = require('mongoose');
const Profile = require('./profileModel');

const adminSchema = new mongoose.Schema({
    profileId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Profile,
        required: true
    },
    email: {
        type: String,
        required: true
    }
});

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
