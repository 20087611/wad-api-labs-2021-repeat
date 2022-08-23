import express from 'express';
import { genres } from './genresData';

const router = express.Router();

// get all genres
router.get('/', (req, res) => {
    res.json(genres);
});

// get genre by id
router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if ( genres.genres.some(g => g.id == id) ) {
        res.status(200).json( genres.genres.find(g => g.id == id) );
    } else {
        res.status(404).json({
            message: 'The resource you requested could not be found.',
            status_code: 404
        });
    }
});

export default router;