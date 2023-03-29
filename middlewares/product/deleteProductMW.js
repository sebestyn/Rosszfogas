/**
 * Delete product middleware
 * @param {*} objRepo - object repository
 * @returns {function} - middleware function
 */

var { testProducts } = require('../../db_simulation');

const deleteProductMW = (objRepo) => {
    return (req, res, next) => {
        if (req.params.id === undefined) return next();

        // TODO: Delete product from database

        return next();
    };
};

module.exports = deleteProductMW;
