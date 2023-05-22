const validator = require('validator');

/**
 * Create or modify product middleware
 * @param {*} objRepo - object repository
 * @returns {function} - middleware function
 */

const cremoProductMW = (objRepo) => {
    return async (req, res, next) => {
        const { isMongoId, isEmpty, isNumeric } = validator;

        // If id is not valid --> create new product
        if (!req.params || !isMongoId(req.params.id + '')) {

            // Validate input
            if (isEmpty(req.body.name + '') || isEmpty(req.body.price + '') || !isNumeric(req.body.price + '')) {
                res.locals.msg = 'Sikertelen! \nA név és az ár megadása kötelező!';
                res.locals.msgType = 'error';
                return next();
            }

            try{
                // Save product to database
                await objRepo.Product.create({
                    name: req.body.name,
                    price: req.body.price,
                    ...(req.body.description && { description: req.body.description }),
                    ...(req.body.location && { location: req.body.location }),
                });

                res.locals.msg = 'Sikeres mentés!';
                res.locals.msgType = 'success';
                return next();
            } catch(err){
                res.locals.msg = 'Sikertelen mentés!';
                res.locals.msgType = 'error';
                return next(err);
            }

        }

        // If id is valid --> update one
        else {
            // Validate input
            if (isEmpty(req.body.name + '') || isEmpty(req.body.price + '') || !isNumeric(req.body.price + '')) {
                res.locals.msg = 'Sikertelen! \nA név és az ár megadása kötelező!';
                res.locals.msgType = 'error';
                return next();
            }

            try{
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
                return next();
            } catch(err){
                res.locals.msg = 'Sikertelen módosítás!';
                res.locals.msgType = 'error';
                return next(err);
            }

        }
    };
};

module.exports = cremoProductMW;
