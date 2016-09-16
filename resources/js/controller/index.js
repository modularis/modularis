import app from '../app/app.js';
import Controller from '../app/controller.js';

import Card from '../../components/card/index.js';

class Index extends Controller {
  registerComponents() {
    Object.assign(this.cmp, {
      mainTeaser: new Card(document.querySelectorAll('.c-card'))
    });
  }

  // domBindings() {
  //   this.dom.header = this.dom.el.querySelector('h1');
  // }

  // domEvents() {
  //   this.dom.header.addEventListener('click', () => this.view.loadData('/')
  //     .then(data => {
  //       data = JSON.parse(data);
  //       data['header'] = 'modularis reloaded!!111';
  //       this.render(data);
  //     }));
  // }

  // render(data = {}) {
  //   console.log(data);
  //   this.view.render(data);
  // }
}

app.registerController(Index);
