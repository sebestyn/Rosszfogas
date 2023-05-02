const Schema = require('mongoose').Schema;
const mongoose = require('mongoose');

const CustomerSchema = new Schema({
    name: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    description: { type: String },
    location: { type: String },
    customer: {
        type: Schema.Types.ObjectId,
        ref: 'Customer',
    },
});

const Customer = mongoose.models.Product || mongoose.model('Product', CustomerSchema);

module.exports = Customer;
