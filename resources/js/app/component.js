/* global Handlebars */
/* global setDOM */
/* global xhr */
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
      templatePromises.push(component.loadTemplate());
    });
    return Promise.all(templatePromises);
  }

  hydrate() {
    return new Promise((promiseResolve) => {
      if (!this.endpoint) {
        promiseResolve(true);
        return;
      }
      this.loadData().then(data => {
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

  loadData() {
    return new Promise((promiseResolve) => {
      xhr({
        uri: this.endpoint,
        headers: {
          Accept: 'json'
        }
      }, (error, response) => {
        if (error) {
          throw new Error(error);
        }
        promiseResolve(JSON.parse(response.body));
      });
    });
  }

  loadTemplate() {
    return new Promise((promiseResolve) => {
      if (app.templates[this.templatePath]) {
        promiseResolve(true);
        return;
      }
      app.templates[this.templatePath] = 'loading';
      // Set the template temporary to prevent loading it again.
      xhr({
        uri: `/view-loader/${this.templatePath.split('/').join('.')}`
      }, (error, response) => {
        if (error) {
          throw new Error(error);
        }
        // eslint-disable-next-line no-new-func
        const compile = new Function(`return ${response.body}`);
        const compiledTemplate = Handlebars.template(compile());
        Handlebars.registerPartial(
          this.templatePath,
          compiledTemplate
        );
        app.templates[this.templatePath] = compiledTemplate;
        promiseResolve(true);
      });
    });
  }

  updateData(data = {}, render = false) {
    // TODO: should update global state??
    // e.g. card changes state - should change global state or should it not?!?!
    Object.assign(this.data, data);
    if (render) {
      this.render();
    }
  }

  render(data = {}) {
    const renderData = Object.assign({}, this.data, data);
    const markup = app.templates[this.templatePath](renderData);
    setDOM(this.dom.el, markup);
  }
}
