import app from '../app/app.js';

export default class Component {
  constructor($el, templatePath, data = {}, endpoint = null) {
    // Validate dom element.
    if (!$el || $el.length === 0) {
      throw new Error(`${this.constructor.name} has no DOM $el`);
    }

    // Dom bindings.
    this.dom = {
      el: $el
    };

    this.templatePath = templatePath;
    this.data = data;
    this.endpoint = endpoint;

    // Components.
    this.cmp = {
      self: this
    };

    this.init().then(() => this.boot());
  }

  init() {
    return Promise.all([
      this.registerComponents(),
      this.registerTemplate(),
      this.registerData()
    ]);
  }

  registerComponents() {
    return Promise.resolve();
  }

  registerTemplate() {
    return app.loadTemplate(this.templatePath);
  }

  registerData() {
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
