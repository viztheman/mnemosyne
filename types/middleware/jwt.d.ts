import { Request, Response, NextFunction } from 'express';
declare const jwt: () => (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>> | undefined;
export default jwt;
