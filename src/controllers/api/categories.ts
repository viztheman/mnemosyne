const BAD_ID = 'Invalid ID.';
const NOT_FOUND = 'Category not found.';
const ALL_REQUIRED = 'Title and Order fields are required.';
const SOME_REQUIRED = 'Title or Order field is required.';
const INVALID = 'One or more fields are invalid.';
const SERVER_ERROR = 'Server error.'

import {Router, json} from 'express';
import apiKey from '../../middleware/api-key';
import isAdmin from '../../middleware/is-admin';
import Category from '../../models/Category';

const router = Router();

router.get('/', apiKey(), async (req, res) => {
    try {
        const categories = await Category.find().lean();
        res.json({categories});
    }
    catch (err) {
        console.error(err);
        res.status(500).json({error: SERVER_ERROR});
    }
});

router.get('/:_id', apiKey(), async (req, res) => {
    try {
        const _id = parseInt(req.params._id);
        if (!_id)
            res.status(400).json({error: BAD_ID});
        
        const category = await Category.findOne({_id}).lean();
        if (!category)
            res.status(404).json({error: NOT_FOUND});

        res.json(category);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({error: SERVER_ERROR});
    }
});

router.post('/', apiKey(), isAdmin(), json(), async (req, res) => {
    try {
        const {title} = req.body;
        const order = parseInt(req.body.order);

        if (!title || !order)
            return res.status(400).json({error: ALL_REQUIRED});
        
        try {
            const category = new Category({title, order});
            await category.save();

            res.json(category);
        }
        catch (err) {
            console.error(err);
            return res.status(400).json({error: INVALID});
        }
    }
    catch (err) {
        console.error(err);
        res.status(500).json({error: SERVER_ERROR});
    }
});

router.put('/:_id', apiKey(), isAdmin(), json(), async (req, res) => {
    try {
        const _id = parseInt(req.params._id);
        if (!_id)
            return res.status(404).json({error: BAD_ID});

        const {title} = req.body;
        const order = parseInt(req.body.order);

        if (!title && !order)
            return res.status(400).json({error: SOME_REQUIRED});
        
        const category = await Category.findOne({_id});
        if (!category)
            return res.status(404).json({error: NOT_FOUND});

        if (title) category.title = title;
        if (order) category.order = order;
        try {
            await category.save();
            res.json(category);
        }
        catch (err) {
            console.error(err);
            res.status(400).json({error: INVALID});
        }
    }
    catch (err) {
        console.error(err);
        res.status(500).json({error: SERVER_ERROR});
    }
});

router.delete('/:_id', apiKey(), isAdmin(), async (req, res) => {
    try {
        const _id = parseInt(req.params._id);
        if (!_id)
            return res.status(404).json({error: BAD_ID});

        const result = await Category.findOneAndDelete({_id});
        if (!result)
            return res.status(404).json({error: NOT_FOUND});

        res.status(204).end();
    }
    catch (err) {
        console.error(err);
        res.status(500).json({error: SERVER_ERROR});
    }
});

export default router;