import { Response } from "express";

function makeSafe(res: Response, wrapped: Function): void {
    try {
        wrapped();
    }
    catch (err) {
        console.error(err);
        res.status(500).json({error: 'Internal error.'})
    }
}

export default makeSafe;