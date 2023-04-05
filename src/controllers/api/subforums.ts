const forum_REQUIRED = 'Forum ID is required.';
const BAD_ID = 'Invalid ID.';
const NOT_FOUND = 'subforum not found.';
const ALL_REQUIRED = 'Title, Order, and Forum fields are required.';
const SOME_REQUIRED = 'Title, Order, or Forum field is required.';
const INVALID = 'One or more fields are invalid.';

import {Router, json} from 'express';
import apiKey from '../../middleware/api-key';
import makeSafe from './make-safe';
import isAdmin from '../../middleware/is-admin';
import Subforum from '../../models/Subforum';

const router = Router();

router.get('/', apiKey(), async (req, res) => {
    makeSafe(res, async () => {
        const {f: forum} = req.query;
        if (!forum)
            return res.status(400).json({error: forum_REQUIRED});
        
        const subforums = await Subforum.find({forum}).lean();
        res.json({subforums});
    });
});

router.get('/_id', apiKey(), isAdmin(), json(), async (req, res) => {
    makeSafe(res, async () => {
        const _id = parseInt(req.params._id);
        if (!_id)
            return res.status(400).json({error: BAD_ID});
        
        const subforum = await Subforum.findOne({_id}).lean();
        if (!subforum)
            return res.status(404).json({error: NOT_FOUND});
        
        res.json({subforum});
    });
});

router.post('/', apiKey(), isAdmin(), json(), async (req, res) => {
    makeSafe(res, async () => {
        const {title} = req.body;
        const order = parseInt(req.body.order);
        const forum = parseInt(req.body.forum);

        if (!title || !order || !forum)
            return res.status(400).json({error: ALL_REQUIRED});
        
        try {
            const subforum = new Subforum({title, order, forum});
            await subforum.save();

            res.json(subforum);
        }
        catch (err) {
            console.error(err);
            return res.status(400).json({error: INVALID});
        }
    });
});

router.put('/:_id', apiKey(), isAdmin(), json(), async (req, res) => {
    makeSafe(res, async () => {
        const _id = parseInt(req.params._id);
        if (!_id)
            return res.status(404).json({error: BAD_ID});

        const {title} = req.body;
        const order = parseInt(req.body.order);
        const forum = parseInt(req.body.category);

        if (!title && !order && !forum)
            return res.status(400).json({error: SOME_REQUIRED});
        
        const subforum = await Subforum.findOne({_id});
        if (!subforum)
            return res.status(404).json({error: NOT_FOUND});

        if (title) subforum.title = title;
        if (order) subforum.order = order;
        if (forum) subforum.forum = forum;

        try {
            await subforum.save();
            res.json(subforum);
        }
        catch (err) {
            console.error(err);
            res.status(400).json({error: INVALID});
        }
    })
});

router.delete('/:_id', apiKey(), isAdmin(), async (req, res) => {
    const {_id} = req.query;
    const result = await Subforum.findOneAndDelete({_id});
    if (!result)
        return res.status(404).json({error: NOT_FOUND});

    res.status(204).end();
});

export default router;