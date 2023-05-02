const mongoose = require('mongoose');
require('dotenv').config();

console.log(process.env.MONGODB_URI);

mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGODB_URI, {}, (err) => {
    if (err) {
        console.log('MongoDB connection error: ' + err);
        process.exit(1);
    } else {
        console.log('MongoDB connection successful');
    }
});

module.exports = mongoose;
