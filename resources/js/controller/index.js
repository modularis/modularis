import app from '../app/app.js';
import Controller from '../app/controller.js';

import Card from '../../components/card/index.js';

class Index extends Controller {
  registerComponents() {
    return new Promise((promiseResolve) => {
      this.cmp.mainTeaser = new Card(document.querySelectorAll('.c-card'), this);
      promiseResolve(true);
    });
  }
}

app.registerController(Index);
