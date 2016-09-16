import Component from '../../js/app/component.js';

export default class Button extends Component {
  constructor($el, data = { partyMode: false }) {
    const templatePath = 'components/button/template';

    // @TODO: this should be in the Component constructor.
    if ($el.length > 1) {
      return Array.from($el).map(($x) => new Button($x, JSON.parse(JSON.stringify(data))));
    }

    super($el, templatePath, data);
  }

  domEvents() {
    this.dom.el.addEventListener('click', () => this.partyModeToggle());
  }

  partyModeToggle() {
    this.data.partyMode = !this.data.partyMode;
  }
}
