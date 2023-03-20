require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const helmet = require('helmet');
const PORT = process.env.PORT || 3000;

// global middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(helmet());

// set engine to ejs
app.set('view engine', 'ejs');

// connect to mongodb
// mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

/////////////s
// Routers //
/////////////

// - Redirect to /product
app.get('/', (req, res) => {
    res.redirect('/product');
});

// - Get all products
app.get('/product', (req, res) => {
    res.render('products');
});

// - Create one product view
app.get('/product/create', (req, res) => {
    res.render('new_product');
});

// - Create one product
app.post('/product', (req, res) => {
    res.send('Create one product');
});

// - Edit one product
app.patch('/product/:id', (req, res) => {
    res.send('Edit one product');
});

// - Delete one product
app.delete('/product/:id', (req, res) => {
    res.send('Delete one product');
});

// - Get all customers
app.get('/customer', (req, res) => {
    res.render('customers');
});

// - Create one customer view
app.get('/customer/create', (req, res) => {
    res.render('new_customer');
});

// - Create one customer
app.post('/customer', (req, res) => {
    res.send('Create one customer');
});

// - Edit one customer
app.patch('/customer/:id', (req, res) => {
    res.send('Edit one customer');
});

// - Delete one customer
app.delete('/customer/:id', (req, res) => {
    res.send('Delete one customer');
});

// Server listening
app.listen(PORT, () => {
    console.log(`The app start on http://localhost:${PORT}`);
});
