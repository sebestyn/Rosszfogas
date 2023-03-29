/**
 * Delete customer middleware
 * @param {*} objRepo - object repository
 * @returns {function} - middleware function
 */

var { testCustomers } = require('../../db_simulation');

const deleteCustomerMW = (objRepo) => {
    return (req, res, next) => {
        if (req.params.id === undefined) return next();

        // TODO: Delete customer from database

        return next();
    };
};

module.exports = deleteCustomerMW;
