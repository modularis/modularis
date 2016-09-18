import Component from '../../js/app/component.js';

export default class Button extends Component {
  static register() {
    return {
      templatePath: 'components/button/template'
    };
  }
}
