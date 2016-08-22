class App {
  init(Controller) {
    const $controllerRoot = document.querySelector('body');
    this.controller = new Controller($controllerRoot);

    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/service-worker.js', {
        scope: '/'
      });
    }
  }
}

const app = new App();
export default app;
