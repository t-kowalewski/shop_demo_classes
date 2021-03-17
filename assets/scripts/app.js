class Product {
  constructor(title, imgUrl, price, descr) {
    this.title = title;
    this.imageUrl = imgUrl;
    this.price = price;
    this.description = descr;
  }
}

class ElementAttribute {
  constructor(attrName, attrValue) {
    this.name = attrName;
    this.value = attrValue;
  }
}

// Root Parent Component for Inheritance
class Component {
  constructor(renderHookId) {
    this.hookId = renderHookId;
  }

  createRootElement(tag, cssClasses, attributesArr) {
    const element = document.createElement(tag);
    if (cssClasses) {
      element.className = cssClasses;
    }
    if (attributesArr && attributesArr.length > 0) {
      for (const attr of attributesArr) {
        element.setAttribute(attr.name, attr.value);
      }
    }

    document.getElementById(this.hookId).append(element);
    return element;
  }
}

class ShoppingCart extends Component {
  items = [];

  // Setter
  set cartItems(value) {
    this.items = value;
    this.totalOutput.innerHTML = `<h2>Total $${this.totalAmount.toFixed(
      2
    )}</h2>`;
  }

  // Getter
  get totalAmount() {
    return this.items.reduce((acc, currVal) => acc + currVal.price, 0);
  }

  constructor(renderHookId) {
    super(renderHookId);
  }

  addProduct(product) {
    const updatedItems = [...this.items];
    updatedItems.push(product);
    this.cartItems = updatedItems;
  }

  render() {
    const cartEl = this.createRootElement('section', 'cart');
    cartEl.innerHTML = `
      <h2>Total $${0}</h2>
      <button>Order Now</button>
    `;
    this.totalOutput = cartEl.querySelector('h2');
  }
}

class ProductElement extends Component {
  constructor(product, renderHookId) {
    super(renderHookId);
    this.product = product;
  }

  addToCart() {
    App.addProductToCart(this.product); // ***********
  }

  render() {
    const prodEl = this.createRootElement('li', 'product-item');
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
    const addCartBtn = prodEl.querySelector('button');
    addCartBtn.addEventListener('click', this.addToCart.bind(this));
  }
}

class ProductList extends Component {
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

  constructor(renderHookId) {
    super(renderHookId);
  }

  render() {
    const prodList = this.createRootElement('ul', 'product-list', [
      new ElementAttribute('id', 'prod-list'),
    ]);

    for (const product of this.products) {
      const prodEl = new ProductElement(product, 'prod-list');
      prodEl.render();
    }
  }
}

class Shop {
  render() {
    const productList = new ProductList('app');
    productList.render();

    this.cart = new ShoppingCart('app');
    this.cart.render();
  }
}

// Main Class with Static Properties & Methods
class App {
  static cart;

  static init() {
    const shop = new Shop();
    shop.render();
    this.cart = shop.cart;
  }

  static addProductToCart(product) {
    this.cart.addProduct(product);
  }
}

App.init();
