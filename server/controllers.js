const {
  dbFetch,
  dbCreate,
  dbUpdate,
  dbDelete
} = require('../postgresdb/dbHelpers.js');

module.exports = {
  getProduct: (req, res) => {
    let productId = Number(req.params.id);
    dbFetch(productId)
      .then(product => {
        if (product) {
          res.status(200).json(product);
        } else {
          res.status(404).end();
        }
      })
      .catch(() => res.status(404).end());
  },
  createProduct: (req, res) => {
    let product = req.body;
    dbCreate(product)
      .then(productId =>
        res.status(201).json(Object.assign({ productId }, product))
      )
      .catch(() => res.status(404).end());
  },
  updateProduct: (req, res) => {
    let newProduct = req.body;
    let productId = Number(req.params.id);
    dbUpdate(productId, newProduct)
      .then(productId => res.status(200).end(productId))
      .catch(() => res.status(404).end());
  },
  deleteProduct: (req, res) => {
    let productId = Number(req.params.id);
    dbDelete(productId)
      .then(() => res.status(200).json('delete successful'))
      .catch(() => res.status(404).end());
  }
};
