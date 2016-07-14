module.exports = function(req, res, next) {

  if (!req.session.user) {
      return res.status(401).send('Access or action denied, please log in');
  }
  next();

};
