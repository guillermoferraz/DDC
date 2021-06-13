const SERVER = require ('../address')

const helpers = {};

helpers.isAuthenticated = (req, res, next) => {
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect(`${SERVER}`);
};

module.exports = helpers;
