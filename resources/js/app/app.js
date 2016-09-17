/* global setDOM */
/* global Handlebars */
/* global xhr */

class App {
  constructor() {
    this.templates = {};
    // this.registerServiceWorker();
  }

  registerController(Controller, endpoint) {
    this.controller = new Controller(
      document.querySelector('.controller'),
      'views/index',
      // TODO: empty data ???
      {},
      endpoint
    );
  }

  registerServiceWorker() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/service-worker.js', {
        scope: '/'
      });
    }
  }

  loadData(uri) {
    return new Promise((promiseResolve) => {
      xhr({
        uri,
        headers: {
          'X-Requested-With': 'XMLHttpRequest'
        }
      }, (error, response) => {
        if (error) {
          throw new Error(error);
        }
        promiseResolve(JSON.parse(response.body));
      });
    });
  }

  loadTemplate(templatePath) {
    return new Promise((promiseResolve) => {
      if (this.templates[templatePath]) {
        promiseResolve(true);
        return;
      }
      this.templates[templatePath] = 'loading';
      // Set the template temporary to prevent loading it again.
      xhr({
        uri: `/view-loader/${templatePath.split('/').join('.')}`,
        headers: {
          'X-Requested-With': 'XMLHttpRequest'
        }
      }, (error, response) => {
        if (error) {
          throw new Error(error);
        }
        // eslint-disable-next-line no-new-func
        const compile = new Function(`return ${response.body}`);
        const compiledTemplate = Handlebars.template(compile());
        Handlebars.registerPartial(templatePath, compiledTemplate);
        this.templates[templatePath] = compiledTemplate;
        promiseResolve(true);
      });
    });
  }

  render($el, templatePath, data = {}) {
    const markup = this.templates[templatePath](data);
    setDOM($el, markup);
  }
}

const app = new App();
export default app;
