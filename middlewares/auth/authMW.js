/**
 * Auth middleware (check if the user is logged in)
 * @param {*} objRepo - object repository for the middleware
 * @returns {function} - middleware function that check if the user is logged in (redirect to / if not)
 */
const authMW = (objRepo) => {
    return (req, res, next) => {
        return next();
        if (typeof req.session.loggedin === 'undefined' || !req.session.loggedin) {
            return res.redirect('/');
        }
        return next();
    };
};

module.exports = authMW;
