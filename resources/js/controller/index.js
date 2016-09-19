import app from '../app/app.js';
import Controller from '../app/controller.js';

import Card from '../../components/card/index.js';

class Index extends Controller {
  initComponents() {
    this.cmp.mainTeaser = [];
    Array.from(this.dom.el.querySelectorAll('.js-cmp-card')).forEach((el) => {
      // @TODO: do wee need init component?
      this.cmp.mainTeaser.push(app.initComponent(Card, el));
    });
  }

  dataBinding() {
    this.cmp.mainTeaser.forEach((teaser) => teaser.updateData(this.data.card));
  }

  ready() {
    this.dom.el.addEventListener('click', () => console.log('hihi'));
    this.dom.el.querySelector('.product-link').addEventListener('click', (e) => {
      e.preventDefault();
      app.switchPage('product/xy', 'product-page');
    });
  }

  static register() {
    return {
      endpoint: '/',
      templatePath: 'views/index'
    };
  }

  static registerComponents() {
    app.registerComponent(Card);
  }
}

// @TODO: use same concept for components instead of static register functions.
app.registerController(Index);
