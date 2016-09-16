// @TODO: only load templates if not already loaded
import Handlebars from 'handlebars/runtime';
import setDOM from 'set-dom';

import app from '../app/app.js';

export default class View {
  constructor(component) {
    this.component = component;
  }

  // @TODO: maybe load templates in the app?
  // @TODO: refactor this mess!!!!!!
  loadTemplate() {
    return new Promise((promiseResolve) => {
      if (app.templates[this.component.templatePath]) {
        promiseResolve(true);
      } else {
        // Set the template temporary to prevent loading it again.
        app.templates[this.component.templatePath] = 'loading';
        const request = new Request(
          `/view-loader/${this.component.templatePath.split('/').join('.')}`
        );
        fetch(request)
          .then((response) => {
            response.text().then(template => {
              const compile = new Function(`return ${template}`); // eslint-disable-line no-new-func
              app.templates[this.component.templatePath] = Handlebars.template(compile());
              Handlebars.registerPartial(
                this.component.templatePath,
                app.templates[this.component.templatePath]
              );

              promiseResolve(true);
            });
          }).catch((error) => {
            console.log(error); // eslint-disable-line no-console
          });
      }
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
