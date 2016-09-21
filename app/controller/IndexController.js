module.exports = class IndexController {
  constructor(request, response) {
    this.request = request;
    this.response = response;
  }

  index() {
    const templateName = 'index';
    const data = {
      header: 'modularis',
      productGrid: {
        products: [
          {
            picture: {
              src: 'http://placehold.it/150x150'
            },
            title: 'Product 1'
          },
          {
            picture: {
              src: 'http://placehold.it/150x150'
            },
            title: 'Product 2'
          }
        ]
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
