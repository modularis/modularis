const compression = require(`compression`);
const express = require(`express`);
const exphbs = require(`express-handlebars`);
const fs = require(`fs`);
const glob = require(`glob`);
const path = require(`path`);

const IndexController = require(`./Http/Controllers/Index.js`);
const ProductController = require(`./Http/Controllers/Product.js`);

const ViewLoader = require(`./Classes/ViewLoader.js`);

const app = express();

app.engine(`.hbs`, exphbs({
  defaultLayout: `main`,
  extname: `.hbs`,
  layoutsDir: path.join(__dirname, `../resources/views/layouts`),
  partialsDir: path.join(__dirname, `../resources`)
}));

app.set(`view engine`, `.hbs`);
app.set(`views`, path.join(__dirname, `../resources/views`));

let css = glob.sync(path.join(__dirname, `public`, `**`, `*.css`));
css = css.reduce((previous, x) => {
  const mtime = Math.round(new Date(fs.statSync(x).mtime).getTime() / 1000);
  const relPath = path.relative(path.join(__dirname, `public`), x);
  const pathObject = path.parse(relPath);
  const name = `${pathObject.name}.${mtime}${pathObject.ext}`;
  previous[pathObject.name] = path.join(`/`, pathObject.dir, name);
  return previous;
}, {});

let js = glob.sync(path.join(__dirname, `public`, `**`, `*.js`));
js = js.reduce((previous, x) => {
  const relPath = path.relative(path.join(__dirname, `public`), x);
  const pathObject = path.parse(relPath);
  previous[pathObject.name] = path.join(`/`, relPath);
  return previous;
}, {});

app.use((req, res, next) => {
  res.locals = {
    css,
    js
  };
  next();
});

const cacheBustMatch = /^\/(css|js)\/(.*)?\.[0-9]*\.(css|js)$/;
app.use((req, res, next) => {
  if (req.url.match(cacheBustMatch)) {
    req.url = req.url.replace(cacheBustMatch, `/$1/$2.$3`);
  }
  next();
});

app.use(compression());
app.use(express.static(`app/public`));

app.get(`/`, (request, response) => {
  const indexController = new IndexController(request, response);
  indexController.index();
});

app.get(`/product/xy`, (request, response) => {
  const productController = new ProductController(request, response);
  productController.page();
});

app.get(`/add-to-cart/:id`, (request, response) => {
  const productController = new ProductController(request, response);
  productController.addToCart();
});

app.get(`/view-loader/:view`, (request, response) => {
  const viewLoader = new ViewLoader(request, response);
  viewLoader.deliver();
});

app.listen(2999);
