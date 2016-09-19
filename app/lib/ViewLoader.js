// @TODO: maybe rename to TemplateLoader ??
const fs = require('fs');
const path = require('path');
const Handlebars = require('handlebars');

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
      fs.readFile(path.join('resources', this.path), {
        encoding: 'utf8'
      }, (error, data) => {
        if (error) throw error;
        promiseResolve(data);
      });
    });
  }

  deliver() {
    this.load().then(data => {
      // @TODO: Use uglify.
      const precompiledData = Handlebars.precompile(data);
      this.response.send(precompiledData);
    });
  }
};
