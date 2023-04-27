const Schema = require('mongoose').Schema;
const db = require('../config/db');

const Customer = db.model('Customer', {
    name: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    description: { type: String },
    location: { type: String },
    customer: {
        type: Schema.Types.ObjectId,
        ref: 'Customer',
    },
});
