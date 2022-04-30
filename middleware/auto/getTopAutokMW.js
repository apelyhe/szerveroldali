/**
 *  get the list of the autos from db and puts it to res.locals.topautok
 */

const requireOption = require('../requireOption');

 module.exports = function(objectrepository) {
    const autoModel = requireOption(objectrepository, 'autoModel');
    return function(req, res, next) {
        // maaaagic....
        autoModel.aggregate(
            [
                {
                    $sort: {
                        ar: 1
                    }
                },
                {
                    $limit: 5
                }
            ],
            function(err, result) {
                if (err) {
                    return next(err);
                }
                res.locals.topAutok = result.map(e => {
                    return { 
                        id: e._id,
                        marka: e.marka,
                        model: e.model,
                        evjarat: e.evjarat,
                        ar: e.ar
                     };
                });
                return next();
            }
        );
    };

};