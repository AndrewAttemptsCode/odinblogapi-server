const passport = require('../../config/passport');

const authenticateUser = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user, info ) => {
    if (err || !user) {
      return res.status(401).json({
        errors: [{ 
          path: 'auth',
          msg: 'You must be logged in to leave a comment.',
         }],
      });
    };
    
    req.user = user;
    next();
  })(req, res, next);
};

module.exports = authenticateUser;