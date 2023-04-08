const CATEGORY_REQUIRED = 'Category ID is required.';

import {Router, json} from 'express';
import apiKey from '../../middleware/api-key';
import isAdmin from '../../middleware/is-admin';
import forumsSvc from '../../services/forums';
import Error, { ALL_REQUIRED, BAD_ID, IError, SOME_REQUIRED } from '../../services/errors';

const router = Router();

router.get('/', apiKey(), async (req, res) => {
    const category = parseInt(req.query.c as string);
    if (!category)
        return res.status(400).json({error: CATEGORY_REQUIRED});
        
    const forums = await forumsSvc.all(category);

    if (forums instanceof Error) {
        const err = forums as IError;
        return res.status(err.statusCode).json({error: err.message});
    }
        
    res.json({forums});
});

router.get('/_id', apiKey(), isAdmin(), json(), async (req, res) => {
    const _id = parseInt(req.params._id);
    if (!_id)
        return res.status(400).json({error: BAD_ID});

    const forum = await forumsSvc.one(_id);
    
    if (forum instanceof Error) {
        const err = forum as IError;
        return res.status(err.statusCode).json({error: err.message});
    }
    
    res.json({forum});
});

router.post('/', apiKey(), isAdmin(), json(), async (req, res) => {
    const {title} = req.body;
    const order = parseInt(req.body.order);
    const category = parseInt(req.body.category);

    if (!title || !order || !category)
        return res.status(400).json({error: ALL_REQUIRED});
    
    const forum = await forumsSvc.create({title, order, category});
    if (forum instanceof Error) {
        const err = forum as IError;
        return res.status(err.statusCode).json({error: err.message});
    }
    
    res.json(forum);
});

router.put('/:_id', apiKey(), isAdmin(), json(), async (req, res) => {
    const _id = parseInt(req.params._id);
    if (!_id)
        return res.status(404).json({error: BAD_ID});

    const {title} = req.body;
    const order = parseInt(req.body.order);
    const category = parseInt(req.body.category);

    if (!title && !order && !category)
        return res.status(400).json({error: SOME_REQUIRED});
    
    const forum = await forumsSvc.update({_id, title, order, category});
    
    if (forum instanceof Error) {
        const err = forum as IError;
        return res.status(err.statusCode).json({error: err.message});
    }

    res.json(forum);
});

router.delete('/:_id', apiKey(), isAdmin(), async (req, res) => {
    const _id = parseInt(req.params._id);
    if (!_id)
        return res.status(404).json({error: BAD_ID});

    const result = await forumsSvc.del(_id);
    if (res instanceof Error) {
        const err = result as IError;
        return res.status(err.statusCode).json({error: err.message});
    }

    res.status(204).end();
});

export default router;