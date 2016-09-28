import app from '../../js/app/app.js';
import Component from '../../js/app/component.js';

import '../button/index.js';

export default class Cart extends Component {
  add(product) {
    const products = this.data.products || [];
    let addProduct = true;
    products.forEach((x) => {
      if (x.id === product.id) {
        x.quantity += product.quantity;
        addProduct = false;
      }
    });
    if (addProduct) {
      products.push(product);
    }
    this.data.products = JSON.parse(JSON.stringify(products));
    this.data.total = this.calcTotal(this.data.products);
    this.render();
  }

  remove(product) {
    this.data.products = this.data.products.filter((x) => x.id !== product.id);
    this.data.total = this.calcTotal(this.data.products);
    this.render();
  }

  calcTotal(products) {
    return products.reduce((total, x) => (total + (x.quantity * x.price)), 0);
  }
}

app.registerComponent(Cart, 'components/cart/views/main');
