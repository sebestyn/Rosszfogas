/**
 * Create or modify product middleware
 * @param {*} objRepo - object repository
 * @returns {function} - middleware function
 */

var { testProducts } = require('../../db_simulation');

const testProduct = {
    id: 0,
    name: 'Test product',
    price: 1000,
    description: 'Test product description',
    location: 'Test product location',
    customer: 'Test product customer',
};

const cremoProductMW = (objRepo) => {
    return (req, res, next) => {
        // Create new product if id is undefined
        if (req.params.id === undefined) {
            res.locals.new_product = testProduct;

            // Save product to database
            testProducts.push(res.locals.new_product);
        }

        // Update product if id is defined
        else {
            // TODO
        }

        return next();
    };
};

module.exports = cremoProductMW;
