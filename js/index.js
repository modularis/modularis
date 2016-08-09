/* eslint-env browser */
// Example usage:
// import leftPad from 'left-pad';
// let foo = leftPad('bar', 2);

const request = new Request('/view-loader/components.button.template');

fetch(request)
  .then((response) => {
    response.text().then(html => console.log(html));
  }).catch((error) => {
    console.log(error);
  });
