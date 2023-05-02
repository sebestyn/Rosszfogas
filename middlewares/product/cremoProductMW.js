/**
 * Create or modify product middleware
 * @param {*} objRepo - object repository
 * @returns {function} - middleware function
 */

const cremoProductMW = (objRepo) => {
    return async (req, res, next) => {
        const { isMongoId, isEmpty, isNumeric } = objRepo.validator;

        // If id is not valid
        if (!isEmpty(req.params.id + '') && !isMongoId(req.params.id + '')) {
            // Validate input
            if (isEmpty(req.body.name + '') || isEmpty(req.body.price + '') || !isNumeric(req.body.price + '')) {
                res.locals.msg = 'Sikertelen! \nA név és az ár megadása kötelező!';
                res.locals.msgType = 'error';
                return next();
            }

            // Save product to database
            await objRepo.Product.create({
                name: req.body.name,
                price: req.body.price,
                ...(req.body.description && { description: req.body.description }),
                ...(req.body.location && { location: req.body.location }),
            });

            res.locals.msg = 'Sikeres mentés!';
            res.locals.msgType = 'success';
        }

        // If id is valid
        else {
            // Validate input
            if (isEmpty(req.body.name + '') || isEmpty(req.body.price + '') || !isNumeric(req.body.price + '')) {
                res.locals.msg = 'Sikertelen! \nA név és az ár megadása kötelező!';
                res.locals.msgType = 'error';
                return next();
            }

            // Update product in database
            await objRepo.Product.updateOne(
                { _id: req.params.id },
                {
                    name: req.body.name,
                    price: req.body.price,
                    description: req.body.description,
                    location: req.body.location,
                }
            );

            res.locals.msg = 'Sikeres mentés!';
            res.locals.msgType = 'success';
        }

        return next();
    };
};

module.exports = cremoProductMW;
