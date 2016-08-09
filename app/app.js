const express = require('express');
const exphbs = require('express-handlebars');

const ViewLoader = require('./lib/ViewLoader.js');

const app = express();

app.engine('.hbs', exphbs({ extname: '.hbs' }));
app.set('view engine', '.hbs');
app.use(express.static('public'));

app.get('/', (request, response) => {
  response.render('index');
});

app.get('/view-loader/:view', (request, response) => {
  const viewLoader = new ViewLoader(request, response);
  viewLoader.deliver();
});

app.listen(2999);
