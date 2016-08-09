const fs = require('fs');
const path = require('path');

module.exports = class TemplateLoader {
  constructor(req, res, templatePath = path.join(process.cwd(), 'views')) {
    this.req = req;
    this.res = res;
    this.templatePath = templatePath;
    this.path = req.params.template
      .split('.')
      .join(path.sep);
    this.path += '.handlebars';
  }

  load() {
    return new Promise(promiseResolve => {
      fs.readFile(path.join(this.templatePath, this.path), { encoding: 'utf8' }, (error, data) => {
        if (error) throw error;
        promiseResolve(data);
      });
    });
  }

  deliver() {
    this.load().then(data => this.res.send(data));
  }
};
