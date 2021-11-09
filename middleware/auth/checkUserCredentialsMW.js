/**
 * checks whether the username & password are valid
 * if valid redirect to /admin
 */
module.exports = function (objectrepository) {

  return function (req, res, next) {

    if (typeof req.body.username === 'undefined' ||
      typeof req.body.password === 'undefined') {
      return next();
    }

    // if req.body.username is in db and pw is correct redirect to admin 
    // else res.locals.error 'Hibas jelszo'
    if (req.body.username === 'adam' && req.body.password === 'asd123') {
      req.session.belepve = true;
      return req.session.save(err => res.redirect('/admin'));
    }

    res.locals.error = 'Hibás jelszó!';
    return next();
  };

};