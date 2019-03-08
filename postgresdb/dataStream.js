const { Readable } = require('stream');
const faker = require('faker');
faker.seed(42);

class DataStream extends Readable {
  constructor(options) {
    super(options);
    this.idCount = 0;
    this.possibleSizes = [
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
  }

  randInt(low, high) {
    return Math.floor(Math.random() * (high - low) + low);
  }

  _read(size) {
    this.idCount++;
    let product = {};
    product.name = faker.commerce.productName();
    product.images = [];
    let imageCount = this.randInt(5, 11);
    for (let k = 0; k < imageCount; k++) {
      product.images.push(
        'https://picsum.photos/1000/1000?image=' + ((this.idCount + k) % 1085)
      );
    }
    product.images = '"{' + product.images.toString() + '}"';
    product.sizes = {};
    for (let size of this.possibleSizes) {
      if (Math.random() > 0.5) {
        product.sizes[size] = 1;
      }
    }
    product.sizes =
      '"' + JSON.stringify(product.sizes).replace(/"/g, '""') + '"';
    product.retailPrice = faker.commerce.price();
    product.salePrice = Math.floor(product.retailPrice * Math.random());
    product.reviewCount = this.randInt(30, 1000);
    product.reviewRating = Math.random() * 2.5 + 2.5;
    let tagCount = this.randInt(1, 3);
    product.tags = [];
    for (let k = 0; k < tagCount; k++) {
      product.tags.push(faker.commerce.department());
    }
    product.tags = '"{' + product.tags.toString() + '}"';

    product.colors = [];
    let colorCount = this.randInt(1, 5);
    for (let k = 0; k < colorCount; k++) {
      product.colors.push(faker.commerce.color());
    }
    product.colors = '"{' + product.colors.toString() + '}"';
    product.heartToggle = false;
    this.push(Object.values(product).toString() + '\n');
    if (this.idCount % 1e6 === 0) console.log(this.idCount);
    if (this.idCount === 1e7) this.push(null);
  }
}

module.exports = DataStream;
