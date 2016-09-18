/* global setDOM */
/* global Handlebars */
/* global xhr */

class App {
  constructor() {
    this.components = [];
    this.data = {};
    this.templates = {};
    this.loaders = [];

    // this.registerServiceWorker();
    window.onpopstate = (e) => this.switchPage(e.state.uri, e.state.templateName, false);
  }

  registerServiceWorker() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/service-worker.js', {
        scope: '/'
      });
    }
  }

  registerController(Controller) {
    this.registerComponent(Controller);
    Promise.all(this.loaders).then(() => this.initController(Controller));
  }

  registerComponent(Component) {
    const componentData = Component.register();
    if (componentData.endpoint) {
      this.loaders.push(this.loadData(componentData.endpoint));
    }
    if (componentData.templatePath) {
      this.loaders.push(this.loadTemplate(componentData.templatePath));
    }
    Component.registerComponents();
  }

  initController(Controller) {
    const $el = document.querySelector('.js-controller');
    this.controller = this.initComponent(Controller, $el);
    if ($el.classList.contains('is-dirty')) {
      this.controller.dom.el = this.controller.render({}, false);
      this.controller.init();
    }
    this.components.reverse().map((x) => x.boot());
  }

  initComponent(Component, $el) {
    const componentData = Component.register();
    const component = new Component(
      $el,
      this.data[componentData.endpoint],
      componentData.templatePath
    );
    this.components.push(component);
    return component;
  }

  loadData(uri, reload = false) {
    return new Promise((promiseResolve) => {
      if (this.data[uri] && !reload) {
        promiseResolve(true);
        return;
      }
      this.data[uri] = 'loading';
      xhr({
        uri,
        headers: {
          'X-Requested-With': 'XMLHttpRequest'
        }
      }, (error, response) => {
        if (error) {
          throw new Error(error);
        }
        this.data[uri] = JSON.parse(response.body);
        promiseResolve(this.data[uri]);
      });
    });
  }

  loadTemplate(templatePath, reload = false) {
    return new Promise((promiseResolve) => {
      if (this.templates[templatePath] && !reload) {
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
        promiseResolve(this.templates[templatePath]);
      });
    });
  }

  switchPage(uri, templateName, setHistory = true) {
    // Mark the old controller as dirty to trigger render.
    this.controller.dom.el.classList.add('is-dirty');

    // Add new controller script and remove the old one.
    const controllerScriptClass = 'js-controller-script';
    document.querySelector(`.${controllerScriptClass}`).remove();
    const controllerScript = document.createElement('script');
    controllerScript.src = `/js/${templateName}.js`;
    controllerScript.classList.add(controllerScriptClass);
    document.querySelector('body').appendChild(controllerScript);

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
