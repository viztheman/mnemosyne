import { LeanDocument } from 'mongoose';
import { ICategory } from '../models/Category';
import { IError } from './errors';
interface ICategoryCreateOptions {
    title: string;
    order: number;
}
interface ICategoryUpdateOptions {
    _id: number;
    title?: string;
    order?: number;
}
interface ICategoryService {
    all(): Promise<ICategory[] | IError>;
    one(_id: number): Promise<LeanDocument<ICategory> | IError>;
    create(options: ICategoryCreateOptions): Promise<ICategory | IError>;
    update(options: ICategoryUpdateOptions): Promise<ICategory | IError>;
    del(_id: number): Promise<LeanDocument<ICategory> | IError>;
}
declare const _default: ICategoryService;
export default _default;
