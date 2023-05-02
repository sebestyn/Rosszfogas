/**
 * Finds the products of the customer middleware
 * @param {*} objRepo
 * @returns
 */

const findProductsByCustomerMW = (objRepo) => {
    return async (req, res, next) => {
        if (req.params.id === undefined) return next();

        res.locals.products = await objRepo.Product.find({ customer: req.params.id });

        return next();
    };
};

module.exports = findProductsByCustomerMW;
