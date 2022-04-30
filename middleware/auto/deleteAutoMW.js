/**
 *  checks if the autoid exists, if it is, delete auto and redirects to '/torles'
 */

const requireOption = require('../requireOption');

module.exports = function(objectrepository) {
    return function(req, res, next) {
        if (typeof res.locals.auto === 'undefined') {
            return next();
        }

        res.locals.auto.remove(err => {
            if (err) {
                return next(err);
            }

            return res.redirect('/auto');
        });
    };
};