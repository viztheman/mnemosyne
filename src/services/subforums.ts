import { LeanDocument } from 'mongoose';
import Subforum, { ISubforum } from '../models/Subforum';
import Error, {IError, INVALID, NOT_FOUND, SERVER_ERROR} from './errors';

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

async function all(forum: number): Promise<ISubforum[] | IError> {
    try {
        return await Subforum.find({forum}).sort('order').lean();
    }
    catch (err) {
        console.error(err);
        return new Error(500, NOT_FOUND);
    }
}

async function one(_id: number): Promise<LeanDocument<ISubforum> | IError> {
    try {
        const subforum = await Subforum.findOne({_id}).lean();
        
        if (!subforum)
            return new Error(404, NOT_FOUND);

        return subforum;
    }
    catch (err) {
        console.error(err);
        return new Error(500, SERVER_ERROR);
    }
}

async function create(options: ISubforumCreateOptions): Promise<ISubforum | IError> {
    try {
        try {
            const subforum = new Subforum(options);
            await subforum.save();

            return subforum.toObject();
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

async function update(options: ISubforumUpdateOptions): Promise<ISubforum | IError> {
    try {
        const subforum = await Subforum.findOne({_id: options._id});
        if (!subforum)
            return new Error(404, NOT_FOUND);
        
        if (options.forum) subforum.forum = options.forum;
        if (options.title) subforum.title = options.title;
        if (options.order) subforum.order = options.order;

        try {
            await subforum.save();
            return subforum.toObject();
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

async function del(_id: number): Promise<LeanDocument<ISubforum> | IError> {
    try {
        const subforum = await Subforum.findOneAndDelete({_id}).lean();
        if (!subforum)
            return new Error(404, NOT_FOUND);
        
        return subforum;
    }
    catch (err) {
        console.error(err);
        return new Error(500, SERVER_ERROR);
    }
}

const _default: ISubforumService = {
    all, one, create, update, del
};
export default _default;