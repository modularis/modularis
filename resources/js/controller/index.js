import app from '../app/app.js';
import Controller from '../app/controller.js';

import Card from '../../components/card/index.js';

class Index extends Controller {
  registerComponents() {
    this.cmp.card = new Card(document.querySelector('.c-card'), this);
  }

  boot() {
    super.boot();
  }
}

app.registerController(Index);
