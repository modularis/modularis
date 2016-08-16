import app from '../app/app.js';
import Controller from '../app/controller.js';

import Button from '../../components/button/index.js';
import Card from '../../components/card/index.js';

class Index extends Controller {
  constructor() {
    super();
    this.controllerName = 'Index';
    const button = new Button(document.querySelector('.c-button'), 'components/button/template');
    const card = new Card(document.querySelector('.c-card'), 'components/card/template');
  }
}

app.boot(Index);
