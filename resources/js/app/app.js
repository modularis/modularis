/* global setDOM */
/* global Handlebars */
/* global xhr */

class App {
  constructor() {
    this.components = [];
    this.templates = {};
    this.loaders = [];
    // this.registerServiceWorker();
    window.onpopstate = (e) => this.switchPage(e.state.uri, false);
  }

  registerServiceWorker() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/service-worker.js', {
        scope: '/'
      });
    }
  }

  registerController(Controller, parameters) {
    const defaultParameters = {
      selector: '.controller'
    };
    const controllerParameters = Object.assign({}, defaultParameters, parameters);
    const controllerInstance = new Controller(
      controllerParameters.selector,
      controllerParameters.data,
      controllerParameters.endpoint,
      controllerParameters.templatePath
    );
    controllerInstance.dom = {
      el: document.querySelector(controllerInstance.selector)
    };
    this.components.push(controllerInstance);
    Promise.all(this.loaders).then(() => this.triggerBoot());
    return controllerInstance;
  }

  registerComponent(ComponentClass, name, parameters, callerInstance) {
    const defaultParameters = {
    };
    const componentParameters = Object.assign({}, defaultParameters, parameters);
    const componentInstance = new ComponentClass(
      componentParameters.selector,
      componentParameters.data,
      componentParameters.endpoint,
      componentParameters.templatePath
    );
    componentInstance.callerInstance = callerInstance;
    this.components.push(componentInstance);
    const cmp = {};
    cmp[name] = componentInstance;
    return cmp;
  }

  triggerBoot() {
    this.components.reverse().forEach((componentInstance) => {
      if (componentInstance.callerInstance) {
        const parent = componentInstance.callerInstance.dom.el;
        componentInstance.dom = {
          parent,
          el: parent.querySelector(componentInstance.selector)
        };
      }
    });
    this.components.map((x) => x.boot());
  }

  // return new Promise((promiseResolve) => {
  //     if (!this.endpoint) {
  //       promiseResolve(true);
  //       return;
  //     }
  //     app.loadData(this.endpoint).then(data => {
  //       this.updateData(data);
  //       promiseResolve(true);
  //     });
  //   });

  loadData(uri) {
    const loader = new Promise((promiseResolve) => {
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
    this.loaders.push(loader);
    return loader;
  }

  loadTemplate(templatePath) {
    const loader = new Promise((promiseResolve) => {
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
    this.loaders.push(loader);
    return loader;
  }

  switchPage(uri, setHistory = true) {
    xhr({ uri }, (error, response) => {
      if (error) {
        throw new Error(error);
      }
      // Wipe the <body> and replace with new content to get rid of dom events
      // and other stuff the previous controller may added.
      // const $wrapper = document.implementation.createHTMLDocument().documentElement;
      // $wrapper.innerHTML = response.body;
      // const $body = $wrapper.querySelector('body');
      // const $controller = document.querySelector('.controller');
      // const $newController = $body.querySelector('.controller');
      // const $parentNode = $controller.parentNode;
      // $parentNode.replaceChild($newController, $controller);
      // // Reload the controller script.
      // const $oldControllerScript = $body.querySelector('#controller-script');
      // const scriptSrc = $oldControllerScript.src;
      // console.log($oldControllerScript);
      // $oldControllerScript.remove();
      // const controllerScript = document.createElement('script');
      // controllerScript.src = scriptSrc;
      // controllerScript.id = 'controller-script';
      // document.querySelector('body').appendChild(controllerScript);

      // history.pushState({ uri }, $controller.querySelector('h1').text, uri);

      // Completely reload;
      document.open();
      document.write(response.body);
      document.close();

      if (setHistory) {
        history.pushState({ uri }, document.title, uri);
      }
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
