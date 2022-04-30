/**
 * If the user is not logged in, redirects to /bejelentkezes
 */
 const requireOption = require('../requireOption');

 module.exports = function(objectrepository) {
     return function(req, res, next) {
         req.session.destroy(err => {
             res.redirect('/');
         });
     };
 };