/**
 * Load all products from the database and put them on res.locals.products middleware
 * @param {*} objRepo - object repository
 * @returns {function} - middleware function
 */

var { testProducts } = require('../../db/example');

const loadAllProductsMW = (objRepo) => {
    return async (req, res, next) => {
        // Get all products from the database
        const products = await objRepo.Product.find({});
        res.locals.products = products;
        return next();
    };
};

module.exports = loadAllProductsMW;
