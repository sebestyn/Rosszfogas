var { testCustomers } = require('../../db/example');

/**
 * Load all customers from database to res.locals.customers middleware
 * @param {*} objRepo - Object repository
 * @returns {function} - Middleware function
 */
const loadAllCustomersMW = (objRepo) => {
    return async (req, res, next) => {
        try {
            // Get all products from the database
            res.locals.customers = await objRepo.Customer.find({});
        } catch (err) {
            res.locals.customers = [];
            res.locals.msg = 'Adatbázis hiba!';
            res.locals.msgType = 'error';
        }
        return next();
    };
};

module.exports = loadAllCustomersMW;
