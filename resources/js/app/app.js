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
}

const app = new App();
export default app;
