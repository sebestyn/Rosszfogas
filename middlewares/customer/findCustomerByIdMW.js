var { testCustomers } = require('../../db/example');

const findCustomerByIdMW = (objRepo) => {
    return async (req, res, next) => {
        if (req.params.id === undefined) return next();

        res.locals.customer = await objRepo.Customer.findOne({ _id: req.params.id });

        return next();
    };
};

module.exports = findCustomerByIdMW;
