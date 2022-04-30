/**
 *  get the list of the autos from db and puts it to res.locals.auto
 */

const requireOption = require('../requireOption');

module.exports = function(objectrepository) {
    const autoModel = requireOption(objectrepository, 'autoModel');

    return function(req, res, next) {
        autoModel.findOne({ _id: req.params.autoid }, (err, auto) => {
            if (err || !auto) {
                return next(err);
            }

            res.locals.auto = auto;
            return next();
        });
    };
};