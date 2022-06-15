import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';

import data from './data.js';
import seedRouter from './routes/seedRoutes.js';

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URI)
  .then((conn) => {
    console.log(
      `MongoDB connected: ${conn.connection.host}`.cyan.underline.bold
    );
  })
  .catch((err) => {
    console.log(`MongoDB connection error: ${err.message}`.red.underline.bold);
    process.exit(1);
  });

const app = express();

app.use('/api/seed', seedRouter);

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
