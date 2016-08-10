/* eslint-env browser */
// Example usage:
// import leftPad from 'left-pad';
// let foo = leftPad('bar', 2);

import HandlebarsRuntime from 'handlebars/runtime';

function viewLoader() {
  return new Promise((promiseResolve) => {
    const viewRequest = new Request('/view-loader/components.button.template');
    fetch(viewRequest)
      .then((response) => {
        response.text().then(html => promiseResolve(html));
      }).catch((error) => {
        console.log(error);
      });
  });
}

function dataLoader() {
  return new Promise((promiseResolve) => {
    const jsonHeaders = new Headers();
    jsonHeaders.append('Accept', 'json');
    const jsonRequest = new Request('/');
    fetch(jsonRequest, { headers: jsonHeaders })
      .then((response) => {
        response.text().then(json => promiseResolve(json));
      }).catch((error) => {
        console.log(error);
      });
  });
}

function componentLoader() {
  return new Promise((promiseResolve) => {
    const componentData = [
      viewLoader(),
      dataLoader()
    ];
    Promise.all(componentData).then(component => {
      promiseResolve(component);
    });
  });
}

componentLoader().then(component => {
  const button = new Function('return ' + component[0]);
  const template = HandlebarsRuntime.template(button());
  console.log(template({ title: 'GEIL' }));
});
