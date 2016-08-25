export default class Controller {
  constructor() {
    this.cmp = {};
    this.init();
  }

  init() {
    this.registerComponents()
      .then(() => this.registerTemplates()
        .then(() => this.boot()));
  }

  registerComponents() {
    return Promise.resolve(true);
  }

  registerTemplates() {
    // @TODO: maybe move functionality into register components method.
    const templateLoaders = Object.keys(this.cmp).reduce((loaders, cmpName) => {
      const component = this.cmp[cmpName][0] || this.cmp[cmpName];
      loaders.push(component.view.loadTemplate());
      return loaders;
    }, []);
    return Promise.all(templateLoaders);
  }

  boot() {
    Object.keys(this.cmp).forEach(cmpName => {
      if (typeof this.cmp[cmpName].boot === 'function') {
        this.cmp[cmpName].boot();
      } else {
        this.cmp[cmpName].forEach((component) => component.boot());
      }
    });
  }
}
