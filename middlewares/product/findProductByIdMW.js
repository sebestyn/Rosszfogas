const validator = require('validator');
var { testProducts } = require('../../db/example');

const findProductByIdMW = (objRepo) => {
    return async (req, res, next) => {
        const { isMongoId, isEmpty } = validator;
        const product_id = req.params.id;

        // Check if id is valid
        if (isEmpty(product_id + '') || !isMongoId(product_id + '')) {
            res.locals.msg = 'Hibás termék azonosító!';
            res.locals.msgType = 'error';
            return next();
        }

        try {
            res.locals.product = await objRepo.Product.findOne({ _id: product_id });
        } catch (err) {
            res.locals.product = undefined;
            res.locals.msg = 'Adatbázis hiba!';
            res.locals.msgType = 'error';
        }

        return next();
    };
};

module.exports = findProductByIdMW;
