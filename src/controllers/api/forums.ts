const CATEGORY_REQUIRED = 'Category ID is required.';
const BAD_ID = 'Invalid ID.';
const NOT_FOUND = 'Forum not found.';
const ALL_REQUIRED = 'Title, Order, and Category fields are required.';
const SOME_REQUIRED = 'Title, Order, or Category field is required.';
const INVALID = 'One or more fields are invalid.';
const SERVER_ERROR = 'Server error.';

import {Router, json} from 'express';
import apiKey from '../../middleware/api-key';
import Forum from '../../models/Forum';
import isAdmin from '../../middleware/is-admin';

const router = Router();

router.get('/', apiKey(), async (req, res) => {
    try {
        const {c: category} = req.query;
        if (!category)
            return res.status(400).json({error: CATEGORY_REQUIRED});
        
        const forums = await Forum.find({category}).lean();
        res.json({forums});
    }
    catch (err) {
        res.status(500).json({error: SERVER_ERROR});
    }
});

router.get('/_id', apiKey(), isAdmin(), json(), async (req, res) => {
    try {
        const _id = parseInt(req.params._id);
        if (!_id)
            return res.status(400).json({error: BAD_ID});
        
        const forum = await Forum.findOne({_id}).lean();
        if (!forum)
            return res.status(404).json({error: NOT_FOUND});
        
        res.json({forum});
    }
    catch (err) {
        res.status(500).json({error: SERVER_ERROR});
    }
});

router.post('/', apiKey(), isAdmin(), json(), async (req, res) => {
    try {
        const {title} = req.body;
        const order = parseInt(req.body.order);
        const category = parseInt(req.body.category);

        if (!title || !order || !category)
            return res.status(400).json({error: ALL_REQUIRED});
        
        try {
            const forum = new Forum({title, order, category});
            await forum.save();

            res.json(forum);
        }
        catch (err) {
            console.error(err);
            return res.status(400).json({error: INVALID});
        }
    }
    catch (err) {
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
        const category = parseInt(req.body.category);

        if (!title && !order && !category)
            return res.status(400).json({error: SOME_REQUIRED});
        
        const forum = await Forum.findOne({_id});
        if (!forum)
            return res.status(404).json({error: NOT_FOUND});

        if (title) forum.title = title;
        if (order) forum.order = order;
        if (category) forum.category = category;

        try {
            await forum.save();
            res.json(forum);
        }
        catch (err) {
            console.error(err);
            res.status(400).json({error: INVALID});
        }
    }
    catch (err) {
        res.status(500).json({error: SERVER_ERROR});
    }
});

router.delete('/:_id', apiKey(), isAdmin(), async (req, res) => {
    try {
        const _id = parseInt(req.params._id);
        if (!_id)
            return res.status(404).json({error: BAD_ID});

        const result = await Forum.findOneAndDelete({_id});
        if (!result)
            return res.status(404).json({error: NOT_FOUND});

        res.status(204).end();
    }
    catch (err) {
        res.status(500).json({error: SERVER_ERROR});
    }
});

export default router;