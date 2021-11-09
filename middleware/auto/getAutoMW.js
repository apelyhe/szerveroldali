/**
 *  get the list of the autos from db and puts it to res.locals.auto
 */

const requireOption = require('../requireOption');

module.exports = function (objectrepository) {

    const autoModel = requireOption(objectrepository, 'autoModel');

    return function (req, res, next) {
        const idToFind = req.params.autoid;
        autoModel.findOne({_id:idToFind}, (err, auto)=> {
            
            if (err || !auto) {
                return next(err);
            }

            res.locals.auto = auto;
            return next();
        });

    };

};