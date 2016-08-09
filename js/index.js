/* eslint-env browser */
// Example usage:
// import leftPad from 'left-pad';
// let foo = leftPad('bar', 2);

const request = new Request('/template/button');

fetch(request)
  .then((response) => {
    response.text().then(dings => console.log(dings));
  }).catch((error) => {
    console.log(error);
  });
