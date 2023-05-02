/**
 * Delete product middleware
 * @param {*} objRepo - object repository
 * @returns {function} - middleware function
 */

var { testProducts } = require('../../db/example');

const deleteProductMW = (objRepo) => {
    return async (req, res, next) => {
        if (req.params.id === undefined) return next();

        // Delete product from database
        await objRepo.Product.deleteOne({ _id: req.params.id });

        res.locals.msg = 'Sikeres törlés!';
        res.locals.msgType = 'success';

        return next();
    };
};

module.exports = deleteProductMW;
