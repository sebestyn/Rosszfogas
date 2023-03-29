var { testProducts } = require('../../db_simulation');

const findProductByIdMW = (objRepo) => {
    return (req, res, next) => {
        const productId = req.params.id;

        if (productId === undefined) return next();

        const product = testProducts.find((p) => {
            return p.id === Number(productId);
        });

        if (product) {
            res.locals.product = product;
        }

        return next();
    };
};

module.exports = findProductByIdMW;
