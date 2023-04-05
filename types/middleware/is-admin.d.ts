import { Request, Response, NextFunction, UserRequest } from 'express';
declare const isAdmin: () => (req: Request & UserRequest, res: Response, next: NextFunction) => void;
export default isAdmin;
