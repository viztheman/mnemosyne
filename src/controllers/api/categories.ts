import {Router, json} from 'express';
import apiKey from '../../middleware/api-key';
import isAdmin from '../../middleware/is-admin';
import categoriesSvc from '../../services/categories';
import Error, { ALL_REQUIRED, BAD_ID, IError, SOME_REQUIRED } from '../../services/errors';

const router = Router();

router.get('/', apiKey(), async (req, res) => {
    const categories = await categoriesSvc.all();

    if (categories instanceof Error) {
        const err = categories as IError;
        return res.status(err.statusCode).json({error: err.message});
    }

    res.json({categories});
});

router.get('/:_id', apiKey(), async (req, res) => {
    const _id = parseInt(req.params._id);
    if (!_id)
        res.status(400).json({error: BAD_ID});

    const category = await categoriesSvc.one(_id);

    if (category instanceof Error) {
        const err = category as IError;
        return res.status(err.statusCode).json({error: err.message});
    }

    res.json({category});
});

router.post('/', apiKey(), isAdmin(), json(), async (req, res) => {
    const {title} = req.body;
    const order = parseInt(req.body.order);

    if (!title || !order)
        return res.status(400).json({error: ALL_REQUIRED});
        
    const category = await categoriesSvc.create({title, order});

    if (category instanceof Error) {
        const err = category as IError;
        return res.status(err.statusCode).json({error: err.message});
    }

    res.json(category);
});

router.put('/:_id', apiKey(), isAdmin(), json(), async (req, res) => {
    const _id = parseInt(req.params._id);
    if (!_id)
        return res.status(404).json({error: BAD_ID});
    
    const {title} = req.body;
    const order = parseInt(req.body.order);

    if (!title && !order)
        return res.status(400).json({error: SOME_REQUIRED});

    const category = await categoriesSvc.update({_id, title, order});
    if (category instanceof Error) {
        const err = category as IError;
        return res.status(err.statusCode).json({error: err.message});
    }

        res.json(category);
});

router.delete('/:_id', apiKey(), isAdmin(), async (req, res) => {
    const _id = parseInt(req.params._id);
    if (!_id)
        return res.status(404).json({error: BAD_ID});

    const category = await categoriesSvc.del(_id);
    if (category instanceof Error) {
        const err = category as IError;
        return res.status(err.statusCode).json({err: err.message});
    }

    res.status(204).end();
});

export default router;