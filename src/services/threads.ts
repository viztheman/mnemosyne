const PAGE_SIZE = 40;

import mongoose, { HydratedDocument, LeanDocument } from "mongoose";
import Thread, { IThread } from "../models/Thread";
import Error, { IError, INVALID, NOT_FOUND, SERVER_ERROR } from './errors';
import Post from "../models/Post";
import compilePost from './compile-post';

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

async function all(parentType: string, parent: number, page: number): Promise<IThread[] | IError> {
    try {
        return await Thread.find({parentType, parent})
            .sort('updatedAt')
            .skip((page - 1) * PAGE_SIZE)
            .limit(PAGE_SIZE)
            .lean();
    }
    catch (err) {
        console.error(err);
        return new Error(500, SERVER_ERROR);
    }
}

async function one(_id: number): Promise<LeanDocument<IThread> | IError> {
    try {
        const thread = await Thread.findOne({_id}).lean();
        if (!thread)
            return new Error(404, NOT_FOUND);
        
        return thread;
    }
    catch (err) {
        console.error(err);
        return new Error(500, SERVER_ERROR);
    }
}

async function create(options: IThreadCreateOptions): Promise<IThread | IError> {
    const session = await mongoose.startSession();

    try {
        let thread: HydratedDocument<IThread>;

        await session.withTransaction(async () => {
            thread = new Thread({
                parentType: options.parentType,
                parent: options.parent,
                title: options.title,
                postedBy: options.postedBy,
                lastPostBy: options.postedBy
            });
            await thread.save();

            const post = new Post({
                thread: thread._id,
                text: options.text,
                html: compilePost(options.text),
                postedBy: options.postedBy
            });
            await post.save();

            return session.commitTransaction();
        });

        // @ts-ignore: This will be populated or an exception will be thrown.
        return thread;
    }
    catch (err) {
        console.error(err);
        return new Error(500, SERVER_ERROR);
    }
    finally {
        session.endSession();
    }
}

async function update(options: IThreadUpdateOptions): Promise<IThread | IError> {
    try {
        const thread = await Thread.findOne({_id: options._id});
        if (!thread)
            return new Error(404, NOT_FOUND);
        
        if (options.parentType) thread.parentType = options.parentType;
        if (options.parent) thread.parent = options.parent;
        if (options.title) thread.title = options.title;

        try {
            await thread.save();
            return thread.toObject();
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

const _default: IThreadService = {
    all, one, create, update
};
export default _default;