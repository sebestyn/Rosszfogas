const validator = require('validator');

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
        const { isMongoId, isEmpty, isEmail } = validator;

        // If id is not valid --> create new customer
        if (!isMongoId(req.params.id + '')) {
            // Validate input
            if (isEmpty(req.body.name + '') || !isEmail(req.body.email + '')) {
                res.locals.msg = 'Sikertelen! \nA név és helyes email megadása kötelező!';
                res.locals.msgType = 'error';
                return next();
            }
            try {
                // Save customer to database
                await objRepo.Customer.create({
                    name: req.body.name,
                    email: req.body.email,
                    products: req.body.products,
                });
            } catch (err) {
                res.locals.msg = 'Sikertelen! \nHiba a mentés során';
                res.locals.msgType = 'error';
                return next();
            }
        }

        // Update customer if id is defined
        else {
            try {
                // Validate input
                if (isEmpty(req.body.name + '') || !isEmail(req.body.email + '')) {
                    res.locals.msg = 'Sikertelen! \nA név és helyes email megadása kötelező!';
                    res.locals.msgType = 'error';
                    return next();
                }
                await objRepo.Customer.updateOne(
                    { _id: req.params.id },
                    {
                        name: req.body.name,
                        email: req.body.email,
                        products: req.body.products,
                    }
                );
            } catch (err) {
                res.locals.msg = 'Sikertelen! \nHiba a mentés során';
                res.locals.msgType = 'error';
                return next();
            }
        }

        return next();
    };
};

module.exports = cremoCustomerMW;
