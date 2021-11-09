/**
 *  checks if the autoid exists, if it is, delete auto and redirects to '/torles'
 */

const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
    const autoModel = requireOption(objectrepository, 'autoModel');

    return function (req, res, next) {

        autoModel.remove({_id: req.params.autoid}, err=>{
            if (err) {
                return next(err);
            }

            res.redirect('/torles');
        });

    };

};