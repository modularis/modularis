import View from './view.js';

export default class Component {
  constructor($el, templatePath) {
    // Validate dom element.
    if (!$el || $el.length === 0) {
      throw new Error(`${this.constructor.name} has no DOM $el`);
    }

    this.templatePath = templatePath;

    this.view = new View($el);

    // Component data.
    this.data = {};

    // Dom bindings.
    this.dom = {
      el: $el
    };

    return this;
  }

  init() {}
}
