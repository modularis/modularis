import app from '../app/app.js';
import Controller from '../app/controller.js';

class Product extends Controller {
  registerComponents() {
    Object.assign(this.cmp, {
    });
  }
}

app.registerController(Product, '/product/xy', 'views.product-page');
