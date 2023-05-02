var { testCustomers } = require('../../db/example');

/**
 * Load all customers from database to res.locals.customers middleware
 * @param {*} objRepo - Object repository
 * @returns {function} - Middleware function
 */
const loadAllCustomersMW = (objRepo) => {
    return async (req, res, next) => {
        const customers = await objRepo.Customer.find({});
        res.locals.customers = customers;
        return next();
    };
};

module.exports = loadAllCustomersMW;
