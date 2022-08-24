import express from 'express';
import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';
import User from './userModel';
import movieModel from '../movies/movieModel';
import personModel from '../persons/personModel';

const router = express.Router(); // eslint-disable-line

// Get all users
router.get('/', async (req, res) => {
    const users = await User.find();
    res.status(200).json(users);
});

// Register OR authenticate a user
router.post('/', asyncHandler(async (req, res, next) => {
    if (!req.body.username || !req.body.password) {
        res.status(401).json({ success: false, msg: 'Please pass username and password.' });
        return next();
    }
    if (req.query.action === 'register') {
        let pwdRegExp = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{5,}$/;
        if( pwdRegExp.test(req.body.password) ){
            await User.create(req.body);
            res.status(201).json({code: 201, msg: 'Successful created new user.'});
        }else{
            res.status(401).json({code: 401,msg: 'Bad Password.'});
        }
    } else {
        const user = await User.findByUserName(req.body.username);
        if (!user) return res.status(401).json({ code: 401, msg: 'Authentication failed. User not found.' });
        user.comparePassword(req.body.password, (err, isMatch) => {
            if (isMatch && !err) {
                // if user is found and password matches, create a token
                const token = jwt.sign(user.username, process.env.SECRET);
                // return the information including token as JSON
                res.status(200).json({ success: true, token: 'BEARER ' + token });
            } else {
                res.status(401).json({ code: 401, msg: 'Authentication failed. Wrong password.' });
            }
        });
    }
}));

// Update a user
router.put('/:id', async (req, res) => {
    if (req.body._id) delete req.body._id;
    const result = await User.updateOne({
        _id: req.params.id,
    }, req.body);
    if (result.matchedCount) {
        res.status(200).json({ code: 200, msg: 'User Updated Sucessfully' });
    } else {
        res.status(404).json({ code: 404, msg: 'Unable to Update User' });
    }
});

// get favorites of a user
router.get('/:userName/favourites', asyncHandler(async (req, res) => {
    const userName = req.params.userName;
    const user = await User.findByUserName(userName).populate('favourites');
    res.status(200).json(user.favourites);
}));

//Add a movie to favorites fo a user
router.post('/:userName/favourites', asyncHandler(async (req, res) => {
    const newFavourite = req.body.id;
    const userName = req.params.userName;
    const movie = await movieModel.findByMovieDBId(newFavourite);
    if(movie == null){
        res.status(401).json({code: 401,msg: 'Movie id does not existed.'});
    }
    const user = await User.findByUserName(userName);
    await user.favourites.push(movie._id);
    await user.save();
    
    if (user.favourites.indexOf(movie._id) == -1) {
        await user.favourites.push(movie._id);
        await user.save();
        res.status(201).json(user);
    }else{
        res.status(401).json({code: 401,msg: 'Already in favourites.'});
    }
}));



// get like persons of a user
router.get('/:userName/likes', asyncHandler(async (req, res) => {
    const userName = req.params.userName;
    const user = await User.findByUserName(userName).populate('likes');
    res.status(200).json(user.likes);
}));

//Add a liked person, including Error Handling
router.post('/:userName/likes', asyncHandler(async (req, res) => {
    const newLike = req.body.id;
    const userName = req.params.userName;
    const person = await personModel.findByPersonDBId(newLike);
    if(person == null){
        res.status(401).json({code: 401,msg: 'Person id does not existed.'});
    }
    const user = await User.findByUserName(userName);

    if (user.likes.indexOf(person._id) == -1) {
        await user.likes.push(person._id);
        await user.save();
        res.status(201).json(user);
    }else{
        res.status(401).json({code: 401,msg: 'Already in likes.'});
    }
}));

export default router;