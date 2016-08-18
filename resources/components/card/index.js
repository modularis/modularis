import app from '../../js/app/app.js';

import Component from '../../js/app/component.js';

export default class Card extends Component {
  constructor($el) {
    const templatePath = 'components/card/template';
    super($el, templatePath);
  }

  init() {
    this.view.render({
      title: 'Hallo Welt wie gehts??',
      button: {
        title: 'Drück mich!'
      }
    });
  }
}
