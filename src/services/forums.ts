import { LeanDocument } from 'mongoose';
import Forum, { IForum } from '../models/Forum';
import Error, {IError, INVALID, NOT_FOUND, SERVER_ERROR} from './errors';

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

async function all(category: number): Promise<IForum[] | IError> {
    try {
        return await Forum.find({category}).sort('order').lean();
    }
    catch (err) {
        console.error(err);
        return new Error(500, NOT_FOUND);
    }
}

async function one(_id: number): Promise<LeanDocument<IForum> | IError> {
    try {
        const forum = await Forum.findOne({_id}).lean();
        
        if (!forum)
            return new Error(404, NOT_FOUND);

        return forum;
    }
    catch (err) {
        console.error(err);
        return new Error(500, SERVER_ERROR);
    }
}

async function create(options: IForumCreateOptions): Promise<IForum | IError> {
    try {
        try {
            const forum = new Forum(options);
            await forum.save();

            return forum.toObject();
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

async function update(options: IForumUpdateOptions): Promise<IForum | IError> {
    try {
        const forum = await Forum.findOne({_id: options._id});
        if (!forum)
            return new Error(404, NOT_FOUND);
        
        if (options.category) forum.category = options.category;
        if (options.title) forum.title = options.title;
        if (options.order) forum.order = options.order;

        try {
            await forum.save();
            return forum.toObject();
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

async function del(_id: number): Promise<LeanDocument<IForum> | IError> {
    try {
        const forum = await Forum.findOneAndDelete({_id}).lean();
        if (!forum)
            return new Error(404, NOT_FOUND);
        
        return forum;
    }
    catch (err) {
        console.error(err);
        return new Error(500, SERVER_ERROR);
    }
}

const _default: IForumService = {
    all, one, create, update, del
};
export default _default;