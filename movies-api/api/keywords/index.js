import express from 'express';
import Keyword from './keywordModel';

const router = express.Router();

// get all keywords
router.get('/', async (req, res) => {
    const keywords = await Keyword.find();
    res.status(200).json(keywords);
});

// get keyword by id
router.get('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const keywords = await Keyword.find();
    
    if (keywords.some(g => g.id == id)) {
        res.status(200).json(keywords.find(g => g.id == id));
    } else {
        res.status(404).json({ code: 404, msg: 'Unable to find keyword' });
    }
});

export default router;