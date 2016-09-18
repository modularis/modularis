import app from '../app/app.js';

export default class Component {
  constructor(selector, data = {}, endpoint = null, templatePath = null) {
    this.selector = selector;
    this.data = data;
    this.endpoint = endpoint;
    this.templatePath = templatePath ||
      `components/${this.constructor.name.toLowerCase()}/template`;

    this.cmp = {};

    this.init();
  }

  init() {
    this.registerComponents();
    this.registerData();
    this.registerTemplates();
  }

  registerComponents() {}

  registerData() {
    if (this.endpoint) {
      app.loadData(this.endpoint).then((data) => { this.data = data; });
    }
  }

  registerTemplates() {
    if (this.templatePath) {
      app.loadTemplate(this.templatePath);
    }
  }

  addComponent(ComponentClass, name, parameters) {
    // @TODO maybe add warning if name already exists.
    Object.assign(this.cmp, app.registerComponent(ComponentClass, name, parameters, this));
  }

  boot() {
    this.dataBinding();
    this.domBindings();
    this.domEvents();
    this.ready();
  }

  dataBinding() {}

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
