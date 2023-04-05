import { Request, Response, NextFunction, UserRequest } from 'express';
declare const apiKey: () => (req: Request & UserRequest, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
export default apiKey;
