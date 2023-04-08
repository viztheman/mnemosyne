import { LeanDocument } from 'mongoose';
import { ISubforum } from '../models/Subforum';
import { IError } from './errors';
interface ISubforumCreateOptions {
    forum: number;
    title: string;
    order: number;
}
interface ISubforumUpdateOptions {
    _id: number;
    forum?: number;
    title?: string;
    order?: number;
}
interface ISubforumService {
    all(forum: number): Promise<ISubforum[] | IError>;
    one(_id: number): Promise<LeanDocument<ISubforum> | IError>;
    create(options: ISubforumCreateOptions): Promise<ISubforum | IError>;
    update(options: ISubforumUpdateOptions): Promise<ISubforum | IError>;
    del(_id: number): Promise<LeanDocument<ISubforum> | IError>;
}
declare const _default: ISubforumService;
export default _default;
