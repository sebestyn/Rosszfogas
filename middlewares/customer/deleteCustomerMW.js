/**
 * Delete customer middleware
 * @param {*} objRepo - object repository
 * @returns {function} - middleware function
 */

const validator = require('validator');
var { testCustomers } = require('../../db/example');

const deleteCustomerMW = (objRepo) => {
    return async (req, res, next) => {
        const { isMongoId, isEmpty } = validator;
        const customer_id = req.params.id;

        // Check if id is valid
        if (isEmpty(customer_id + '') || !isMongoId(customer_id + '')) {
            res.locals.msg = 'Sikertelen!\nHiba történt a törlés során!';
            res.locals.msgType = 'error';
            return next();
        }

        try {            
            // Delete customer from database
            await objRepo.Customer.deleteOne({ _id: customer_id });
            res.locals.msg = 'Sikeres törlés!';
            res.locals.msgType = 'success';
        } catch (err) {
            res.locals.msg = 'Sikertelen!\nHiba történt a törlés során!';
            res.locals.msgType = 'error';
        }

        return next();
    };
};

module.exports = deleteCustomerMW;
