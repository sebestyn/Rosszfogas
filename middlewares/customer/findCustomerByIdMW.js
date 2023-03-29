var { testCustomers } = require('../../db_simulation');

const findCustomerByIdMW = (objRepo) => {
    return (req, res, next) => {
        if (req.params.id === undefined) return next();

        const customer = testCustomers.find((c) => {
            return c.id === Number(req.params.id);
        });

        if (customer) {
            res.locals.customer = customer;
        }

        return next();
    };
};

module.exports = findCustomerByIdMW;
