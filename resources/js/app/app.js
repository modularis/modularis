class App {
  constructor() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/service-worker.js', {
        scope: '/'
      });
    }
  }

  registerController(Controller) {
    const $controllerRoot = document.querySelector('body');
    this.controller = new Controller($controllerRoot);
  }
}

const app = new App();
export default app;
