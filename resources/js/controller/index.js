import app from '../app/app.js';
import Controller from '../app/controller.js';

import Card from '../../components/card/index.js';

class Index extends Controller {
  registerComponents() {
    // TODO: Object assign not pretty api.
    Object.assign(this.cmp, {
      mainTeasers: new Card(document.querySelectorAll('.c-card'))
    });
  }

  ready() {
    this.cmp.mainTeasers.forEach((mainTeaser) => mainTeaser.updateData(this.data.card));
  }
}

app.registerController(Index, '/', 'views.index');
