const express = require('express');
const adminRoutes = require('./routes/adminRoutes');
const productRoutes = require('./routes/productRoutes');
const app = express();
const fs = require('fs');
const cors = require('cors');
const bcrypt = require('bcrypt');
require('./connection');
const Admin = require('./models/adminModel');
const Customer = require('./models/customerModel');
const Profile = require('./models/profileModel');
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json()); 

// Specify the directory for serving static files
// app.use(express.static('public'));


// API DATA SENDING AND ROUTING
app.post('/register', async (req, res) => {
    const {username, email, password, user} = req.body;   // Assigning variables the value of the array together instead of username = req.body.username one-by-one
    console.log(email);
    try {
        // Check if email already exists
        // const existingProfile = Profile.findOne({ email });
        // console.log(existingProfile.body);

        // if (existingProfile.length != 0) {
        //     console.log('Email already exists');
        //     return res.status(400).json({ error: 'Email already exists' });
        // }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new profile
        const newProfile = new Profile({
            username: username,
            email: email,
            password: hashedPassword,
            userType: user,
        });

        // Save the profile
        await newProfile.save().then(async (resp) => {
            console.log('New profile successfully created');

            // Create and save user (admin or customer) based on userType
            // Assigning a particular profile to a user role based on the userType field in the profile model
            let newUser;
            if (user === 'admin') {
                newUser = new Admin({ profileId: resp._id, email: email });
            } else if (user === 'customer') {
                newUser = new Customer({ profileId: resp._id, email: email });
            }

            if (newUser) {
                await newUser.save();
            }

            return res.sendStatus(200);
        }).catch(e => {
            console.error('Error creating new profile.', e);
        });
    } catch (error) {
        res.status(500).json({ error: 'Registration failed' });
    }
});




app.post('/login', async (req, res) => {
    const { email, password, userType } = req.body;

    try {
        // Check if email exists
        const profile = await Profile.findOne({ email });

        if (!profile) {
            return res.status(401).json({ error: 'Email does\'t exist' });
        }

        // Compare the provided password with the hashed password
        const passwordMatch = await bcrypt.compare(password, profile.password);

        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        // Determine the user type and find the corresponding user
        let user;
        if (userType === 'admin') {
            user = await Admin.findOne({ profile: profile._id });
        } else if (userType === 'customer') {
            user = await Customer.findOne({ profile: profile._id });
        }

        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Successful login
        res.json({ message: 'Login successful' });
    } catch (error) {
        res.status(500).json({ error: 'Login failed' });
    }
});



// Use product API routes
app.use('/', productRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
