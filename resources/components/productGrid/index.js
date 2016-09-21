import app from '../../js/app/app.js';
import Component from '../../js/app/component.js';

import ProductPreview from '../productPreview/index.js';

export default class ProductGrid extends Component {
  domBindings() {
    this.dom.productPreviews = this.dom.el.querySelectorAll('.js-cmp-product-preview');
  }

  initComponents() {
    this.cmp.productPreviews = [];
    Array.from(this.dom.productPreviews).forEach(($el, index) =>
      this.cmp.productPreviews.push(app.initComponent(
        ProductPreview,
        $el,
        this.data.products[index]
      ))
    );
  }
}

app.registerComponent(ProductGrid, 'components/productGrid/views/main');
