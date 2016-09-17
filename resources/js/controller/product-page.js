import app from '../app/app.js';
import Controller from '../app/controller.js';

class Product extends Controller {
  registerComponents() {
    Object.assign(this.cmp, {
    });
  }

  ready() {
    console.log('test');
  }
}

app.registerController(Product, '/');
