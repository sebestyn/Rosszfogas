/**
 * Finds the products of the customer middleware
 * @param {*} objRepo
 * @returns
 */

const findProductsByCustomerMW = (objRepo) => {
    return async (req, res, next) => {
        const { isMongoId, isEmpty } = objRepo.validator;
        const customer_id = req.params.id;

        // Check if id is valid
        if (isEmpty(customer_id + '') || !isMongoId(customer_id + '')) {
            res.locals.msg = 'Hibás termék azonosító!';
            res.locals.msgType = 'error';
            return next();
        }

        try {
            res.locals.customer = await objRepo.Customer.findOne({ _id: customer_id });
            res.locals.products = await objRepo.Product.find({ customer: customer_id });
        } catch (err) {
            res.locals.products = [];
            res.locals.msg = 'Adatbázis hiba!';
            res.locals.msgType = 'error';
        }

        return next();
    };
};

module.exports = findProductsByCustomerMW;
