import Component from '../../js/app/component.js';

import Button from '../button/index.js';

export default class Card extends Component {
  constructor($el, controller = null) {
    const templatePath = 'components/card/template';
    if ($el.length > 1) {
      return Array.from($el).map(($x) => new Card($x, controller));
    }
    super($el, templatePath, controller);
    return this;
  }

  registerComponents() {
    // @TODO: this is overwritten erverytime card is instantiated.
    this.controller.cmp.button = new Button(document.querySelector('.c-button'));
  }

  boot() {
    this.view.render({
      title: 'Hallo Welt wie gehts??',
      button: {
        title: 'Drück mich!'
      }
    });
  }
}
