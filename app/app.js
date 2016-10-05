const compression = require(`compression`);
const express = require(`express`);
const exphbs = require(`express-handlebars`);
const glob = require(`glob`);
const path = require(`path`);

const IndexController = require(`./controller/IndexController.js`);
const ProductController = require(`./controller/ProductController.js`);
const ViewLoader = require(`./lib/ViewLoader.js`);

const app = express();
app.use(compression());
app.use(express.static(`app/public`));

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
  const relPath = path.relative(path.join(__dirname, `public`), x);
  const pathObject = path.parse(relPath);
  previous[pathObject.name] = path.join(`/`, relPath);
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
