// @TODO: load initial data
import View from './view.js';

export default class Component {
  constructor($el, templatePath, controller = null) {
    // Validate dom element.
    if (!$el || $el.length === 0) {
      throw new Error(`${this.constructor.name} has no DOM $el`);
    }

    this.templatePath = templatePath;
    this.controller = controller;
    this.view = new View($el);

    // Component data.
    this.data = {};
    // Dom bindings.
    this.dom = {
      el: $el
    };

    this.init();

    return this;
  }

  init() {
    this.registerComponents();
  }

  registerComponents() {
    return Promise.resolve();
  }
}
