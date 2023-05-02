var { testProducts } = require('../../db/example');

const findProductByIdMW = (objRepo) => {
    return async (req, res, next) => {
        const productId = req.params.id;

        if (productId === undefined) return next();

        res.locals.product = await objRepo.Product.findOne({ _id: productId });

        return next();
    };
};

module.exports = findProductByIdMW;
