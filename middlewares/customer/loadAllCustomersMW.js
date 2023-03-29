var { testCustomers } = require('../../db_simulation');

/**
 * Load all customers from database to res.locals.customers middleware
 * @param {*} objRepo - Object repository
 * @returns {function} - Middleware function
 */
const loadAllCustomersMW = (objRepo) => {
    return (req, res, next) => {
        res.locals.customers = testCustomers;
        return next();
    };
};

module.exports = loadAllCustomersMW;
