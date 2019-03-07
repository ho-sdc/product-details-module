const { app, initializeApp } = require('./app');
const request = require('supertest');

let genericProduct = {
  name: 'Awesome Plastic Chair',
  images: [
    'https://picsum.photos/1000/1000?image=673',
    'https://picsum.photos/1000/1000?image=674',
    'https://picsum.photos/1000/1000?image=675',
    'https://picsum.photos/1000/1000?image=676',
    'https://picsum.photos/1000/1000?image=677',
    'https://picsum.photos/1000/1000?image=678'
  ],
  sizes: {
    '5': 1,
    '6': 1,
    '7': 1,
    '8': 1,
    '10': 1,
    '6h': 1,
    '8h': 1,
    '10h': 1,
    '11h': 1
  },
  retailPrice: 561,
  salePrice: 394,
  reviewCount: 998,
  reviewRating: 4.61981,
  tags: ['Health'],
  colors: ['gold', 'indigo'],
  heartToggle: false
};

describe('API CRUD Operations', () => {
  beforeAll(async () => {
    await initializeApp();
  });
  test('server responds to GET request', async () => {
    let productId = Math.floor(Math.random() * 1e6 + 9e6);
    let response = await request(app).get(`/abibas/product/${productId}`);
    return expect(response.body).toEqual(
      expect.objectContaining({
        productId: expect.any(Number),
        name: expect.any(String),
        images: expect.any(Array),
        sizes: expect.any(Object),
        retailPrice: expect.any(Number),
        salePrice: expect.any(Number),
        reviewCount: expect.any(Number),
        reviewRating: expect.any(Number),
        tags: expect.any(Array),
        colors: expect.any(Array),
        heartToggle: expect.any(Boolean)
      })
    );
  });

  test('server responds to POST request', async () => {
    let response = await request(app)
      .post('/abibas/product')
      .send(genericProduct);
    expect(response.body.productId).toBeGreaterThan(9999999);
    delete response.body.productId;
    return expect(response.body).toEqual(genericProduct);
  });

  test('server responds to PUT request', async () => {
    let productId = Math.floor(Math.random() * 1e6 + 9e6);
    await request(app)
      .put(`/abibas/product/${productId}`)
      .send(genericProduct);
    let response = await request(app).get(`/abibas/product/${productId}`);
    delete response.body.productId;
    return expect(response.body).toEqual(genericProduct);
  });

  test('server responds to DELETE request', async () => {
    let productId = Math.floor(Math.random() * 1e6 + 9e6);
    let deleteResponse = await request(app).delete(
      `/abibas/product/${productId}`
    );
    expect(deleteResponse.status).toBe(200);
    let getResponse = await request(app).get(`/abibas/product/${productId}`);
    return expect(getResponse.status).toBe(404);
  });
});
