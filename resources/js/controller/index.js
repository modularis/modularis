import app from '../app/app.js';
import Controller from '../app/controller.js';

import Card from '../../components/card/index.js';

class Index extends Controller {
  registerComponents() {
    this.cmp = {
      mainTeaser: new Card(document.querySelectorAll('.c-card'))
    };
  }

  boot() {
    // @TODO: trigger boot of the controller.
    console.log('test');
  }
}

app.registerController(Index);
