import app from '../app/app.js';
import Controller from '../app/controller.js';

import ProductGrid from '../../components/productGrid/index.js';
import Cart from '../../components/cart/index.js';

class Index extends Controller {
  domBindings() {
    this.dom.cart = this.dom.el.querySelector('.js-cmp-cart');
    this.dom.productGrid = this.dom.el.querySelector('.js-cmp-product-grid');
  }

  initComponents() {
    this.cmp.cart = app.initComponent(
      Cart,
      this.dom.cart,
      this.data.cart
    );

    this.cmp.productGrid = app.initComponent(
      ProductGrid,
      this.dom.productGrid,
      this.data.productGrid
    );
  }
}

app.registerController(Index, 'views/index', '/');
