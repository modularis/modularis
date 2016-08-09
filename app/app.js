const express = require('express');
const exphbs = require('express-handlebars');

const TemplateLoader = require('./lib/TemplateLoader.js');

const app = express();

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/template/:template', (req, res) => {
  const templateLoader = new TemplateLoader(req, res);
  templateLoader.deliver();
});

app.listen(2999);
