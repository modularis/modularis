import Handlebars from 'handlebars/runtime';

export default class View {
  constructor($el) {
    this.el = $el;
    this.template = null;
  }

  loadTemplate(templatePath) {
    return new Promise((promiseResolve) => {
      const request = new Request(`/view-loader/${templatePath.split('/').join('.')}`);
      fetch(request)
        .then((response) => {
          response.text().then(template => {
            const compile = new Function('return ' + template);
            this.template = Handlebars.template(compile());
            Handlebars.registerPartial(templatePath, this.template);
            promiseResolve(true);
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

  render(data = {}) {
    const $parentNode = this.el.parentNode;
    if (!$parentNode) return false;

    const markup = this.template(data);
    const $elWrap = document.createElement('div');
    $elWrap.innerHTML = markup;

    const $newEl = $elWrap.firstChild;

    $parentNode.replaceChild($newEl, this.el);

    this.el = $newEl;
    return $newEl;
  }
}
