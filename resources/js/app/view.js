/* global Handlebars */
/* global setDOM */
/* global xhr */
import app from '../app/app.js';

export default class View {
  constructor(component) {
    this.component = component;
  }

  // @TODO: maybe load templates in the app?
  loadTemplate() {
    return new Promise((promiseResolve) => {
      if (app.templates[this.component.templatePath]) {
        promiseResolve(true);
        return;
      }
      // Set the template temporary to prevent loading it again.
      app.templates[this.component.templatePath] = 'loading';
      xhr({
        uri: `/view-loader/${this.component.templatePath.split('/').join('.')}`
      }, (error, response) => {
        if (error) {
          throw new Error(error);
        }
        // eslint-disable-next-line no-new-func
        const compile = new Function(`return ${response.body}`);
        app.templates[this.component.templatePath] = Handlebars.template(compile());
        Handlebars.registerPartial(
          this.component.templatePath,
          app.templates[this.component.templatePath]
        );
        promiseResolve(true);
      });
    });
  }

  // @TODO move into component?
  loadData(path) {
    return new Promise((promiseResolve) => {
      const headers = new Headers();
      headers.append('Accept', 'json');
      const request = new Request(path);
      fetch(request, { headers })
        .then((response) => {
          response.text().then(json => promiseResolve(json));
        }).catch((error) => {
          console.log(error); // eslint-disable-line no-console
        });
    });
  }

  // @TODO: use component data.
  render(data = {}) {
    const renderData = Object.assign({}, this.component.data, data);
    const markup = app.templates[this.component.templatePath](renderData);

    setDOM(this.component.dom.el, markup);
  }
}
