module.exports = class IndexController {
  constructor(request, response) {
    this.request = request;
    this.response = response;
  }

  index() {
    const data = { title: 'Test' };
    if (this.request.headers.accept && this.request.headers.accept.indexOf('json') > -1) {
      this.response.json(data);
    } else {
      this.response.render('index', data);
    }
  }
};
