/**
 * Customer buy a product middleware
 * @param {*} objRepo
 * @returns
 */
const buyProductMW = (objRepo) => {
    return (req, res, next) => {
        if (typeof req.body === 'undefined' || typeof req.body.product === 'undefined') {
            return next();
        }
        res.locals.product = req.body.product;
        return next();
    };
};

module.exports = buyProductMW;
