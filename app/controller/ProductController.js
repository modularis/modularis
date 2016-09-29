module.exports = class ProductController {
  constructor(request, response) {
    this.request = request;
    this.response = response;
  }

  page() {
    const templateName = `product-page`;
    const data = {
      header: `Product XY`,
      body: `Lorem Ipsum dolor sit`,
      image: `img/product.jpg`,
      details: {
        weight: `20kg`,
        price: `300 €`
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

  addToCart() {
    const templateName = `product-add-to-cart`;
    const data = {
      header: `cart`,
      cart: {
        products: [
          {
            id: 1,
            picture: {
              src: `http://placehold.it/150x150`
            },
            title: `Product 1`,
            price: 300,
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
            price: 299,
            quantity: 1,
            addToCartButton: {
              title: `Add to cart`,
              anchor: `add-to-cart/2`
            }
          }
        ],
        total: 599
      },
      templateName
    };
    if (
      this.request.headers[`x-requested-with`] &&
      this.request.headers[`x-requested-with`] === `XMLHttpRequest`
    ) {
      let jsonData;
      switch (this.request.params.id) {
        case `2`: {
          // jsonData = data.cart.products[1];
          jsonData = {
            status: `error`,
            title: `Error!`,
            body: `Product not available`
          };
          break;
        }
        default: {
          jsonData = data.cart.products[0];
          break;
        }
      }
      this.response.json(jsonData);
    } else {
      this.response.render(templateName, data);
    }
  }
};
