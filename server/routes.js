const router = require('express').Router();
const {
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
} = require('./controllers.js');

router
  .get('/product/:id', getProduct)
  .post('/product', createProduct)
  .put('/product/:id', updateProduct)
  .delete('/product/:id', deleteProduct);

module.exports = router;
