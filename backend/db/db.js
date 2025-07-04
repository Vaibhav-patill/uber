const mongoose = require('mongoose');

function connectDB() {
    mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        console.log('MongoDB connected successfully');
    })
    .catch(err => {
        console.error('MongoDB connection error:', err);
        process.exit(1); // Exit the process with failure
    });
}

module.exports = connectDB;