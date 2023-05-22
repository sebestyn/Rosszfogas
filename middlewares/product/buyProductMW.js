const validator = require('validator');

/**
 * Customer buy a product middleware
 * @param {*} objRepo
 * @returns
 */
const buyProductMW = (objRepo) => {
    return async (req, res, next) => {
        const { isMongoId, isEmpty } = validator;
        const product_id = req.params.id;
        const customer_id = req.body.customer_id;

        // If id is not defined
        if (typeof product_id === 'undefined' || typeof customer_id === 'undefined') {
            res.locals.msg = 'Sikertelen!\nHiba történt a vásárlás során!';
            res.locals.msgType = 'error';
            return res.status(500).send(res.locals);
        }

        // Check if product id is valid
        if (isEmpty(product_id + '') || !isMongoId(product_id + '')) {
            res.locals.msg = 'Sikertelen!\nHiba történt a vásárlás során!';
            res.locals.msgType = 'error';
            return res.status(500).send(res.locals);
        }

        // Remove old customer from product
        try {
            // Get old customer id
            const old_customer_id = await objRepo.Product.findOne({ _id: product_id }, { customer: 1 });
            // If there is old customer --> remove product from old customer
            if (old_customer_id.customer) {
                await objRepo.Customer.updateOne({ _id: old_customer_id.customer }, { $pull: { products: product_id } });
                await objRepo.Product.updateOne({ _id: product_id }, { customer: null });
            }
        } catch (err) {
            res.locals.msg = 'Sikertelen vásárlás!';
            res.locals.msgType = 'error';
            return res.status(500).send(res.locals);
        }

        // Check if customer id is valid --> if not, just remove old customer from product
        if (isEmpty(customer_id + '') || !isMongoId(customer_id + '')) {
            res.locals.msg = 'Vásárló sikeresen törölve';
            res.locals.msgType = 'success';
            return res.status(200).send(res.locals);
        }

        // If threre is new customer --> set customer to product
        try {
            await objRepo.Product.updateOne({ _id: product_id }, { customer: customer_id });
            await objRepo.Customer.updateOne({ _id: customer_id }, { $addToSet: { products: product_id } });
            res.locals.msg = 'Sikeres vásárlás';
            res.locals.msgType = 'success';
        } catch (err) {
            res.locals.msg = 'Sikertelen vásárlás!';
            res.locals.msgType = 'error';
        }
        return res.status(200).send(res.locals);
    };
};

module.exports = buyProductMW;
