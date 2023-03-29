/**
 * Redirect middleware
 * @param {*} objRepo - object repository for the middleware
 * @param {*} redirectName - name of the redirect (e.g. /products)
 * @returns {function} - middleware function
 */
const redirectMW = (objRepo, redirectName) => {
    return (req, res, next) => {
        return res.redirect(redirectName);
    };
};

module.exports = redirectMW;
