const PAGE_SIZE = 40;
const BAD_ID = 'Invalid ID.';
const ALL_REQUIRED = 'Parent Type, Parent ID, and Page are required.';
const SERVER_ERROR = 'Server error.';

import {Router, json} from 'express';
import apiKey from '../../middleware/api-key';
import Thread from '../../models/Thread';

const router = Router();

router.get('/', apiKey(), async (req, res) => {
    try {
        let parentType;

        const {pt} = req.query;
        const parent = parseInt(req.query.p as string);
        const page = parseInt(req.query.pg as string);

        switch (pt) {
            case 'f':
                parentType = 'Forum';
                break;
            case 'sf':
                parentType = 'Subforum';
                break;
        }

        if (!parent || !page || !parentType)
            return res.status(400).end(ALL_REQUIRED);

        const threads = await Thread.find()
            .where('parentType').equals(parentType)
            .where('parent').equals(parent)
            .skip((page-1) * PAGE_SIZE)
            .limit(PAGE_SIZE)
            .lean();

        res.json({threads});
    }
    catch (err) {
        console.error(err);
        res.status(500).json({error: SERVER_ERROR});
    }
});

router.get('/_id', apiKey(), async (req, res) => {
    try {
        const _id = parseInt(req.params._id);
        if (!_id)
            return res.status(400).json({error: BAD_ID});
        
        const thread = await Thread.findOne({_id}).lean();
        res.json(thread);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({err: SERVER_ERROR});
    }
});

module.exports = router;