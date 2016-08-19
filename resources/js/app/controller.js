export default class Controller {
  constructor() {
    this.cmp = {};
    this.templates = {};
    this.init();
  }

  init() {
    this.registerComponents();
    this.registerTemplates().then(() => this.boot());
  }

  boot() {
    Object.keys(this.cmp).forEach(cmpName => this.cmp[cmpName].boot());
  }

  registerComponents() {}

  registerTemplates() {
    const templateLoaders = Object.keys(this.cmp).reduce((loaders, cmpName) => {
      const component = this.cmp[cmpName];
      loaders.push(component.view.loadTemplate(component.templatePath));
      return loaders;
    }, []);
    return Promise.all(templateLoaders);
  }
}
