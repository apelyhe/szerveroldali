
var requireOption = require('../requireOption');

/**
 * checks whether the username & password are valid
 * if valid redirect to /admin
 */
module.exports = function (objectrepository) {
  
  var userModel = requireOption(objectrepository, 'userModel');

  return function (req, res, next) {
    // not enough parameters
    if ((typeof req.body === 'undefined') || (typeof req.body.name === 'undefined') ||
      (typeof req.body.password === 'undefined')) {
      return next();
    }

    // checks if user exists
    userModel.findOne({
      name: req.body.name
    }, function (err, result) {
      if ((err) || (!result)) {
        res.locals.err = 'Hibás felhasználónév!';
        return next();
      }

      //check password
      if (result.password !== req.body.password) {
        res.locals.err = 'Hibás jelszó!';
        return next();
      }

      //login is ok, save id to session
      req.session.userid = result._id;

      //redirect to / so the app can decide where to go next
      return res.redirect('/');
    });
  };

};