import app from '../app/app.js';
import Controller from '../app/controller.js';

class Product extends Controller {
  constructor() {
    super(document.querySelector('.controller'), 'views/product-page', {}, '/product/xy');
  }

  registerComponents() {
    Object.assign(this.cmp, {
    });
  }

  ready() {
    document.querySelector('.controller').addEventListener('click', () => console.log('hoho'));
    document.querySelector('.index-link').addEventListener('click', (e) => {
      e.preventDefault();
      app.switchPage('/');
    });
  }
}

app.registerController(Product, '/product/xy', 'views.product-page');
