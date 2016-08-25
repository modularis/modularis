class App {
  constructor() {
    this.templates = {};

    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/service-worker.js', {
        scope: '/'
      });
    }
  }

  registerController(Controller) {
    return new Promise((promiseResolve) => {
      const $controllerRoot = document.querySelector('body');
      this.controller = new Controller($controllerRoot);
      promiseResolve();
    });
  }
}

const app = new App();
export default app;
