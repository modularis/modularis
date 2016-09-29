import app from '../../js/app/app.js';
import Component from '../../js/app/component.js';

export default class Card extends Component {}

app.registerComponent(Card, [
  `components/card/views/main`,
  `components/card/views/body`,
  `components/card/views/figure`
]);
