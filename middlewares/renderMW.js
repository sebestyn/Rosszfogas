/**
 * Render specified view and pass res.localsdata middleware
 * @param {*} objRepo - object repository for the middleware
 * @param {*} viewName - name of the view to render
 * @returns {function} - middleware function
 */
const renderMW = (objRepo, viewName) => {
    return (req, res, next) => {
        // Set loggedin variable to res.locals from session
        res.locals.loggedin = req.session ? req.session.loggedin : false;

        // res.setHeader('Content-Security-Policy', "script-src 'self' 'unsafe-inline';");

        // Render view
        return res.render(viewName, res.locals);
    };
};

module.exports = renderMW;
