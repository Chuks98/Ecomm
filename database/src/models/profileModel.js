const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        
    },
    password: {
        type: String,
        required: true
    },
    streetAddress: {
        type: String,
        
    },
    city: {
        type: String,
        
    },
    state: {
        type: String,
        
    },
    country: {
        type: String,
        
    },
    userType: {
        type: String,
        enum: ['admin', 'customer'], // Set of possible values
        required: true
    }
});

const Profile = mongoose.model('profile', profileSchema);

module.exports = Profile;
