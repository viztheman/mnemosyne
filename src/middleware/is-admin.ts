import {Request, Response, NextFunction, UserRequest} from 'express';

const isAdmin = () =>
    function isAdmin(req: Request & UserRequest, res: Response, next: NextFunction) {
        if (!req.user || !req.user.isAdmin)
            res.status(401).json({error: 'Admin access is required.'});

        next();
    };

export default isAdmin;