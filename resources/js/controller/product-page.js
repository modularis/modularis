import app from '../app/app.js';
import Controller from '../app/controller.js';

class Product extends Controller {
  ready() {
    this.dom.el.addEventListener('click', () => console.log('hoho'));
    this.dom.el.querySelector('.index-link').addEventListener('click', (e) => {
      e.preventDefault();
      app.switchPage('/', 'index');
    });
  }

  static register() {
    return {
      endpoint: '/product/xy',
      templatePath: 'views/product-page'
    };
  }
}

app.registerController(Product);
