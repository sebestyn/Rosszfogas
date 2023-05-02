var { testCustomers } = require('../../db/example');

const testCustomer = {
    id: 0,
    name: 'Uj Elek',
    email: 'uj@aaaaa.hu',
    products: [2, 3, 4],
    joined: new Date().toISOString().split('T')[0],
};

/**
 * Create a new customer and save it to the database
 * @param {*} objRepo - object repository
 * @returns {function} - middleware function
 */
const cremoCustomerMW = (objRepo) => {
    return async (req, res, next) => {
        // Create new customer if id is undefined
        if (req.params.id === undefined) {
            res.locals.new_customer = {
                name: req.body.name,
                email: req.body.email,
                products: req.body.products,
            };

            // Save customer to database
            await objRepo.Customer.create(res.locals.new_customer);
        }

        // Update customer if id is defined
        else {
            await objRepo.Customer.updateOne(
                { _id: req.params.id },
                {
                    name: req.body.name,
                    email: req.body.email,
                    products: req.body.products,
                }
            );
        }

        return next();
    };
};

module.exports = cremoCustomerMW;
