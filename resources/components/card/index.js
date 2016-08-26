import Component from '../../js/app/component.js';

import Button from '../button/index.js';

export default class Card extends Component {
  constructor($el) {
    const templatePath = 'components/card/template';
    if ($el.length > 1) {
      return Array.from($el).map(($x) => new Card($x));
    }
    super($el, templatePath);
  }

  registerComponents() {
    this.cmp = {
      mainButton: new Button(this.dom.el.querySelector('.c-button'))
    };
  }

  boot() {
    this.view.render({
      title: 'Hallo Welt wie gehts??',
      button: {
        title: 'Drück mich!'
      }
    });
    super();
  }
}
