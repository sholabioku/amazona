import express from 'express';
import colors from 'colors';

import data from './data.js';
const app = express();

app.get('/api/products', (req, res) => {
  res.send(data.products);
});

app.get('/api/products/slug/:slug', (req, res) => {
  const { slug } = req.params;
  const product = data.products.find((p) => p.slug === slug);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: 'Product not found' });
  }
});

app.get('/api/products/:id', (req, res) => {
  const { id } = req.params;
  const product = data.products.find((p) => p._id === id);
  if (product) {
    res.send(product);
  } else {
    res.status(404).send({ message: 'Product not found' });
  }
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`.yellow.bold);
});
