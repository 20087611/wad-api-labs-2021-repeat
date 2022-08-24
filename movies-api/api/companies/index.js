import express from 'express';
import Company from './companyModel';

const router = express.Router();

// get all companies
router.get('/', async (req, res) => {
    const companies = await Company.find();
    res.status(200).json(companies);
});

// get company by id
router.get('/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const companies = await Company.find();
    
    if (companies.some(g => g.id == id)) {
        res.status(200).json(companies.find(g => g.id == id));
    } else {
        res.status(404).json({ code: 404, msg: 'Unable to find company' });
    }
});

export default router;