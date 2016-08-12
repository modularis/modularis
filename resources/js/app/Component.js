/* eslint-env browser */
import View from './View.js';

export default class Component {
  constructor($el, templatePath) {
    // Validate dom element.
    if (!$el || $el.length === 0) {
      throw new Error(`${this.constructor.name} has no DOM $el`);
    }

    this.templatePath = templatePath.split('/').join('.');

    this.view = new View($el);

    // Component data.
    this.template = '';
    this.data = {};

    // Dom bindings.
    this.dom = {
      el: $el
    };

    this.boot();

    return this;
  }

  boot() {
    this.load().then((componentData) => {
      this.template = componentData[0];
      this.data = componentData[1];
      this.init();
    });
  }

  init() {
    this.render();
  }

  render() {
    const markup = this.template(this.data);
    this.dom.el = View.replaceElement(this.dom.el, markup);
  }

  load() {
    return new Promise((promiseResolve) => {
      Promise.all([
        this.view.loadTemplate(this.templatePath),
        this.view.extractData(this.dom.el)
      ]).then(componentData => promiseResolve(componentData));
    });
  }
}
