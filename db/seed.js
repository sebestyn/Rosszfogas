const db = require('./config');
const Product = require('../models/product');
const Customer = require('../models/customer');

const testProducts = require('./example').testProducts;
const testCustomers = require('./example').testCustomers;

const seed = async () => {
    try {
        await Product.deleteMany({});
        await Customer.deleteMany({});
    } catch (err) {
        console.log(err);
        process.exit();
    }

    try {
        await Product.insertMany(testProducts);
        console.log('Products inserted');
        await Customer.insertMany(testCustomers);
        console.log('Customers inserted');
    } catch (err) {
        console.log(err);
        process.exit();
    }

    await db.disconnect();
    console.log('Seeding done');
    process.exit();
};

seed();
