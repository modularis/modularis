const fs = require('fs');
const path = require('path');

module.exports = class ViewLoader {
  constructor(request, response) {
    this.request = request;
    this.response = response;
    this.path = request.params.view
      .split('.')
      .join(path.sep);
    this.path += '.hbs';
  }

  load() {
    return new Promise(promiseResolve => {
      fs.readFile(path.join('..', 'resources', this.path), { encoding: 'utf8' }, (error, data) => {
        if (error) throw error;
        promiseResolve(data);
      });
    });
  }

  deliver() {
    this.load().then(data => this.response.send(data));
  }
};
