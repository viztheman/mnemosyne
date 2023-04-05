const AUTHORIZATION_REQUIRED = 'Authorization header is required.';
const BEARER_REQUIRED = 'Bearer authroization is required.';
const UNKNOWN_KEY = 'Unknown API key.';

import {Request, Response, NextFunction, UserRequest} from 'express';
import User from '../models/User';

const apiKey = () =>
    async function apiKey(req: Request & UserRequest, res: Response, next: NextFunction) {
        const {authorization} = req.headers;
        if (!authorization)
            return res.status(401).json({error: AUTHORIZATION_REQUIRED});
        
        const words = authorization.split(' ');
        if (words.length < 2 || words[0] !== 'Bearer')
            return res.status(400).json({error: BEARER_REQUIRED});
        
        const apiKey = words[1];
        const user = await User.findOne({apiKey}).lean();
        if (!user)
            return res.status(401).json({error: UNKNOWN_KEY});
        
        req.user = user;
        next();
    };

export default apiKey;