/* eslint-env browser */
// Example usage:
// import leftPad from 'left-pad';
// let foo = leftPad('bar', 2);

// componentLoader().then(component => {
//   const button = new Function('return ' + component[0]);
//   const template = HandlebarsRuntime.template(button());
//   const markup = template({ title: 'GEIL' });
//   let $button = document.querySelector('.c-button');

//   $button = replaceNode($button, markup);
//   console.log($button);
// });

import Button from '../components/button/index.js';
import Card from '../components/card/index.js';

const button = new Button(document.querySelector('.c-button'), 'components/button/template');
const card = new Card(document.querySelector('.c-card'), 'components/card/template');
