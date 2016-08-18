import app from '../../js/app/app.js';

import Component from '../../js/app/component.js';

export default class Button extends Component {
  constructor($el) {
    const templatePath = 'components/button/template';
    super($el, templatePath);
  }

  init() {
    this.view.render({ title: 'Hallo Welt wie gehts' });
  }
}
