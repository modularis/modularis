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
    const templateLoaders = Object.keys(this.cmp).reduce((loaders, cmpName) => {
      const component = this.cmp[cmpName];
      loaders.push(component.view.loadTemplate(component.templatePath));
      return loaders;
    }, []);
    return Promise.all(templateLoaders);
  }

  boot() {
    Object.keys(this.cmp).forEach(cmpName => this.cmp[cmpName].boot());
  }
}
