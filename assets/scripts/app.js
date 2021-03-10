class Product {
  constructor(title, imgUrl, price, descr) {
    this.title = title;
    this.imageUrl = imgUrl;
    this.price = price;
    this.description = descr;
  }
}

class ProductElement {
  constructor(product) {
    this.product = product;
  }

  render() {
    const prodEl = document.createElement('li');
    prodEl.classList.add('product-item');
    prodEl.innerHTML = `
        <div>
          <img src="${this.product.imageUrl} alt="${this.product.title}">
          <div class="product-item__content">
            <h2>${this.product.title}</h2>
            <h3>$${this.product.price}</h3>
            <p>${this.product.description}</p>
            <button>Add to Card</button>
          </div>
        </div>
      `;
    return prodEl;
  }
}

class ProductList {
  products = [
    new Product(
      'Hat',
      'https://external-content.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.taghats.com%2Fwp-content%2Fuploads%2F2015%2F12%2FBlue-Bucket-Hat-Pictures.jpg&f=1&nofb=1',
      19.95,
      'Cool hat'
    ),
    new Product(
      'T-Shirt',
      'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fimages.topman.com%2Fi%2FTopMan%2FTM71B20RGRN_F_1.jpg%3F%24Zoom%24&f=1&nofb=1',
      15.95,
      'Classic T-shirt'
    ),
  ];

  render() {
    const mainDiv = document.getElementById('app');
    const prodList = document.createElement('ul');
    prodList.classList.add('product-list');

    for (const product of this.products) {
      const prodEl = new ProductElement(product);
      const renderedProdEl = prodEl.render();
      prodList.append(renderedProdEl);
    }

    mainDiv.append(prodList);
  }
}

const productList = new ProductList();
productList.render();
