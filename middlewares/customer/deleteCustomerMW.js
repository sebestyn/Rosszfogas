/**
 * Delete customer middleware
 * @param {*} objRepo - object repository
 * @returns {function} - middleware function
 */

var { testCustomers } = require('../../db/example');

const deleteCustomerMW = (objRepo) => {
    return async (req, res, next) => {
        if (req.params.id === undefined) return next();

        // Delete customer from database
        await objRepo.Customer.deleteOne({ _id: req.params.id });

        res.locals.msg = 'Sikeres törlés!';
        res.locals.msgType = 'success';

        return next();
    };
};

module.exports = deleteCustomerMW;
