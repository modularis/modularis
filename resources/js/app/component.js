import app from '../app/app.js';

export default class Component {
  constructor($el, data = {}, templatePaths) {
    this.data = data;
    this.templatePaths = templatePaths;

    this.dom = {
      el: $el
    };

    this.cmp = {};
  }

  init() {
    this.boot();
  }

  boot() {
    this.domBindings();
    this.initComponents();
    this.domEvents();
    this.ready();
  }

  domBindings() {}

  initComponents() {}

  domEvents() {}

  ready() {}

  updateData(data = {}, render = false) {
    // TODO: should update global state??
    // e.g. card changes state - should change global state or should it not?!?!
    Object.assign(this.data, data);
    if (render) this.render();
  }

  render(data = {}, templatePath = this.templatePaths[0], domPatching = true) {
    return app.render(
      this.dom.el,
      templatePath,
      Object.assign({}, this.data, data),
      domPatching
    );
  }
}
