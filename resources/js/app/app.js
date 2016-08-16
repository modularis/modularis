/* eslint-env browser */
class App {
  boot(Controller) {
    const $controllerRoot = document.querySelector('body');
    this.controller = new Controller($controllerRoot);
  }
}

const app = new App();
export default app;
