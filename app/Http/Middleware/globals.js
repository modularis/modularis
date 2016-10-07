const fs = require(`fs`);
const glob = require(`glob`);
const path = require(`path`);

let css = glob.sync(path.join(process.cwd(), `app`, `public`, `**`, `*.css`));
css = css.reduce((previous, x) => {
  const mtime = Math.round(new Date(fs.statSync(x).mtime).getTime() / 1000);
  const relPath = path.relative(path.join(process.cwd(), `app`, `public`), x);
  const pathObject = path.parse(relPath);
  const name = `${pathObject.name}.${mtime}${pathObject.ext}`;
  previous[pathObject.name] = path.join(`/`, pathObject.dir, name);
  return previous;
}, {});

let js = glob.sync(path.join(process.cwd(), `app`, `public`, `**`, `*.js`));
js = js.reduce((previous, x) => {
  const relPath = path.relative(path.join(process.cwd(), `app`, `public`), x);
  const pathObject = path.parse(relPath);
  previous[pathObject.name] = path.join(`/`, relPath);
  return previous;
}, {});

module.exports = (req, res, next) => {
  res.locals = {
    css,
    js
  };
  next();
};
