const Schema = require('mongoose').Schema;
const db = require('../config/db');

const Customer = db.model('Customer', {
    name: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    products: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
    joined: { type: Date, default: Date.now },
});

module.exports = Customer;
