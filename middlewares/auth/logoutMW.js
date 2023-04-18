/**
 * Logout middleware (destroy the session)
 * @param {*} objRepo - object repository for the middleware
 * @returns {function} - middleware function of the logout
 */
const logoutMW = (objRepo) => {
    return (req, res, next) => {
        // Destroy the session
        req.session.destroy();

        return next();
    };
};

module.exports = logoutMW;
