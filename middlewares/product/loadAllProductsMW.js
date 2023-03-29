/**
 * Load all products from the database and put them on res.locals.products middleware
 * @param {*} objRepo - object repository
 * @returns {function} - middleware function
 */

var { testProducts } = require('../../db_simulation');

const loadAllProductsMW = (objRepo) => {
    return (req, res, next) => {
        res.locals.products = testProducts;
        return next();
    };
};

module.exports = loadAllProductsMW;
