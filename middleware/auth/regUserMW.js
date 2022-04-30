var requireOption = require('../requireOption');

/**
 *  checks if the req.body is defined, if not returns next(), 
 *  otherwise saves the datas ( if there is no error while communicating with db )
 *  and redirect to /bejelentkezes
 */
 module.exports = function (objectrepository) {
 
   var UserModel = requireOption(objectrepository, 'userModel');
 
   return function (req, res, next) {
 
     // not enough parameter
     if ((typeof req.body === 'undefined') || (typeof req.body.email === 'undefined') ||
       (typeof req.body.password === 'undefined')) {
       return next();
     }
 
     //lets find the user
     UserModel.findOne({
       email: req.body.email
     }, function (err, result) {
 
       if ((err) || (result)) {
         res.locals.err = 'Ezzel az email címmel már regisztráltak!';
         return next();
       }
 
       //create user
       var newUser = new UserModel();
       newUser.name = req.body.name;
       console.log(req.body.name, req.body.email, req.body.password);
       newUser.email = req.body.email;
       newUser.password = req.body.password;
       newUser.save(function (err) {
         //redirect to /login
         return res.redirect('/bejelentkezes');
       });
     });
   };
 };