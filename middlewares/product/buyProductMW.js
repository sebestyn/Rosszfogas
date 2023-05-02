/**
 * Customer buy a product middleware
 * @param {*} objRepo
 * @returns
 */
const buyProductMW = (objRepo) => {
    return async (req, res, next) => {
        const product_id = req.params.id;
        let customer_id = req.body.customer_id;
        if (typeof product_id === 'undefined' || typeof customer_id === 'undefined') {
            res.locals.msg = 'Sikertelen!\nHiba történt a vásárlás során!';
            res.locals.msgType = 'error';
            return res.status(500).send(res.locals);
        }

        // Check if customer id is empty --> if empty, remove product customer
        if (customer_id === '') {
            customer_id = null;
        }

        // Set product customer
        await objRepo.Product.updateOne({ _id: product_id }, { customer: customer_id });

        if (customer_id !== null) {
            res.locals.msg = 'Sikeres vásárlás';
            res.locals.msgType = 'success';
        } else {
            res.locals.msg = 'Vásárló sikeresen törölve';
            res.locals.msgType = 'success';
        }
        return res.status(200).send(res.locals);
    };
};

module.exports = buyProductMW;
