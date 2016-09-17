module.exports = class ProductController {
  constructor(request, response) {
    this.request = request;
    this.response = response;
  }

  page() {
    const templateName = 'product-page';
    const data = {
      header: 'Product XY',
      body: 'Lorem Ipsum dolor sit',
      image: 'img/product.jpg',
      details: {
        weight: '20kg',
        price: '300 €'
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
