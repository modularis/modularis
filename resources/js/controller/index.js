import app from '../app/app.js';
import Controller from '../app/controller.js';

import Card from '../../components/card/index.js';

class Index extends Controller {
  constructor() {
    super(document.querySelector('.controller'), 'views/index', {}, '/');
  }

  registerComponents() {
    // TODO: Object assign not pretty api.
    Object.assign(this.cmp, {
      mainTeasers: new Card(document.querySelectorAll('.c-card'))
    });
  }

  ready() {
    document.querySelector('.controller').addEventListener('click', () => console.log('hihi'));
    document.querySelector('.product-link').addEventListener('click', (e) => {
      e.preventDefault();
      app.switchPage('/product/xy', 'product-page');
    });
    this.cmp.mainTeasers.forEach((mainTeaser) => mainTeaser.updateData(this.data.card));
  }
}

app.registerController(Index);
