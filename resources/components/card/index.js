import Component from '../../js/app/component.js';

import Button from '../button/index.js';

export default class Card extends Component {
  constructor($el) {
    const templatePath = 'components/card/template';
    if ($el.length > 1) {
      return Array.from($el).map(($x) => new Card($x));
    }
    super($el, templatePath);

    this.partyMode = false;
  }

  registerComponents() {
    this.cmp = {
      mainButton: new Button(this.dom.el.querySelector('.c-button'))
    };
  }

  domEvents() {
    this.cmp.mainButton.dom.el.addEventListener('click', () => this.partyModeToggle());
  }

  partyModeToggle() {
    this.partyMode = !this.partyMode;
    this.view.render({
      title: (this.partyMode ? 'PARTY!!' : 'No party.'),
      button: {
        title: 'Drück mich!'
      }
    });
  }
}
