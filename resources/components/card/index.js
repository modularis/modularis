import Component from '../../js/app/component.js';

import Button from '../button/index.js';

export default class Card extends Component {
  constructor($el, data = {}) {
    const templatePath = 'components/card/template';

    // @TODO: this should be in the Component constructor.
    if ($el.length > 1) {
      return Array.from($el).map(($x) => new Card($x, JSON.parse(JSON.stringify(data))));
    }

    super($el, templatePath, data);

    this.data = Object.assign({}, data, {
      title: 'Test',
      button: {
        title: 'Test Button'
      },
      partyMode: false
    });
  }

  registerComponents() {
    // @TODO: it shouldnt be that hard, should be automized.
    let mainButtonData;
    if (this.cmp.mainButton) {
      mainButtonData = this.cmp.mainButton.data;
    }
    Object.assign(this.cmp, {
      mainButton: new Button(this.dom.el.querySelector('.c-button'), mainButtonData)
    });
  }

  domEvents() {
    this.cmp.mainButton.dom.el.addEventListener('click', () => this.partyModeToggle());
  }

  partyModeToggle() {
    this.data.partyMode = !this.data.partyMode;
    this.view.render({
      title: (this.data.partyMode ? 'PARTY!!' : 'No party.'),
      button: {
        title: (this.data.partyMode ? 'Party down.' : 'Party up!')
      }
    });
  }
}
