const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI, {}, (err) => {
    if (err) {
        console.log('MongoDB connection error: ' + err);
        process.exit(1);
    } else {
        console.log('MongoDB connection successful');
    }
});

module.exports = mongoose;
