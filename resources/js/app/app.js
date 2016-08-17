class App {
  boot(Controller) {
    const $controllerRoot = document.querySelector('body');
    this.controller = new Controller($controllerRoot);
    this.controllerName = this.controller.controllerName;
  }
}

const app = new App();
export default app;
