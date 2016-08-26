// @TODO: only load templates if not already loaded
import Handlebars from 'handlebars/runtime';

import app from '../app/app.js';

export default class View {
  constructor($el, templatePath) {
    this.el = $el;
    this.templatePath = templatePath;
  }

  // @TODO: maybe load templates in the app?
  loadTemplate() {
    return new Promise((promiseResolve) => {
      if (app.templates[this.templatePath]) {
        promiseResolve(true);
      } else {
        const request = new Request(`/view-loader/${this.templatePath.split('/').join('.')}`);
        fetch(request)
          .then((response) => {
            response.text().then(template => {
              const compile = new Function(`return ${template}`); // eslint-disable-line no-new-func
              app.templates[this.templatePath] = Handlebars.template(compile());
              Handlebars.registerPartial(this.templatePath, app.templates[this.templatePath]);
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

  render(data = {}) {
    const $parentNode = this.el.parentNode;
    if (!$parentNode) return false;

    const markup = app.templates[this.templatePath](data);
    const $elWrap = document.createElement('div');
    $elWrap.innerHTML = markup;

    const $newEl = $elWrap.firstChild;

    $parentNode.replaceChild($newEl, this.el);

    this.el = $newEl;
    return $newEl;
  }
}
