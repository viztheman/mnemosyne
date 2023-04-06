import { Model } from 'mongoose';
interface IThread {
    _id?: number;
    parent: number;
    parentType: string;
    title: string;
    postedBy: number;
    lastPostBy: number;
}
declare const Thread: Model<IThread, {}, {}, {}, any>;
export default Thread;
export { IThread };
