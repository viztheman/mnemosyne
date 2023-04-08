import { LeanDocument } from "mongoose";
import { IThread } from "../models/Thread";
import { IError } from './errors';
interface IThreadCreateOptions {
    parentType: string;
    parent: number;
    title: string;
    postedBy: string;
    text: string;
}
interface IThreadUpdateOptions {
    _id: Number;
    parentType?: string;
    parent?: number;
    title?: string;
}
interface IThreadService {
    all(parentType: string, parent: number, page: number): Promise<IThread[] | IError>;
    one(_id: number): Promise<LeanDocument<IThread> | IError>;
    create(options: IThreadCreateOptions): Promise<IThread | IError>;
    update(options: IThreadUpdateOptions): Promise<IThread | IError>;
}
declare const _default: IThreadService;
export default _default;
