/**
 *  checks if the req.body is defined, if not returns next(), 
 *  otherwise saves the datas ( if there is no error while communicating with db )
 *  and redirect to /bejelentkezes
 */

 module.exports = function(objectrepository) {

    return function (req, res, next)  {
        return next();
    };

};