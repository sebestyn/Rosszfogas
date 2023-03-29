require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const helmet = require('helmet');
const PORT = process.env.PORT || 3000;

// Middlewares - default
const renderMW = require('./middlewares/renderMW');
const redirectMW = require('./middlewares/redirectMW');

// Middlewares - products
const loadAllProductsMW = require('./middlewares/product/loadAllProductsMW');
const cremoProductMW = require('./middlewares/product/cremoProductMW');
const findProductByIdMW = require('./middlewares/product/findProductByIdMW');
const deleteProductMW = require('./middlewares/product/deleteProductMW');
const buyProductMW = require('./middlewares/product/buyProductMW');
const findProductsByCustomerMW = require('./middlewares/product/findProductsByCustomerMW');

// Middlewares - customers
const loadAllCustomersMW = require('./middlewares/customer/loadAllCustomersMW');
const cremoCustomerMW = require('./middlewares/customer/cremoCustomerMW');
const findCustomerByIdMW = require('./middlewares/customer/findCustomerByIdMW');
const deleteCustomerMW = require('./middlewares/customer/deleteCustomerMW');

// Use Global middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(helmet());

// Set engine to ejs
app.set('view engine', 'ejs');

// Connect to mongodb
// mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

/////////////
// Routers //
/////////////

const objRepo = {};

// - Home
app.get('/', renderMW(objRepo, 'index'));

////////////
// Products
////////////

// - Get all products
app.get('/products', loadAllProductsMW(objRepo), loadAllCustomersMW(objRepo), renderMW(objRepo, 'products'));

// - Create product or modify view
app.get('/product/create/:id?', findProductByIdMW(objRepo), renderMW(objRepo, 'new_product'));

// - Create product
app.post('/product', cremoProductMW(objRepo), redirectMW(objRepo, '/products'));

// - Modify product
app.post('/product/edit/:id', cremoProductMW(objRepo), redirectMW(objRepo, '/products'));

// - Delete product
app.post('/product/delete/:id', deleteProductMW(objRepo), redirectMW(objRepo, '/products'));

// - Buy product by customer
app.post('/product/buy/:id', buyProductMW(objRepo), redirectMW(objRepo, '/products'));

// - Get customer's buyed products
app.get('/products/customer/:id', findCustomerByIdMW(objRepo), findProductsByCustomerMW(objRepo), redirectMW(objRepo, '/customers'));

////////////
// Customers
////////////

// - Get all customers
app.get('/customers', loadAllCustomersMW(objRepo), renderMW(objRepo, 'customers'));

// - Create customer or modify view
app.get('/customer/create/:id?', findCustomerByIdMW(objRepo), renderMW(objRepo, 'new_customer'));

// - Create customer
app.post('/customer', cremoCustomerMW(objRepo), redirectMW(objRepo, '/customers'));

// - Modify customer
app.post('/customer/edit/:id', cremoCustomerMW(objRepo), redirectMW(objRepo, '/customers'));

// - Delete customer
app.post('/customer/delete/:id', deleteCustomerMW(objRepo), redirectMW(objRepo, '/customers'));

// Server listening
app.listen(PORT, () => {
    console.log(`The app start on http://localhost:${PORT}`);
});
