const FORUM_REQUIRED = 'Forum ID is required.';

import {Router, json} from 'express';
import apiKey from '../../middleware/api-key';
import isAdmin from '../../middleware/is-admin';
import Error, { ALL_REQUIRED, BAD_ID, IError, NOT_FOUND, SERVER_ERROR, SOME_REQUIRED } from '../../services/errors';
import subforumsSvc from '../../services/subforums';

const router = Router();

router.get('/', apiKey(), async (req, res) => {
    const forum = parseInt(req.query.f as string);
    if (!forum)
        return res.status(400).json({error: FORUM_REQUIRED});
    
    const subforums = await subforumsSvc.all(forum);

    if (subforums instanceof Error) {
        const err = subforums as IError;
        return res.status(err.statusCode).json({error: err.message});
    }

    res.json({subforums});
});

router.get('/_id', apiKey(), isAdmin(), json(), async (req, res) => {
    const _id = parseInt(req.params._id);
    if (!_id)
        return res.status(400).json({error: BAD_ID});
    
    const subforum = await subforumsSvc.one(_id);
    if (subforum instanceof Error) {
        const err = subforum as IError;
        return res.status(err.statusCode).json({error: err.message});
    }
    
    res.json({subforum});
});

router.post('/', apiKey(), isAdmin(), json(), async (req, res) => {
    const {title} = req.body;
    const order = parseInt(req.body.order);
    const forum = parseInt(req.body.forum);

    if (!title || !order || !forum)
        return res.status(400).json({error: ALL_REQUIRED});
    
    const subforum = await subforumsSvc.create({title, order, forum});
    if (subforum instanceof Error) {
        const err = subforum as IError;
        return res.status(err.statusCode).json({error: err.message});
    }
        
    res.json(subforum);
});

router.put('/:_id', apiKey(), isAdmin(), json(), async (req, res) => {
    const _id = parseInt(req.params._id);
    if (!_id)
        return res.status(404).json({error: BAD_ID});

    const {title} = req.body;
    const order = parseInt(req.body.order);
    const forum = parseInt(req.body.category);

    if (!title && !order && !forum)
        return res.status(400).json({error: SOME_REQUIRED});
    
    const subforum = await subforumsSvc.update({_id, title, order, forum});

    if (subforum instanceof Error) {
        const err = subforum as IError;
        return res.status(err.statusCode).json({error: err.message});
    }

    res.json(subforum);
});

router.delete('/:_id', apiKey(), isAdmin(), async (req, res) => {
        const _id = parseInt(req.params._id);
        if (!_id)
            return res.status(404).json({error: BAD_ID});

        const subforum = await subforumsSvc.del(_id);

        if (subforum instanceof Error) {
            const err = subforum as IError;
            return res.status(err.statusCode).json({error: err.message});
        }

        res.status(204).end();
});

export default router;