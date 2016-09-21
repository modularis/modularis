import app from '../../js/app/app.js';
import Component from '../../js/app/component.js';

import '../button/index.js';

export default class Cart extends Component {
  add(product) {
    this.data.products = this.data.products || [];
    let addProduct = true;
    this.data.products.forEach((x) => {
      if (x.id === product.id) {
        x.quantity += product.quantity;
        addProduct = false;
      }
    });
    if (addProduct) {
      this.data.products.push(product);
    }
    this.data.total = this.data.products.reduce((total, x) => (total + (x.quantity * x.price)), 0);
    this.updateData({}, true);
  }
}

app.registerComponent(Cart, 'components/cart/views/main');
