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

import Button from './module/button/index.js';

const button = new Button(document.querySelector('.c-button'), 'components/button/template');
