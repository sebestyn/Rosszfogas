/**
 * Redirect middleware
 * @param {*} objRepo - object repository for the middleware
 * @param {*} redirectName - name of the redirect (e.g. /products)
 * @returns {function} - middleware function
 */
const redirectMW = (objRepo, redirectName) => {
    return (req, res, next) => {
        const { msg, msgType } = res.locals;

        return res.redirect(`${redirectName}?${msg ? `msg=${msg}&msgType=${msgType || 'info'}` : ''}`);
    };
};

module.exports = redirectMW;
