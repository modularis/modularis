const compression = require(`compression`);
const express = require(`express`);
const exphbs = require(`express-handlebars`);
const path = require(`path`);

// Controller
const IndexController = require(`./Http/Controllers/Index.js`);
const ProductController = require(`./Http/Controllers/Product.js`);

// Classes
const ViewLoader = require(`./Classes/ViewLoader.js`);

/**
 * App init
 */
const app = express();

app.engine(`.hbs`, exphbs({
  defaultLayout: `main`,
  extname: `.hbs`,
  layoutsDir: path.join(__dirname, `../resources/views/layouts`),
  partialsDir: path.join(__dirname, `../resources`)
}));

app.set(`view engine`, `.hbs`);
app.set(`views`, path.join(__dirname, `../resources/views`));

/**
 * Middlewares
 */
app.use(require(`./Http/Middleware/globals.js`));
app.use(require(`./Http/Middleware/cacheBuster.js`));
app.use(compression());
app.use(express.static(`app/public`));

/**
 * Routes
 */
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
  // TODO: move into controller.
  const viewLoader = new ViewLoader(request, response);
  viewLoader.deliver();
});

app.listen(2999);
