import app from '../app/app.js';

export default class Component {
  constructor($el, templatePath, data = {}, endpoint = null) {
    // Validate dom element.
    if (!$el || $el.length === 0) {
      throw new Error(`${this.constructor.name} has no DOM $el`);
    }

    this.templatePath = templatePath;
    this.data = data;
    this.endpoint = endpoint;
    this.cmp = {};

    // Dom bindings.
    this.dom = {
      el: $el
    };

    this.init();
  }

  init() {
    this.registerComponents();
    return Promise.all([
      this.registerTemplates(),
      this.hydrate()
    ]).then(() => this.triggerBoot());
  }

  registerComponents() {}

  registerTemplates() {
    const templatePromises = [];
    Object.keys(this.cmp).forEach((cmpName) => {
      const component = this.cmp[cmpName][0] || this.cmp[cmpName];
      templatePromises.push(app.loadTemplate(component.templatePath));
    });
    return Promise.all(templatePromises);
  }

  hydrate() {
    return new Promise((promiseResolve) => {
      if (!this.endpoint) {
        promiseResolve(true);
        return;
      }
      app.loadData(this.endpoint).then(data => {
        this.updateData(data);
        promiseResolve(true);
      });
    });
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
    this.ready();
  }

  domBindings() {}

  domEvents() {}

  ready() {}

  updateData(data = {}, render = false) {
    // TODO: should update global state??
    // e.g. card changes state - should change global state or should it not?!?!
    Object.assign(this.data, data);
    if (render) {
      this.render();
    }
  }

  render(data = {}) {
    app.render(this.dom.el, this.templatePath, Object.assign({}, this.data, data));
  }
}
