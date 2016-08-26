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
    this.controller = new Controller(document.querySelector('body'));
  }
}

const app = new App();
export default app;
