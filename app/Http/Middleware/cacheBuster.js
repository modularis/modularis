const cacheBustMatch = /^\/(css|js)\/(.*)?\.[0-9]*\.(css|js)$/;

module.exports = (req, res, next) => {
  if (req.url.match(cacheBustMatch)) {
    req.url = req.url.replace(cacheBustMatch, `/$1/$2.$3`);
  }
  next();
};
