import userModel from '../api/users/userModel';
import users from './users';

import genreModel from '../api/genres/genreModel';
import movieModel from '../api/movies/movieModel';
import personModel from '../api/persons/personModel';
import tvModel from '../api/tvs/tvModel';
import keywordModel from '../api/keywords/keywordModel';
import companyModel from '../api/companies/companyModel';
import keywords from './keywords';
import companies from './companies';

import { getGenres, getMovies, getPersons, getTVs, getMovieReviews, getUpcomingMovies, getNowPlayingMovies, getPopularMovies, getTopRatedMovies } from '../api/tmdb-api';
import dotenv from 'dotenv';

dotenv.config();

// deletes all user documents in collection and inserts test data
async function loadUsers() {
  console.log('load user Data');
  try {
    await userModel.deleteMany();
    await users.forEach(user => userModel.create(user));
    console.info(`${users.length} users were successfully stored.`);
  } catch (err) {
    console.error(`failed to Load user Data: ${err}`);
  }
}

async function loadGenres() {
  console.log('load genre Data');
  try {
    const genres = await getGenres();
    await genreModel.deleteMany();
    await genreModel.collection.insertMany(genres);
    console.info(`${genres.length} genres were successfully stored.`);
  } catch (err) {
    console.error(`failed to Load genre Data: ${err}`);
  }
}

// deletes all movies documents in collection and inserts test data
export async function loadMovies() {
  console.log('load movie data');
  try {
    const movies = await getMovies();
    await movieModel.deleteMany();
    await movieModel.collection.insertMany(movies);
    console.info(`${movies.length} Movies were successfully stored.`);
  } catch (err) {
    console.error(`failed to Load movie Data: ${err}`);
  }
}

export async function loadPersons() {
  console.log('load person data');
  try {
    const persons = await getPersons();
    await personModel.deleteMany();
    await personModel.collection.insertMany(persons);
    console.info(`${persons.length} Persons were successfully stored.`);
  } catch (err) {
    console.error(`failed to Load persons Data: ${err}`);
  }
}

export async function loadTVs() {
  console.log('load TV data');
  try {
    const tvs = await getTVs();
    await tvModel.deleteMany();
    await tvModel.collection.insertMany(tvs);
    console.info(`${tvs.length} TVs were successfully stored.`);
  } catch (err) {
    console.error(`failed to Load tvs Data: ${err}`);
  }
}

export async function loadKeywords() {
  console.log('load keyword Data');
  try {
    await keywordModel.deleteMany();
    await keywordModel.collection.insertMany(keywords);
    console.info(`${keywords.length} keywords were successfully stored.`);
  } catch (err) {
    console.error(`failed to Load keyword Data: ${err}`);
  }
}

export async function loadCompanies() {
  console.log('load company Data');
  try {
    await companyModel.deleteMany();
    await companyModel.collection.insertMany(companies);
    console.info(`${companies.length} companies were successfully stored.`);
  } catch (err) {
    console.error(`failed to Load company Data: ${err}`);
  }
}

if (process.env.SEED_DB == 'True') {
  loadUsers();
  loadGenres();
  loadMovies();
  loadPersons();
  loadTVs();
  loadKeywords();
  loadCompanies();
}