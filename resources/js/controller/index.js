import app from '../app/app.js';
import Controller from '../app/controller.js';

import ProductGrid from '../../components/productGrid/index.js';

class Index extends Controller {
  domBindings() {
    this.dom.productGrid = this.dom.el.querySelector('.js-cmp-product-grid');
  }

  initComponents() {
    this.cmp.productGrid = app.initComponent(
      ProductGrid,
      this.dom.productGrid,
      this.data.productGrid
    );
    this.cmp.productGrid.render();
  }
}

app.registerController(Index, 'views/index', '/');
