const Schema = require('mongoose').Schema;
const mongoose = require('mongoose');

const CustomerSchema = new Schema({
    name: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    products: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
    joined: { type: Date, default: Date.now },
});

const Customer = mongoose.models.Customer || mongoose.model('Customer', CustomerSchema);

module.exports = Customer;
