const PAGE_SIZE = 40;
const BAD_ID = 'Invalid ID.';
const ALL_REQUIRED = 'Parent Type, Parent ID, and Page are required.';
const SERVER_ERROR = 'Server error.';

import {Router, json} from 'express';
import apiKey from '../../middleware/api-key';
import Post from '../../models/Post';

const router = Router();

router.get('/', apiKey(), async (req, res) => {
    try {
        let parentType;

        const thread = parseInt(req.query.t as string);
        const page = parseInt(req.query.pg as string);

        const posts = await Post.find()
            .where('thread').equals(thread)
            .skip((page-1) * PAGE_SIZE)
            .limit(PAGE_SIZE)
            .lean();

        res.json({posts});
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
        
        const thread = await Post.findOne({_id}).lean();
        res.json(thread);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({err: SERVER_ERROR});
    }
});

module.exports = router;