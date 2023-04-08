import { LeanDocument } from 'mongoose';
import { IForum } from '../models/Forum';
import { IError } from './errors';
interface IForumCreateOptions {
    category: number;
    title: string;
    order: number;
}
interface IForumUpdateOptions {
    _id: number;
    category?: number;
    title?: string;
    order?: number;
}
interface IForumService {
    all(category: number): Promise<IForum[] | IError>;
    one(_id: number): Promise<LeanDocument<IForum> | IError>;
    create(options: IForumCreateOptions): Promise<IForum | IError>;
    update(options: IForumUpdateOptions): Promise<IForum | IError>;
    del(_id: number): Promise<LeanDocument<IForum> | IError>;
}
declare const _default: IForumService;
export default _default;
