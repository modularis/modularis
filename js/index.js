/* eslint-env browser */
// Example usage:
// import leftPad from 'left-pad';
// let foo = leftPad('bar', 2);

const request = new Request('/template/button');

fetch(request)
  .then((response) => {
    response.blob().then(res => {
      console.log(res);
    });
  }).catch((error) => {
    console.log(error);
  });
