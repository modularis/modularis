import app from '../../js/app/app.js';
import Component from '../../js/app/component.js';

import ProductPreview from '../productPreview/index.js';

export default class ProductGrid extends Component {
  // domBindings() {
  //   this.dom.button = this.dom.el.querySelector('.js-cmp-button');
  // }

  // initComponents() {
  //   this.cmp.button = app.initComponent(
  //     Button,
  //     this.dom.button,
  //     this.data.button
  //   );
  // }

  // domEvents() {
  //   this.cmp.button.dom.el.addEventListener('click', () => this.partyModeToggle());
  // }

  // partyModeToggle() {
  //   this.updateData({
  //     partyMode: !this.data.partyMode,
  //     title: (this.data.partyMode ? 'PARTY!!' : 'No party.'),
  //     button: {
  //       title: (this.data.partyMode ? 'Party down.' : 'Party up!')
  //     }
  //   }, true);
  // }
}

app.registerComponent(ProductGrid, 'components/productGrid/views/main');
