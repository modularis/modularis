import app from '../app/app.js';
import Controller from '../app/controller.js';

import Card from '../../components/card/index.js';

class Index extends Controller {
  registerComponents() {
    Object.assign(this.cmp, {
      mainTeaser: new Card(document.querySelectorAll('.c-card'))
    });
  }

  // domEvents() {
  //   this.dom.el.addEventListener('click', () => this.view.render({ header: 'modularis' }));
  // }
}

app.registerController(Index);
