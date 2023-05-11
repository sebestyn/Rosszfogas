/**
 * Delete product middleware
 * @param {*} objRepo - object repository
 * @returns {function} - middleware function
 */

var { testProducts } = require('../../db/example');

const deleteProductMW = (objRepo) => {
    return async (req, res, next) => {
        const { isMongoId, isEmpty } = objRepo.validator;
        const product_id = req.params.id;

        // Check if id is valid
        if (isEmpty(product_id + '') || !isMongoId(product_id + '')) {
            res.locals.msg = 'Sikertelen!\nHiba történt a törlés során!';
            res.locals.msgType = 'error';
            return next();
        }

        try {
            // If product already buyed --> remove from customer
            const old_customer_id = await objRepo.Product.findOne({ _id: product_id }, { customer: 1 });
            if (old_customer_id) {
                await objRepo.Customer.updateOne({ _id: old_customer_id.customer }, { $pull: { products: product_id } });
            }
            // Delete product from database
            await objRepo.Product.deleteOne({ _id: product_id });
            res.locals.msg = 'Sikeres törlés!';
            res.locals.msgType = 'success';
        } catch (err) {
            res.locals.msg = 'Sikertelen!\nHiba történt a törlés során!';
            res.locals.msgType = 'error';
        }
        return next();
    };
};

module.exports = deleteProductMW;
