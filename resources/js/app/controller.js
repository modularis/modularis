import Component from '../../js/app/component.js';

export default class Controller extends Component {
  constructor($el, templatePath, data = {}) {
    super($el, templatePath, data);
    Object.assign(this.cmp, {
      controller: this
    });
  }
}
