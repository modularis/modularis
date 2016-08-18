import app from '../app/app.js';
import Controller from '../app/controller.js';

import Button from '../../components/button/index.js';
import Card from '../../components/card/index.js';

class Index extends Controller {
  registerComponents() {
    this.cmp.button = new Button(document.querySelector('.c-button'));
    this.cmp.card = new Card(document.querySelector('.c-card'));
  }

  boot() {
    super.boot();
  }
}

app.init(Index);
