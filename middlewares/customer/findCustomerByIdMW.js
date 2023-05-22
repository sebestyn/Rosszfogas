const validator = require('validator');
var { testCustomers } = require('../../db/example');

const findCustomerByIdMW = (objRepo) => {
    return async (req, res, next) => {
        const { isMongoId, isEmpty } = validator;
        const customer_id = req.params.id;

        // Check if id is valid
        if (isEmpty(customer_id + '') || !isMongoId(customer_id + '')) {
            res.locals.msg = 'Hibás termék azonosító!';
            res.locals.msgType = 'error';
            return next();
        }

        try {
            res.locals.customer = await objRepo.Customer.findOne({ _id: req.params.id });
        } catch (err) {
            res.locals.product = undefined;
            res.locals.msg = 'Adatbázis hiba!';
            res.locals.msgType = 'error';
        }

        return next();
    };
};

module.exports = findCustomerByIdMW;
