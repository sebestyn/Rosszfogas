/**
 * Login middleware with password check (set session if password is correct)
 * @param {*} objRepo - object repository for the middleware
 * @returns {function} - middleware function of the login
 */
const loginMW = (objRepo) => {
    return (req, res, next) => {
        // Check if the password is empty
        if (typeof req.body.password === 'undefined' || req.body.password === '') {
            return res.redirect('/?msg=Üres jelszót adtál meg&msgType=error');
        }

        // Check if the password is correct
        if (req.body.password !== 'admin') {
            return res.redirect('/?msg=Hibás jelszó&msgType=error');
        }

        // Set the session
        req.session.loggedin = true;

        return next();
    };
};

module.exports = loginMW;
