import express from 'express';
import asyncHandler from 'express-async-handler';
import Genre from './genreModel';
import { genres } from './genresData';

const router = express.Router();

// get all genres
router.get('/', async (req, res) => {
    const genres = await Genre.find();
    res.status(200).json(genres);
});

// get genre by id
router.get('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const genres = await Genre.find();
    
    if (genres.some(g => g.id == id)) {
        res.status(200).json(genres.find(g => g.id == id));
    } else {
        res.status(404).json({ code: 404, msg: 'Unable to find genre' });
    }
});

export default router;