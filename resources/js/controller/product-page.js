import app from '../app/app.js';
import Controller from '../app/controller.js';

class Product extends Controller {
  domBindings() {
    this.dom.indexLink = this.dom.el.querySelector('.index-link');
  }

  ready() {
    this.dom.el.addEventListener('click', () => console.log('hoho'));
    this.dom.indexLink.addEventListener('click', (e) => {
      e.preventDefault();
      app.switchPage('/', 'index');
    });
  }
}

app.registerController(Product, 'views/product-page', '/product/xy');
