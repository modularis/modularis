import Component from '../../js/app/component.js';

import Button from '../button/index.js';

export default class Card extends Component {
  registerComponents() {
    this.addComponent(Button, 'mainButton', { selector: '.c-button' });
  }

  dataBinding() {
    this.cmp.mainButton.data = this.data.button;
  }

  domEvents() {
    this.cmp.mainButton.dom.el.addEventListener('click', () => this.partyModeToggle());
  }

  partyModeToggle() {
    this.updateData({
      partyMode: !this.data.partyMode,
      title: (this.data.partyMode ? 'PARTY!!' : 'No party.'),
      button: {
        title: (this.data.partyMode ? 'Party down.' : 'Party up!')
      }
    }, true);
  }
}
