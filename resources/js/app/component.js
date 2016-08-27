// @TODO: load initial data
import View from './view.js';

export default class Component {
  constructor($el, templatePath, data = {}) {
    // Validate dom element.
    if (!$el || $el.length === 0) {
      throw new Error(`${this.constructor.name} has no DOM $el`);
    }

    this.templatePath = templatePath;
    this.data = data;
    this.cmp = {};

    // Dom bindings.
    this.dom = {
      el: $el
    };

    this.view = new View(this);

    this.init();
  }

  init() {
    return new Promise((promiseResolve) => {
      this.registerComponents();

      Promise.all(Array.from(this.cmp)).then(() => {
        this.registerTemplates().then(() => this.triggerBoot());
        promiseResolve(true);
      });
    });
  }

  registerComponents() {}

  registerTemplates() {
    // @TODO: maybe move functionality into register components method.
    const templateLoaders = Object.keys(this.cmp).reduce((loaders, cmpName) => {
      const component = this.cmp[cmpName][0] || this.cmp[cmpName];
      loaders.push(component.view.loadTemplate());
      return loaders;
    }, []);
    return Promise.all(templateLoaders);
  }

  triggerBoot() {
    Object.keys(this.cmp).forEach(cmpName => {
      if (typeof this.cmp[cmpName].boot === 'function') {
        this.cmp[cmpName].boot();
      } else {
        this.cmp[cmpName].forEach((component) => component.boot());
      }
    });
  }

  boot() {
    this.domBindings();
    this.domEvents();
  }

  reboot() {
    this.registerComponents();
    this.triggerBoot();
    this.domBindings();
    this.domEvents();
  }

  domBindings() {}

  domEvents() {}
}
