class App {
  constructor() {
    this.templates = {};
    // this.registerServiceWorker();
  }

  registerController(Controller) {
    this.controller = new Controller(document.querySelector('.controller'), 'views/index');
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
