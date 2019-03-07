const { Readable } = require('stream');
const faker = require('faker');
faker.seed(42);
const randInt = (low, high) => {
  return Math.floor(Math.random() * (high - low) + low);
};
const possibleSizes = [
  '5',
  '5h',
  '6',
  '6h',
  '7',
  '7h',
  '8',
  '8h',
  '9',
  '9h',
  '10',
  '10h',
  '11',
  '11h',
  '12',
  '12h',
  '13'
];
class DataStream extends Readable {
  constructor(options) {
    super(options);
    this.idCount = 0;
  }

  _read(size) {
    let product = {};
    product.productId = this.idCount;
    this.idCount++;
    product.name = faker.commerce.productName();
    product.images = [];
    let imageCount = randInt(5, 11);
    for (let k = 0; k < imageCount; k++) {
      product.images.push(
        'https://picsum.photos/1000/1000?image=' + ((this.idCount + k) % 1085)
      );
    }

    product.sizes = {};
    for (let size of possibleSizes) {
      if (Math.random() > 0.5) {
        product.sizes[size] = 1;
      }
    }
    product.retailPrice = faker.commerce.price();
    product.salePrice = Math.floor(product.retailPrice * Math.random());
    product.reviewCount = randInt(30, 1000);
    product.reviewRating = Math.random() * 2.5 + 2.5;
    let tagCount = randInt(1, 2);
    product.tags = [];
    for (let k = 0; k < tagCount; k++) {
      product.tags.push(faker.commerce.department());
    }
    product.colors = [];
    let colorCount = randInt(1, 5);
    for (let k = 0; k < colorCount; k++) {
      product.colors.push(faker.commerce.color());
    }
    product.heartToggle = false;
    if (this.idCount === 1) this.push('[');
    this.push(JSON.stringify(product) + (this.idCount === 1e7 ? ']' : ','));
    if (this.idCount === 1e7) this.push(null);
  }
}

// new DataStream().pipe(process.stdout);

module.exports = DataStream;
