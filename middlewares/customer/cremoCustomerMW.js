var { testCustomers } = require('../../db_simulation');

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
    return (req, res, next) => {
        // Create new customer if id is undefined
        if (req.params.id === undefined) {
            res.locals.new_customer = testCustomer;

            // Save customer to database
            testCustomers.push(res.locals.new_customer);
        }

        // Update customer if id is defined
        else {
            // TODO
        }

        return next();
    };
};

module.exports = cremoCustomerMW;
