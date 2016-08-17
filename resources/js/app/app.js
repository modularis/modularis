class App {
  init(Controller) {
    const $controllerRoot = document.querySelector('body');
    this.controller = new Controller($controllerRoot);
  }
}

const app = new App();
export default app;
