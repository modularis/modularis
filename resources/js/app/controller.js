import Component from '../../js/app/component.js';

export default class Controller extends Component {
  constructor($el, templatePath, data = {}, endpoint = null) {
    super($el, templatePath, data, endpoint);
    Object.assign(this.cmp, {
      controller: this
    });
  }
}
