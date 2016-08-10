const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');

const IndexController = require('./controller/IndexController.js');
const ViewLoader = require('./lib/ViewLoader.js');

const app = express();

app.engine('.hbs', exphbs({
  defaultLayout: 'main',
  extname: '.hbs',
  layoutsDir: path.join(__dirname, '../resources/layouts'),
  partialsDir: path.join(__dirname, '../resources')
}));

app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, '../resources'));

app.use(express.static('public'));

app.get('/', (request, response) => {
  const indexController = new IndexController(request, response);
  indexController.index();
});

app.get('/view-loader/:view', (request, response) => {
  const viewLoader = new ViewLoader(request, response);
  viewLoader.deliver();
});

app.listen(2999);
