/* global setDOM */
/* global Handlebars */
/* global xhr */

class App {
  constructor() {
    this.components = {};
    this.data = {};
    this.templates = {};
    this.loaders = [];

    this.dataLoaders = {};
    this.templateLoaders = {};

    // this.registerServiceWorker();

    window.onpopstate = (e) => this.switchPage(e.state.uri, e.state.templateName, false);
  }

  registerServiceWorker() {
    if (`serviceWorker` in navigator) {
      navigator.serviceWorker.register(`/service-worker.js`, {
        scope: `/`
      });
    }
  }

  registerController(Controller, templatePaths, endpoint) {
    this.registerComponent(Controller, templatePaths, endpoint);
    Promise.all(this.loaders).then(() => this.initController(Controller));
  }

  registerComponent(Component, templatePaths, endpoint) {
    if (templatePaths && typeof templatePaths !== `object`) templatePaths = [templatePaths];
    this.components[Component] = {
      templatePaths,
      endpoint
    };
    if (templatePaths) {
      templatePaths.forEach((templatePath) =>
        this.loaders.push(this.loadTemplate(templatePath))
      );
    }
    // @TODO: allow array endpoints also.
    if (endpoint) this.loaders.push(this.loadData(endpoint));
  }

  initController(Controller) {
    const $el = document.querySelector(`.js-controller`);
    this.controller = this.initComponent(Controller, $el);
  }

  initComponent(Component, $el, data) {
    const componentData = this.components[Component];
    const component = new Component(
      $el,
      data || this.data[componentData.endpoint],
      componentData.templatePaths
    );
    if ($el.classList.contains(`is-dirty`)) {
      component.dom.el = component.render({}, false);
    }
    component.init();
    return component;
  }

  retryIfOffline(callback) {
    if (!navigator.onLine) {
      setTimeout(() => this.retryIfOffline(callback), 500);
      return;
    }
    callback();
  }

  loadData(uri, reload = true) {
    if (this.dataLoaders[uri] && !reload) {
      return this.dataLoaders[uri];
    }
    const dataLoader = new Promise((done) => {
      this.retryIfOffline(() =>
        xhr({
          uri,
          headers: {
            'X-Requested-With': `XMLHttpRequest`
          }
        }, (error, response) => {
          if (error) {
            throw new Error(error);
          }
          this.data[uri] = JSON.parse(response.body);
          done(this.data[uri]);
        })
      );
    });
    this.dataLoaders[uri] = dataLoader;
    return dataLoader;
  }

  loadTemplate(templatePath, reload = false) {
    if (this.templateLoaders[templatePath] && !reload) {
      return this.templateLoaders[templatePath];
    }
    const templateLoader = new Promise((done) => {
      this.retryIfOffline(() =>
        // Set the template temporary to prevent loading it again.
        xhr({
          uri: `/view-loader/${templatePath.split(`/`).join(`.`)}`,
          headers: {
            'X-Requested-With': `XMLHttpRequest`
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
          done(this.templates[templatePath]);
        })
      );
    });
    this.templateLoaders[templatePath] = templateLoader;
    return templateLoader;
  }

  switchPage(uri, templateName, setHistory = true) {
    // Mark the old controller as dirty to trigger render.
    this.controller.dom.el.classList.add(`is-dirty`);

    // Add new controller script and remove the old one.
    const controllerScriptClass = `js-controller-script`;
    document.querySelector(`.${controllerScriptClass}`).remove();
    const controllerScript = document.createElement(`script`);
    controllerScript.src = `/js/${templateName}.js`;
    controllerScript.classList.add(controllerScriptClass);
    document.querySelector(`body`).appendChild(controllerScript);

    if (setHistory) {
      history.pushState({ uri, templateName }, document.title, uri);
    }
    // xhr({ uri }, (error, response) => {
    //   if (error) {
    //     throw new Error(error);
    //   }
    //   // Wipe the <body> and replace with new content to get rid of dom events
    //   // and other stuff the previous controller may added.
    //   // const $wrapper = document.implementation.createHTMLDocument().documentElement;
    //   // $wrapper.innerHTML = response.body;
    //   // const $body = $wrapper.querySelector('body');
    //   // const $controller = document.querySelector('.controller');
    //   // const $newController = $body.querySelector('.controller');
    //   // const $parentNode = $controller.parentNode;
    //   // $parentNode.replaceChild($newController, $controller);
    //   // // Reload the controller script.
    //   // const $oldControllerScript = $body.querySelector('#controller-script');
    //   // const scriptSrc = $oldControllerScript.src;
    //   // console.log($oldControllerScript);
    //   // $oldControllerScript.remove();
    //   // const controllerScript = document.createElement('script');
    //   // controllerScript.src = scriptSrc;
    //   // controllerScript.id = 'controller-script';
    //   // document.querySelector('body').appendChild(controllerScript);

    //   // history.pushState({ uri }, $controller.querySelector('h1').text, uri);

    //   // Completely reload;
    //   document.open();
    //   document.write(response.body);
    //   document.close();

    //   if (setHistory) {
    //     history.pushState({ uri }, document.title, uri);
    //   }
    // });
  }

  render($el, templatePath, data = {}, domPatching = true) {
    const markup = this.templates[templatePath](data);
    if (domPatching) {
      setDOM($el, markup);
      return $el;
    }
    const $wrap = document.createElement(`div`);
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
