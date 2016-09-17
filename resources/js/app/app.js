/* global setDOM */
/* global Handlebars */
/* global xhr */

class App {
  constructor() {
    this.templates = {};
    // this.registerServiceWorker();
  }

  registerController(Controller) {
    this.controller = new Controller();
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

  switchPage(uri, templateName) {
    xhr({ uri }, (error, response) => {
      if (error) {
        throw new Error(error);
      }
      // Wipe the <body> and replace with new content to get rid of dom events
      // and other stuff the previous controller may added.
      const $wrapper = document.implementation.createHTMLDocument().documentElement;
      $wrapper.innerHTML = response.body;
      const $controller = document.querySelector('.controller');
      const $newController = $wrapper.querySelector('.controller');
      const $parentNode = $controller.parentNode;
      $parentNode.replaceChild($newController, $controller);
      // Reload the controller script.
      document.querySelector('#controller-script').remove();
      const controllerScript = document.createElement('script');
      controllerScript.src = `/js/${templateName}.js`;
      controllerScript.id = 'controller-script';
      document.querySelector('body').appendChild(controllerScript);

      // Completely reload;
      // document.open();
      // document.write(response.body);
      // document.close();
    });
  }

  render($el, templatePath, data = {}, domPatching = true) {
    const markup = this.templates[templatePath](data);
    if (domPatching) {
      setDOM($el, markup);
      return $el;
    }
    const $wrap = document.createElement('div');
    $wrap.innerHTML = markup;
    const $newNode = $wrap.firstChild;
    const $parentNode = $el.parentNode;

    if (!$parentNode) return false;

    $parentNode.replaceChild($newNode, $el);

    return $newNode;
  }
}

const app = new App();
export default app;
