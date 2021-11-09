/**
 *  get the list of the autos from db and puts it to res.locals.autok
 */

const requireOption = require('../requireOption');

module.exports = function (objectrepository) {

    /**
     * megnezi hogy letezik e az objectrepository és a parameterkent adott model
     * ha igen visszaadja ha nem akkor type error-ral elszall 
     */
    const autoModel = requireOption(objectrepository, 'autoModel');

    return function (req, res, next) {

        autoModel.find({}, (err, autok) => {
            if (err) {
                return next(err);
            }

            res.locals.autok = autok;

            return next();
        });
    };


};