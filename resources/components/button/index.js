import Component from '../../js/app/component.js';

export default class Button extends Component {
  constructor($el) {
    const templatePath = 'components/button/template';
    if ($el.length > 1) {
      return Array.from($el).map(($x) => new Button($x));
    }
    super($el, templatePath);
  }

  boot() {
    this.view.render({ title: 'Hallo Welt wie gehts' });
  }
}
