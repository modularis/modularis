import app from '../../js/app/app.js';
import Component from '../../js/app/component.js';

import '../button/index.js';
import '../card/index.js';

export default class ProductPreview extends Component {
  domBindings() {
    this.dom.addToCardButton = this.dom.el.querySelector(`.c-button`);
  }

  domEvents() {
    this.dom.addToCardButton.addEventListener(`click`, (e) => this.addToCart(e));
  }

  addToCart(e) {
    e.preventDefault();

    app.controller.cmp.cart.add(this.data);
    app.controller.cmp.notificationBar.add({
      title: `Produkt in den Warenkorb gelegt.!`,
      body: `Produkt "${this.data.title}" wurde in den Warenkorb gelegt.`
    });
    app.loadData(e.currentTarget.href).then((data) => {
      if (data.status === `error`) {
        app.controller.cmp.cart.remove(this.data);
        app.controller.cmp.notificationBar.add({ title: data.title, body: data.body });
      }
    });
  }
}

app.registerComponent(ProductPreview, `components/productPreview/views/main`);
