import Component from '../../js/app/component.js';

import Button from '../button/index.js';

export default class Card extends Component {
  constructor($el, controller = null) {
    const templatePath = 'components/card/template';
    super($el, templatePath, controller);
  }

  registerComponents() {
    return new Promise((promiseResolve) => {
      this.controller.cmp.button = new Button(document.querySelector('.c-button'));
      promiseResolve(true);
    });
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
