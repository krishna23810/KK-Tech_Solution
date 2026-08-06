 const mongoose = require('mongoose');
 require('dotenv').config();
 
 exports.connectDB = () => {
    const dbURI = process.env.DB_URI;
    mongoose.connect(dbURI)
    .then(() => {
        console.log('Database connected successfully');
    })
    .catch((err) => {
        console.error('Database connection error:', err);
        console.error('Please check your DB_URI in .env file, internet connection, or MongoDB Atlas IP Whitelist.');
        process.exit(1); // Exit the process with failure
    });
}
