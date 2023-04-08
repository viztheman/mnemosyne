import { LeanDocument } from 'mongoose';
import Category, {ICategory} from '../models/Category';
import Error, { IError, INVALID, NOT_FOUND, SERVER_ERROR } from './errors';

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

async function all(): Promise<ICategory[] | IError> {
    try {
        return await Category.find().sort('order').lean();
    }
    catch (err) {
        console.error(err);
        return new Error(500, SERVER_ERROR);
    }
}

async function one(_id: number): Promise<LeanDocument<ICategory> | IError> {
    try {
        const category = await Category.findOne({_id}).lean();
        
        if (!category)
            return new Error(404, NOT_FOUND);

        return category;
    }
    catch (err) {
        console.error(err);
        return new Error(500, SERVER_ERROR);
    }
}

async function create(options: ICategoryCreateOptions): Promise<ICategory | IError> {
    try {
        try {
            const category = new Category(options);
            await category.save();

            return category.toObject();
        }
        catch (err) {
            return new Error(400, INVALID);
        }
    }
    catch (err) {
        console.error(err);
        return new Error(500, SERVER_ERROR);
    }
}

async function update(options: ICategoryUpdateOptions): Promise<ICategory | IError> {
    try {
        const category = await Category.findOne({_id: options._id});
        if (!category)
            return new Error(404, NOT_FOUND);
        
        if (options.title) category.title = options.title;
        if (options.order) category.order = options.order;

        try {
            await category.save();
            return category.toObject();
        }
        catch (err) {
            return new Error(400, INVALID);
        }
    }
    catch (err) {
        console.error(err);
        return new Error(500, SERVER_ERROR);
    }
}

async function del(_id: number): Promise<LeanDocument<ICategory> | IError> {
    try {
        const category = await Category.findOneAndDelete({_id}).lean();
        if (!category)
            return new Error(404, NOT_FOUND);
        
        return category;
    }
    catch (err) {
        console.error(err);
        return new Error(500, SERVER_ERROR);
    }
}

const _default: ICategoryService = {
    all, one, create, update, del
};
export default _default;