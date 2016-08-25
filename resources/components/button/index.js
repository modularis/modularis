import Component from '../../js/app/component.js';

export default class Button extends Component {
  constructor($el, controller = null) {
    const templatePath = 'components/button/template';
    if ($el.length > 1) {
      return Array.from($el).map(($x) => new Button($x, controller));
    }
    super($el, templatePath, controller);
    return this;
  }

  boot() {
    this.view.render({ title: 'Hallo Welt wie gehts' });
  }
}
