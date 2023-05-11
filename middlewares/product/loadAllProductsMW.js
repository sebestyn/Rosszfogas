/**
 * Load all products from the database and put them on res.locals.products middleware
 * @param {*} objRepo - object repository
 * @returns {function} - middleware function
 */

var { testProducts } = require('../../db/example');

const loadAllProductsMW = (objRepo) => {
    return async (req, res, next) => {
        try {
            // Get all products from the database
            res.locals.products = await objRepo.Product.find({});
        } catch (err) {
            res.locals.products = [];
            res.locals.msg = 'Adatbázis hiba!';
            res.locals.msgType = 'error';
        }
        return next();
    };
};

module.exports = loadAllProductsMW;
