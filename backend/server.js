import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';

import data from './data.js';
import seedRouter from './routes/seedRoutes.js';
import productRouter from './routes/productRoutes.js';

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
app.use('/api/products', productRouter);

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Serve at http://localhost:${port}`.yellow.bold);
});
