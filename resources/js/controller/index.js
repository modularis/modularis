import app from '../app/app.js';
import Controller from '../app/controller.js';

import Card from '../../components/card/index.js';

class Index extends Controller {
  registerComponents() {
    this.addComponent(Card, 'mainTeaser', { selector: '.c-card' });
  }

  dataBinding() {
    this.cmp.mainTeaser.data = this.data.card;
  }
}

app.registerController(Index, {
  endpoint: '/',
  templatePath: 'views/index'
});
