module.exports = class IndexController {
  constructor(request, response) {
    this.request = request;
    this.response = response;
  }

  index() {
    const templateName = `index`;
    const data = {
      header: `modularis`,
      productGrid: {
        products: [
          {
            id: 1,
            picture: {
              src: `http://placehold.it/150x150`
            },
            title: `Product 1`,
            price: `300`,
            quantity: 1,
            addToCartButton: {
              title: `Add to cart`,
              anchor: `add-to-cart/1`
            }
          },
          {
            id: 2,
            picture: {
              src: `http://placehold.it/150x150`
            },
            title: `Product 2`,
            price: `299`,
            quantity: 1,
            addToCartButton: {
              title: `Add to cart`,
              anchor: `add-to-cart/2`
            }
          }
        ]
      },
      cart: {
        products: null,
        total: 0
      },
      notificationBar: {
        items: []
      },
      templateName
    };
    if (
      this.request.headers[`x-requested-with`] &&
      this.request.headers[`x-requested-with`] === `XMLHttpRequest`
    ) {
      this.response.json(data);
    } else {
      this.response.render(templateName, data);
    }
  }
};
