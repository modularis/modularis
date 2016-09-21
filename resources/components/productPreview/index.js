import app from '../../js/app/app.js';
import Component from '../../js/app/component.js';

import '../button/index.js';
import '../card/index.js';

export default class ProductPreview extends Component {
  domBindings() {
    this.dom.addToCardButton = this.dom.el.querySelector('.c-button');
  }

  domEvents() {
    this.dom.addToCardButton.addEventListener('click', (e) => this.addToCart(e));
  }

  addToCart(e) {
    e.preventDefault();
    app.loadData(e.currentTarget.href).then((data) => app.controller.cmp.cart.add(data));
  }
}

app.registerComponent(ProductPreview, 'components/productPreview/views/main');
