import dotenv from 'dotenv';
import express from 'express';
import moviesRouter from './api/movies';

dotenv.config();

const app = express();
app.use(express.json());

const port = process.env.PORT;

// app.use(express.static('public'));
app.use('/api/movies', moviesRouter);

app.listen(port, () => {
  console.info(`Server running at ${port}`);
});