/* eslint-env browser */
import HandlebarsRuntime from 'handlebars/runtime';

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
            promiseResolve(HandlebarsRuntime.template(compile()));
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
      promiseResolve({ title: this.el.dataset.title });
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
