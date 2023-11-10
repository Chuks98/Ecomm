const mongoose = require('mongoose');
const Profile = require('./profileModel');

const customerSchema = new mongoose.Schema({
    profileId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profile'
    },
    email: {
        type: String,
        required: true
    }
});

const Customer = mongoose.model('customer', customerSchema);

module.exports = Customer;
