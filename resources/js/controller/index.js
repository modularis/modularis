import app from '../app/app.js';
import Controller from '../app/controller.js';

import Card from '../../components/card/index.js';

class Index extends Controller {
  domBindings() {
    this.dom.mainTeaser = this.dom.el.querySelectorAll('.js-cmp-card');
    this.dom.productLink = this.dom.el.querySelector('.product-link');
  }

  initComponents() {
    this.cmp.mainTeaser = [];
    Array.from(this.dom.mainTeaser).forEach(($el) => {
      this.cmp.mainTeaser.push(app.initComponent(Card, $el, this.data.card));
    });
  }

  ready() {
    this.dom.el.addEventListener('click', () => console.log('hihi'));
    this.dom.productLink.addEventListener('click', (e) => {
      e.preventDefault();
      app.switchPage('product/xy', 'product-page');
    });
  }
}

app.registerController(Index, 'views/index', '/');
