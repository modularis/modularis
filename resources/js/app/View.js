/* eslint-env browser */
import Handlebars from 'handlebars/runtime';

export default class View {
  constructor($el) {
    this.el = $el;
    this.viewStore = {};
  }

  store(view, path) {
    this.viewStore[path] = view;
  }

  loadTemplate(templatePath) {
    return new Promise((promiseResolve) => {
      const request = new Request(`/view-loader/${templatePath}`);
      fetch(request)
        .then((response) => {
          response.text().then(template => {
            const compile = new Function('return ' + template);
            promiseResolve(Handlebars.template(compile()));
console.log(Handlebars);
          });
        }).catch((error) => {
          console.log(error);
        });
    });
  }

  loadData(path) {
    return new Promise((promiseResolve) => {
      const headers = new Headers();
      headers.append('Accept', 'json');
      const request = new Request(path);
      fetch(request, { headers })
        .then((response) => {
          response.text().then(json => promiseResolve(json));
        }).catch((error) => {
          console.log(error);
        });
    });
  }

  extractData() {
    return new Promise((promiseResolve) => {
      // @TODO: get real data.
      const data = {};
      if (this.el.dataset.cName) {
        data[this.el.dataset.cName] = this.el.dataset.cValue || this.el.innerHTML;
      }
      // console.log(this.el.dataset.cName);
      // console.log(this.el.querySelectorAll('[data-c-name]'));
      promiseResolve(data);
    });
  }

  static replaceElement($el, markup) {
    const $elWrap = document.createElement('div');
    $elWrap.innerHTML = markup;

    const $newEl = $elWrap.firstChild;
    const $parentNode = $el.parentNode;

    if (!$parentNode) return false;

    $parentNode.replaceChild($newEl, $el);

    return $newEl;
  }
}
