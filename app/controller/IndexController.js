module.exports = class IndexController {
  constructor(request, response) {
    this.request = request;
    this.response = response;
  }

  index() {
    const templateName = 'index';
    const data = {
      header: 'modularis',
      card: {
        title: 'Test',
        button: { title: 'Test Button' },
        partyMode: false
      },
      templateName
    };
    if (
      this.request.headers['x-requested-with'] &&
      this.request.headers['x-requested-with'] === 'XMLHttpRequest'
    ) {
      this.response.json(data);
    } else {
      this.response.render(templateName, data);
    }
  }
};
