/**
 * Customer buy a product middleware
 * @param {*} objRepo
 * @returns
 */
const buyProductMW = (objRepo) => {
    return async (req, res, next) => {
        const product_id = req.params.id;
        const customer_id = req.body.customer_id;
        if (typeof product_id === 'undefined' || typeof customer_id === 'undefined') {
            res.locals.msg = 'Sikertelen!\nHiba történt a vásárlás során!';
            res.locals.msgType = 'error';
            return res.status(500).send(res.locals);
        }

        // Check if customer id is empty --> if empty, remove product customer
        if (customer_id === '') {
            try {
                // Get product customer id
                const old_customer = await objRepo.Product.findOne({ _id: product_id }, 'customer').exec();
                console.log(old_customer._id)
                // Remove customer from product
                await objRepo.Product.updateOne({ _id: product_id }, { customer: null });
                // Remove product from customer
                await objRepo.Customer.updateOne({ _id: old_customer._id }, { $pull: { products: product_id } });
                res.locals.msg = 'Vásárló sikeresen törölve';
                res.locals.msgType = 'success';
            } catch (err) {
                res.locals.msg = 'Sikertelen vásárlás!';
                res.locals.msgType = 'error';
            }
            return res.status(200).send(res.locals);
        } else {
            try {
                // Set product customer
                await objRepo.Product.updateOne({ _id: product_id }, { customer: customer_id });
                // Add product to customer
                await objRepo.Customer.updateOne({ _id: customer_id }, { $addToSet: { products: product_id } });
                res.locals.msg = 'Sikeres vásárlás';
                res.locals.msgType = 'success';
            } catch (err) {
                res.locals.msg = 'Sikertelen vásárlás!';
                res.locals.msgType = 'error';
            }
            return res.status(200).send(res.locals);
        }
    };
};

module.exports = buyProductMW;
