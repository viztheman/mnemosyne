import { Response } from "express";
declare function makeSafe(res: Response, wrapped: Function): void;
export default makeSafe;
