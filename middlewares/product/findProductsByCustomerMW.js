/**
 * Finds the products of the customer middleware
 * @param {*} objRepo
 * @returns
 */

const findProductsByCustomerMW = (objRepo) => {
    return (req, res, next) => {
        res.locals.products = res.locals.customer.products;
        return next();
    };
};

module.exports = findProductsByCustomerMW;
