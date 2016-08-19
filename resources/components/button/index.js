import Component from '../../js/app/component.js';

export default class Button extends Component {
  constructor($el, controller = null) {
    const templatePath = 'components/button/template';
    super($el, templatePath, controller);
  }

  boot() {
    this.view.render({ title: 'Hallo Welt wie gehts' });
  }
}
